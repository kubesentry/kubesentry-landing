# KubeSentry — Landing Page

Pre-launch landing page for KubeSentry, the self-hosted Kubernetes threat detection platform.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com). Deployed on Cloudflare Pages.

## 🚀 Local development

Requirements: Node.js 20+

```bash
npm install
npm run dev
# → http://localhost:4321
```

## 🏗️ Production build

```bash
npm run build
# output → ./dist
```

## ☁️ Deploy on Cloudflare Pages

This repo is configured for Cloudflare Pages auto-deploy on `git push`.

**Build settings:**
- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20` (set in env vars if needed: `NODE_VERSION=20`)

## 📧 Email signup

The signup form in `src/components/EmailSignup.astro` currently uses
`localStorage` as a placeholder. To wire up a real email service provider,
search for the `TODO: Replace this fetch` comment in that file and follow
the inline examples for ConvertKit or Buttondown.

## 📁 Structure

```
src/
├── components/      # reusable Astro components
│   ├── Logo.astro
│   ├── DashboardMockup.astro
│   ├── EmailSignup.astro
│   ├── StatusBadge.astro
│   ├── StatCard.astro
│   ├── AlertRow.astro
│   └── ComparisonRow.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css

public/
└── favicon.svg
```

## 🎨 Design tokens

Colors and fonts live in `tailwind.config.mjs`. Key colors:

- `bg` `#0a0a0b` — primary background
- `accent` `#00ff9c` — KubeSentry green
- `danger` `#ff4d6d` — critical alerts
- `warn` `#ffb84d` — high-severity alerts

Fonts: **Geist** (sans/display), **JetBrains Mono** (mono). Loaded from
Google Fonts in `src/layouts/Layout.astro`.

## 📜 License

All rights reserved. Code is private and not licensed for redistribution.
