# Colour Lab — Hair Studio

Responsive five-page website for Colour Lab in George, South Africa.

## Pages

- `/` — Home
- `/about` — Studio and team
- `/services` — Service filters, disclosures and portfolio lightbox
- `/testimonials` — Genuine, attributed review excerpts
- `/contact` — Contact information and email-enquiry preparation

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

Actual `.env` files, credentials, local databases, generated builds and test screenshots are excluded. Do not commit tokens. The managed application source lives on `main`. GitHub Pages serves a static frontend export from `gh-pages` at:

https://sygstokkieza.github.io/colour-lab-hair-studio/

The Pages build uses hash routes (for example `#/services`) so links and refreshes work without a server. Contact enquiries remain local email drafts; GitHub Pages does not host the managed API scaffold. The Runable preview keeps normal browser routes and remains separate.

To rebuild the Pages frontend using the existing managed Vite configuration:

```sh
bun run --cwd packages/web typecheck
bun run --cwd packages/web build --mode github-pages
```

Publish only `packages/web/dist/` to the `gh-pages` branch. Never copy the root environment file or backend credentials into that branch.
