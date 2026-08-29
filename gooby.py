import os
import html

files = [
    f for f in os.listdir(".")
    if f.lower().endswith(".html") and f.lower() != "index.html"
]

files.sort(key=str.lower)

with open("index.html", "w", encoding="utf-8") as out:
    out.write("""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Games</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #111;
            color: white;
            max-width: 900px;
            margin: auto;
            padding: 30px;
        }

        h1 {
            text-align: center;
        }

        .games {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
        }

        a {
            display: block;
            padding: 15px;
            background: #222;
            color: #4da6ff;
            text-decoration: none;
            border-radius: 8px;
        }

        a:hover {
            background: #333;
        }
    </style>
</head>
<body>

<h1>My Games</h1>

<div class="games">
""")

    for filename in files:
        name = os.path.splitext(filename)[0]

        out.write(
            f'    <a href="{html.escape(filename)}">'
            f'{html.escape(name)}</a>\n'
        )

    out.write("""
</div>

</body>
</html>
""")

print(f"Created index.html with {len(files)} games.")
