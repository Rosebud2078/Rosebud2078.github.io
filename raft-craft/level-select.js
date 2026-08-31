var gameid = null;
var prevlevelbutton = null;
var nextlevelbutton = null;
var level_names = null;

function initLevelSelect (_gameid, levels, prevnext) {
	
	gameid = _gameid;
	
	var levelcount = 0;
	
	if (Array.isArray(levels))
	{
		levelcount = levels.length;
		level_names = levels;
	}
	else
	{
		levelcount = levels;
		level_names = null;
	}
	
	tryPlayStartLevelSound = function () {
		tryPlaySimpleSound("startlevel");
		updateLevelSelectFromGame(curlevel);
	}
	
	tryPlayEndLevelSound = function () {
		tryPlaySimpleSound("endlevel");
		rememberLevelCompleted(curlevel);
	}
	
	var select = $('<select><option>Level select</option></select>');
	
	for (var i = 0; i < levelcount; i++) {
		var leveltext = level_names ? level_names[i] : 'Level ' + (i+1);
		
		if (!!window.localStorage && localStorage[gameid + '.lvl' + i]) {
			leveltext = '&nbsp;&#x2713;&nbsp;' + leveltext;
		} else {
			leveltext = '&#x2003;&nbsp;' + leveltext;
		}
		
		select.append('<option id="lvl' + i + '" val="lvl' + i + '">' + leveltext + '</a></li>');
	}
	
	var chooser = $('<div></div>');
	chooser.append(select);
	
	if (prevnext) {
		prevlevelbutton = $('<a href="#">&#xab; Prev</a>');
		nextlevelbutton = $('<a href="#">Next &#xbb;</a>');
		
		chooser.prepend('&nbsp;&nbsp;');
		chooser.prepend(prevlevelbutton);
		chooser.append('&nbsp;&nbsp;');
		chooser.append(nextlevelbutton);
		
		prevlevelbutton.click(function (e) { select[0].selectedIndex--; onLevelSelectChange(e); });
		nextlevelbutton.click(function (e) { select[0].selectedIndex++; onLevelSelectChange(e); });
		
		prevlevelbutton.css('visibility', 'hidden');
		nextlevelbutton.css('visibility', 'hidden');
	}
	
	$('#levelselect').append(chooser);
	select.change(onLevelSelectChange);
}

function updatePrevNextButtons () {
	var select = $('#levelselect select')[0];
	
	var index = select.selectedIndex;
	
	if (index <= 1) {
		prevlevelbutton.css('visibility', 'hidden');
	} else {
		prevlevelbutton.css('visibility', 'visible');
	}
	
	if (index >= select.length - 1) {
		nextlevelbutton.css('visibility', 'hidden');
	} else {
		nextlevelbutton.css('visibility', 'visible');
	}
}

function updateLevelSelectFromGame (levelid) {
	levelid = parseInt(levelid);
	$('#levelselect select')[0].selectedIndex = levelid + 1;
	
	if (prevlevelbutton) {
		updatePrevNextButtons();
	}
}

function onLevelSelectChange(e) {
	if (e) {
		e.preventDefault();
	}
	
	//var levelname = $(this).text();
	$('#game').removeClass("unfocused");
	lastDownTarget = canvas;
	
	$(this).blur();
	
	$('html, body').animate({
        scrollTop: $("#game").offset().top
    }, 150);
    
	if (prevlevelbutton) {
		updatePrevNextButtons();
	}
	
	var levelid = $('#levelselect select')[0].selectedIndex - 1;
	
	if (titleScreen) {
		curlevel = levelid;
		
		timer = 0;
		quittingTitleScreen=true;
		
		tryPlayStartGameSound();
		
		return;
	}
	
	if (curlevel == levelid) {
		return;
	}
	
	keybuffer=[];
    againing=false;
	messagetext="";
	curlevel = levelid;
	textMode=false;
	titleScreen=false;
	quittingMessageScreen=false;
	messageselected=false;
	loadLevelFromState(state,levelid);
	
	canvasResize();	
	clearInputHistory();
	
	try {
		if (!!window.localStorage) {
			localStorage[document.URL]=curlevel;
		}
	} catch (e) {}
}

function rememberLevelCompleted (levelid) {
	levelid = parseInt(levelid);
	try {
		localStorage[gameid + '.lvl' + levelid] = true;
	} catch (e) {}
	
	console.log(level_names);
	
	var leveltext = level_names ? level_names[levelid] : 'Level ' + (levelid+1);
	
	$('#lvl' + levelid).html('&nbsp;&#x2713;&nbsp;' + leveltext);
}