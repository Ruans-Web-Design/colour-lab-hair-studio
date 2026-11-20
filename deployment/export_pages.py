"""Prerender the managed Vite Pages build; never copies environment files."""
from functools import partial
from html import escape
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import tempfile
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "packages/web/dist"
PUBLIC_URL = "https://ruans-web-design.github.io/colour-lab-hair-studio/"
template = (DIST / "index.html").read_text()
assert "/colour-lab-hair-studio/assets/" in template, "Build with --mode github-pages first"
(DIST / "contact").mkdir(exist_ok=True)
(DIST / "contact/index.html").write_text(template)

with tempfile.TemporaryDirectory() as folder:
    (Path(folder) / "colour-lab-hair-studio").symlink_to(DIST, target_is_directory=True)
    handler = partial(SimpleHTTPRequestHandler, directory=folder)
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                executable_path="/usr/bin/google-chrome", headless=True,
                args=["--no-sandbox"],
            )
            for route, output in [("", "index.html"), ("contact/", "contact/index.html")]:
                page = browser.new_page(viewport={"width": 1440, "height": 1000})
                response = page.goto(
                    f"http://127.0.0.1:{server.server_port}/colour-lab-hair-studio/{route}",
                    wait_until="networkidle",
                )
                assert response.status == 200
                page.wait_for_selector("h1")
                assert page.locator("h1").count() == 1
                assert page.locator("main").inner_text().strip()
                rendered = template.replace('<div id="root"></div>',
                    '<div id="root">' + page.locator("#root").inner_html() + '</div>')
                rendered = re.sub(r"<title>.*?</title>",
                    "<title>" + escape(page.title()) + "</title>", rendered)
                description = escape(page.locator('meta[name="description"]').get_attribute("content"), quote=True)
                for attr in ['name="description"', 'property="og:description"', 'name="twitter:description"']:
                    rendered = re.sub(r'(<meta\s+' + re.escape(attr) + r'\s+content=")[^"]*(")',
                        lambda match: match[1] + description + match[2], rendered)
                for attr in ['property="og:title"', 'name="twitter:title"']:
                    rendered = re.sub(r'(<meta\s+' + re.escape(attr) + r'\s+content=")[^"]*(")',
                        lambda match: match[1] + escape(page.title(), quote=True) + match[2], rendered)
                rendered = rendered.replace(f'rel="canonical" href="{PUBLIC_URL}"',
                    f'rel="canonical" href="{PUBLIC_URL}{route}"')
                rendered = rendered.replace(f'property="og:url" content="{PUBLIC_URL}"',
                    f'property="og:url" content="{PUBLIC_URL}{route}"')
                (DIST / output).write_text(rendered)
                print(f"Prerendered {output}: {page.title()}")
                page.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()

for route in ["about", "services", "testimonials"]:
    destination = DIST / route
    destination.mkdir(exist_ok=True)
    redirect = template.replace("</head>",
        f'<meta http-equiv="refresh" content="0;url={PUBLIC_URL}"><meta name="robots" content="noindex"></head>')
    (destination / "index.html").write_text(redirect)

(DIST / ".nojekyll").touch()
(DIST / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    f'<url><loc>{PUBLIC_URL}</loc></url><url><loc>{PUBLIC_URL}contact/</loc></url></urlset>\n'
)
print("Static frontend ready. Publish only packages/web/dist to gh-pages.")