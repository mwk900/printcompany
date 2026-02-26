# Trent Valley Printworks (Portfolio Concept)

Premium fictional B2B print studio website concept for portfolio demonstration.

Concept redesign created for portfolio purposes. Not affiliated with any existing company.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Jest + Testing Library + jest-axe
- Playwright

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## QA commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

## Core pages

- `/` Home
- `/services` Services index
- `/services/[slug]` Service detail template
- `/work` Case studies
- `/file-setup` File setup/specs
- `/about` About
- `/contact` Quote + compact ask module

## Key systems

- Full-screen mobile nav overlay:
  - `components/site/mobile-menu-overlay.tsx`
- Desktop section scroll rail:
  - `components/site/desktop-scroll-rail.tsx`
- Mobile section pill + quick nav sheet:
  - `components/site/mobile-section-pill.tsx`
  - `components/site/quick-nav-sheet.tsx`
- Shared scrollspy section map:
  - `lib/section-nav.ts`
- Scroll lock:
  - `lib/scroll-lock.ts`
- Scrollspy hook:
  - `hooks/use-section-spy.ts`
- Smooth section jump utility:
  - `lib/scroll-to-section.ts`

## Content and data

- Brand/services/case studies/contact:
  - `lib/site-data.ts`
- Homepage manual work carousel items:
  - `lib/work-items.ts`

## Imagery

Local image sets:

- `public/images/services/*`
- `public/images/work/*`

All section/service/work imagery is sourced from these local folders and rendered with `next/image`.
`next/image` outputs modern formats (`avif/webp`) in supported browsers via `next.config.ts`.

## Swap images quickly

1. Replace files in:
   - `public/images/services`
   - `public/images/work`
2. Keep the same filenames to avoid code edits.
3. If using new filenames, update:
   - `lib/site-data.ts`
   - `lib/work-items.ts`

## Swap carousel items quickly

Edit `lib/work-items.ts`:

- Add/remove objects in `workItems`.
- Update `title`, `spec`, `image`, `alt`.
- `components/sections/work-carousel.tsx` reads this list automatically.

## Forms

- Primary quote form:
  - `components/forms/quote-form.tsx`
- Compact ask module:
  - `components/forms/compact-question-card.tsx`

All quote CTAs point to one target: `/contact#quote`.

## Test files

- Unit/interaction/a11y:
  - `__tests__/mobile-menu-overlay.test.tsx`
  - `__tests__/mobile-section-pill.test.tsx`
  - `__tests__/desktop-scroll-rail.test.tsx`
  - `__tests__/use-section-spy.test.tsx`
  - `__tests__/work-carousel.test.tsx`
  - `__tests__/quote-target.test.tsx`
  - `__tests__/mobile-cta.test.ts`
- E2E:
  - `e2e/navigation-and-carousel.spec.ts`

## Deployment notes

1. Deploy on Vercel or another Next.js-compatible host.
2. Set production domain in `lib/site-data.ts` (`siteConfig.siteUrl`).
3. Connect form handlers to backend/API endpoints before live usage.
