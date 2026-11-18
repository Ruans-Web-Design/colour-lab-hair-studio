# Colour Lab — Hair Studio

Responsive Home + Contact website preview for Colour Lab in George, South Africa.

## Pages

- `/` — Home, short about section, seven services, portfolio lightbox and two attributed Google testimonials
- `/contact` — Contact information and email-enquiry preparation
- Former `/about`, `/services` and `/testimonials` URLs redirect to Home; their standalone pages have been removed.

## Run locally

Requires Bun. Install dependencies and start the web preview:

```sh
bun install --frozen-lockfile
cp .env.template .env
bun run dev
```

The website uses port **4200**, assigned in `.runable/ports.json` and read through `__ports.cjs`. Use `bun run kill:port` if that port is occupied; do not edit the assigned ports. The frontend does not require booking, email, payment or database credentials for its current features. Fill in environment variables only when enabling the corresponding backend integrations.

```sh
bun run lint
bun run build
```

## Project layout

- `packages/web/src/web/pages/salon.tsx` — pages and shared UI
- `packages/web/src/web/salon.css` — visual styling and responsive rules
- `packages/web/public/images/` — logo, studio and portfolio assets
- `packages/web/src/api/` — managed Hono/oRPC API scaffold
- `design.md` — visual direction
- `packages/mobile/` and `packages/desktop/` — retained template clients, not separately customised for this website

Stack: Bun, React, Vite, Wouter, Hono and the managed Runable monorepo. Preserve template-managed `__` files and analytics setup.

## Contact and booking behaviour

The enquiry form prepares a `mailto:` email. It does not automatically send messages, store enquiries, or confirm appointments. The visitor sends the draft in their own email app; the salon confirms availability directly.

## Before publishing

Confirm the final address/postcode, current team information, service prices and booking policies. Rating figures are snapshots dated 16 November 2026. Logo and photographic assets were collected as public references for a preview; obtain publication approval and replace low-resolution gallery references with approved originals. No licence to the salon imagery is granted by this repository.

## Security and hosting

Actual `.env` files, credentials, local databases, generated builds and test screenshots are excluded. Do not commit tokens.

The revised website is published from the `gh-pages` branch of the public repository:

- Website: https://sygstokkieza.github.io/colour-lab-hair-studio/
- Repository: https://github.com/SygStokkieZA/colour-lab-hair-studio
- Contact: https://sygstokkieza.github.io/colour-lab-hair-studio/contact/

The `main` branch holds the managed application source. GitHub Pages serves only the static frontend; it does not host the API scaffold. The other previously deleted repositories are not recreated.

### Rebuild the Pages export

```sh
bun install --frozen-lockfile
bun run --cwd packages/web build --mode github-pages
python -m pip install playwright
python deployment/export_pages.py
```

The export script uses Google Chrome at `/usr/bin/google-chrome` and prerenders Home and Contact from the same managed React application. It adds a sitemap and redirects for the three removed pages. Publish only the contents of `packages/web/dist/` to `gh-pages`. Never copy `.env`, source credentials or server files into that branch.

Runable preview edits do not automatically publish to GitHub Pages. Rebuild and push the static export whenever publishing an update.

## SEO foundations

- Descriptive local page titles and per-page meta descriptions.
- One H1 per page, semantic section headings and descriptive image alt text.
- Open Graph and Twitter card metadata.
- Factual HairSalon JSON-LD with contact details, address, social links and opening hours.
- No self-serving review-rating schema or invented postcode, coordinates, prices or canonical domain.

The Pages export includes canonical URLs, absolute social-image URLs and a two-page XML sitemap for the public GitHub Pages address. Home and Contact are prerendered so the initial HTML contains page content and metadata. If a custom domain is added later, update the publishing URL constants and rebuild. Google Search Console verification remains an owner action.
