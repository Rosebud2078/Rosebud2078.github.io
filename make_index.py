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
    <title>My Games</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #111;
            color: white;
            margin: 0;
            padding: 30px;
        }

        h1 {
            text-align: center;
        }

        .games {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            max-width: 1200px;
            margin: auto;
        }

        .game {
            background-color: #222;
            color: #fff;
            padding: 15px;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.2s;
        }

        .game:hover {
            background-color: #444;
        }
    </style>
</head>

<body>

<h1>My Games</h1>

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

</body>
</html>
""")

print(f"Done! Added {len(files)} games to index.html")
