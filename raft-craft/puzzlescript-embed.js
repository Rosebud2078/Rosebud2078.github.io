(function()
{
	window.PuzzleScript = window.PuzzleScript || { };

	window.PuzzleScript.embed = function(element, id, config)
	{
		var canvas,
			settings =
			{
				engine: "https://www.puzzlescript.net/js/scripts_play_compiled.js"
			};
		
		extend(settings, config);
		clear_children(element);
		canvas = create_game_canvas(element, settings);
		load_engine(element, id, settings, function()
		{
			window.canSetHTMLColors = false;
			
			if (Mobile.hasTouch())
			{
				if (settings.mobileCallback) {
					try {
						settings.mobileCallback();
					}
					catch (e) {}
				} else {
					canvas.onmousedown = function()
					{
						canvas.onmousedown = null;
						
						try {
							Mobile.enable();
						}
						catch (e) {}
					}
				}
				
				load_game(element, id, settings);
				
				reenableScrolling();
			}
			else
			{
				load_game(element, id, settings);
			}
			
			if (settings.callback) {
				settings.callback();
			}
		});
	};
	
	function clear_children(element)
	{
		while (element.lastChild)
		{
			element.removeChild(element.lastChild);
		}
	}
	
	function create_game_canvas(element, id, settings)
	{
		var canvas = document.createElement("canvas");
		canvas.id = "gameCanvas";
		element.appendChild(canvas);
		return canvas;
	}
	
	function load_engine(element, id, settings, onload)
	{
		var script = document.createElement("script");
		script.setAttribute("src", settings.engine);
		script.onload = onload;
		document.body.appendChild(script);
	}
	
	function load_game(element, id, settings, callback)
	{
		var githubURL = 'https://api.github.com/gists/' + id;
		
		var githubHTTPClient = new XMLHttpRequest();
		githubHTTPClient.open('GET', githubURL);
		githubHTTPClient.onreadystatechange = function () {
			if (githubHTTPClient.readyState != 4) {
				return;
			}
			var result = JSON.parse(githubHTTPClient.responseText);
			if (githubHTTPClient.status === 403) {
				displayError(result.message);
			} else if (githubHTTPClient.status !== 200 && githubHTTPClient.status !== 201) {
				displayError("HTTP Error " + githubHTTPClient.status + ' - ' + githubHTTPClient.statusText);
			}
			var result = JSON.parse(githubHTTPClient.responseText);
			var code = result["files"]["script.txt"]["content"];
			compile(["restart"], code);
			
			if (callback) {
				callback();
			}
		}
		githubHTTPClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		githubHTTPClient.send();
	}
	
	function extend(target, object)
	{
		if (typeof object !== 'undefined')
		{
			for (var key in object)
			{
				target[key] = object[key];
			}
		}
		
		return target;
	}
	
	function reenableScrolling ()
	{
		var style = {
            height: "auto",
            overflow: "auto",
            position: "auto",
            width: "auto"
        }
        
        var styleString = "";
        for (var key in style) {
            styleString += key + ": " + style[key] + "; ";
        }

        document.body.setAttribute('style', styleString)
    }
	
})();
