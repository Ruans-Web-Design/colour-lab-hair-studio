# Colour Lab — Design

> Starter design brief. Replace this content with the app you're building before writing any UI.
> Keep it short and concrete — it's the single source of truth for palette, typography, pages,
> screens, and flows across web, mobile, and desktop.

Two-page responsive salon website preview: Home and Contact. Home combines a short about section, all seven hair services, portfolio and two genuine attributed testimonials. Remove standalone About, Services and Testimonials pages. Keep refined botanical editorial styling based on the authentic logo and photographs. Web only; no database or additional API needed. The user subsequently approved recreating only the Colour Lab public repository and publishing this revision to GitHub Pages. The Runable preview remains available.

SEO: descriptive local page titles and descriptions, one H1 per page, semantic headings, descriptive image alt text, Open Graph/Twitter metadata and factual HairSalon structured data. Do not invent a canonical domain or add self-serving review-rating schema. The GitHub Pages export now uses the approved public GitHub Pages URL for canonical links, absolute social images and its two-page sitemap. Home and Contact use clean paths and prerendered initial HTML.

## Brand & Colors

One token set, consumed per platform:

- **Web & desktop**: CSS variables in `packages/web/src/web/styles.css` (desktop loads the web UI).
- **Mobile**: `Colors.light` / `Colors.dark` in `packages/mobile/constants/theme.ts`, read via `useColors()`; `userInterfaceStyle: "automatic"` follows the system light/dark setting.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| primary | #1F1F1F | #E5E5E5 | Buttons, active tab, accents |
| background | #FFFFFF | #0A0A0A | Page/screen background |
| card | #FFFFFF | #1A1A1A | Cards, surfaces |
| foreground | #171717 | #FAFAFA | Primary text |
| mutedForeground | #737373 | #A3A3A3 | Secondary text |
| border | #E5E5E5 | #262626 | Hairlines |
| destructive | #DC2626 | #EF4444 | Delete / errors |

## Approved direction

Warm ivory #F2EEE5, forest #25372D, ink #20251F, muted gold #B39A70. Cormorant Garamond display serif with Manrope body sans-serif. Fine borders, generous white space, squared controls, oversized headings and asymmetric image/text layouts. Authentic circular monogram, hair-result photography, staggered inset images. No invented credentials, prices or team portraits. Reference photos are preview-only pending publication approval.

Navigation with active states and mobile menu. Portfolio filters and keyboard-accessible lightbox. Service disclosures. Contact form opens a mailto draft and never claims a confirmed appointment. Phone, email and directions are real links. Rating snapshot dated 16 November 2026. Address omits disputed postcode. Preserve managed runtime and analytics.

## Typography

Name the display + body pairing here. Web: set font families in `styles.css` (self-hosted files go in `packages/web/public/fonts/`). Mobile: system font by default; load custom fonts with `useFonts` from `expo-font` and reference them via `Fonts` in `constants/theme.ts`.

## Pages & Screens

List each page/screen, its route file, and what it shows. Example:

- **Web — Home** (`packages/web/src/web/pages/index.tsx`) — what the user sees first.
- **Mobile — Home** (`packages/mobile/app/(tabs)/index.tsx`) — main tab.
- Add web pages under `src/web/pages/` (+ route in `app.tsx`); mobile tabs under `app/(tabs)/`, stack/modal screens under `app/`.

## Key User Flows

1. Describe the primary flow end to end (open → action → result).
2. ...

## Architecture

- **API**: typed oRPC client (`lib/api.ts` in each package) → the backend in `@template/web`. Query/mutation hooks live in `queries/` (one file per feature); pages/screens call them with `@tanstack/react-query`.
- **State/sync**: TanStack Query with optimistic updates for instant-feel interactions.
- **Auth / payments / uploads**: see `skills/app/references/` when those features are needed.

## Map and testimonials update

Embed an interactive Google Map immediately above the shared footer on Home and Contact, with the real George studio address, a directions link and a Google privacy note. Home testimonials become a manually controlled horizontal scroll-snap carousel: arrow and dot controls, native touch swiping, accessible labels and reduced-motion support. Preserve both genuine excerpts in prerendered HTML; no autoplay.

## Heading, FAQ and Pricing Refinement

Use one H1 per page, H2 for peer sections and H3 for services and FAQ questions; use editorial Title Case for headings. Contact enquiry is a peer H2, not a child of contact information. Add three factual, native disclosure FAQs on Home about booking, location and hours. Place a clearly labelled “Price Placeholder: R —” under each service; no invented amounts or offers. Preserve the existing visual identity and static export.

Each service has a compact forest-green “Booking” link alongside its price placeholder, linking to Contact. Allow the row to wrap on narrow screens and give each link a service-specific accessible name.

## Proposal-Safe Conversion Improvements
Client approval is pending. Replace placeholders with Request a Quote links and Enquire to Book CTAs, both carrying the service into Contact. Add a mobile Call / Enquire bar with bottom content clearance. Keep original photos and factual team names only. Proposal form creates an on-page copyable draft only; no send action or email provider. Name and email required, phone/date/message optional. Retain clear permission and business-detail approval notices, domain unchanged.
