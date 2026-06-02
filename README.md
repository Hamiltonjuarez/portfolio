# Hamilton Juárez — Portfolio

A Nuxt 3 portfolio showcasing four selected frontend projects with
screenshots, stack, responsibilities, architecture, and challenges per
case study.

## Stack

- Nuxt 3 + Vue 3 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Custom CSS entrance animations (down-appear pattern, respects `prefers-reduced-motion`)
- No external runtime dependencies beyond Nuxt

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run preview
```

## Customising

### Project content

Edit `composables/useProjects.ts`. Each `Project` entry powers the card on
the home page and the full case-study page at `/work/<slug>`.

Fields:

| Field              | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| `slug`             | URL slug used in the route                                  |
| `name`             | Display name                                                |
| `tagline`          | One-line summary used on the card and hero                  |
| `description`      | One-paragraph overview shown on the detail page             |
| `year`             | Year(s) worked on the project                               |
| `role`             | Your role                                                   |
| `isPrivate`        | `true` shows "Private client" badge, `false` shows "Live"   |
| `link`             | Optional public link (omit if private)                      |
| `stack`            | Array of tech names shown as chips                          |
| `responsibilities` | Array of things you owned                                   |
| `architecture`     | Numbered list of how it's wired                             |
| `challenges`       | Array of `{ title, body }` — the interview-defendable parts |
| `screenshots`      | Array of `{ src, alt, caption? }` — see below               |
| `accent`           | Hex color tint used on the card and hero gradient           |

### Screenshots

Drop images into `public/projects/<slug>/` matching the filenames in the
project's `screenshots` array. See `public/projects/README.md`. If an
image is missing, the UI falls back to a styled placeholder — safe to
ship before all assets land.

### Contact

The hero CTA and footer use `hamilton@solid.com.sv`. Update in
`components/AppHeader.vue`, `components/AppFooter.vue`, and
`pages/index.vue` if needed.

## Structure

```
portfolio/
├── app.vue
├── nuxt.config.ts
├── assets/css/main.css         # tokens, theme, entrance animations
├── composables/
│   ├── useProjects.ts          # ← edit project data here
│   └── useReveal.ts            # IntersectionObserver wiring
├── components/
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── SectionHeader.vue
│   ├── ProjectCard.vue
│   └── ScreenshotGallery.vue
├── layouts/default.vue
├── pages/
│   ├── index.vue               # landing + work grid + about + contact
│   └── work/[slug].vue         # per-project case study
└── public/
    ├── favicon.svg
    └── projects/<slug>/*.png   # ← drop screenshots here
```
