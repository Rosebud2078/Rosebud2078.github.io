import os
import html

# Find all HTML files except index.html
files = [
    f for f in os.listdir(".")
    if f.lower().endswith(".html")
    and f.lower() != "index.html"
]

# Sort alphabetically
files.sort(key=str.lower)

# Create the index.html
with open("index.html", "w", encoding="utf-8") as out:

    out.write("""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>collected puzzlescript games</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #522552;
            color: white;
            margin: 0;
            padding: 30px;
        }

        h1 {
            text-align: center;
        }

        p {
            text-align: center;
            color: #aaa;
            font-size: 18px;
            margin-top: -10px;
            margin-bottom: 30px;
        }
        p a {
              color: #A349A4;
        }
        
        #search {
            display: block;
            width: 100%;
            max-width: 500px;
            margin: 0 auto 30px auto;
            padding: 12px 15px;
            box-sizing: border-box;

            background-color: #331733;
            color: white;
            border: 2px solid #A349A4;
            border-radius: 8px;

            font-size: 16px;
            outline: none;
        }

        #search::placeholder {
            color: #aaa;
        }

        #search:focus {
            border-color: #d66dd7;
        }
    
        .games {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            max-width: 1200px;
            margin: auto;
        }

        .game {
            background-color: #331733;
            color: #fff;
            padding: 15px;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.2s;
        }

        .game:hover {
            background-color: #A349A4;
        }
    </style>
</head>

<body>

<h1>collected puzzlescript games</h1>
<p>hello! none of these are my games, I just collected them, then put them on a website to play them easier<br>
    if you wanna see my whole spiel about this website, read the <a href="about.html">about page</a>
</p>
    
<input type="text" id="search" placeholder="Search games...">

<div class="games">
""")

    # Add a link for every HTML file
    for filename in files:
        name = os.path.splitext(filename)[0]

        out.write(
            f'    <a class="game" href="{html.escape(filename)}">'
            f'{html.escape(name)}</a>\n'
        )

    out.write("""
</div>
<script>
    const search = document.getElementById("search");
    const games = document.querySelectorAll(".game");

    search.addEventListener("input", function() {
        const query = search.value.toLowerCase();

        games.forEach(function(game) {
            const name = game.textContent.toLowerCase();

            if (name.includes(query)) {
                game.style.display = "";
            } else {
                game.style.display = "none";
            }
        });
    });
</script>

</div>

</body>
</html>
""")

print(f"Done! Added {len(files)} games to index.html")
