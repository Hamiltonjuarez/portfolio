// Edit this file to update the projects shown across the portfolio.
// Each entry powers a card on the home page and a /work/<slug> detail page.
// Drop screenshots into /public/projects/<slug>/ and reference them by filename
// in the `screenshots` array.

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  isPrivate: boolean;
  link?: { label: string; href: string };
  stack: string[];
  responsibilities: string[];
  architecture: string[];
  challenges: { title: string; body: string }[];
  screenshots: { src: string; alt: string; caption?: string }[];
  accent?: string; // hex tint used in the card
};

const projects: Project[] = [
  {
    slug: "buddy-assist",
    name: "Buddy Assist",
    tagline: "On-demand assistance platform for daily-life tasks.",
    description:
      "Buddy Assist is a service platform where users request a vetted buddy to help with errands, transport, and short-cycle support tasks. I owned the front-of-house web experience: marketing site, request flow, and the buddy-facing dashboard used to claim and complete jobs.",
    year: "2024 — 2025",
    role: "Frontend Engineer",
    isPrivate: true,
    stack: [
      "Vue 3",
      "Nuxt",
      "TypeScript",
      "Tailwind CSS",
      "Pinia",
      "Firebase Auth",
      "REST + WebSockets",
    ],
    responsibilities: [
      "Designed the multi-step request flow (service → schedule → payment → confirmation).",
      "Built the buddy-facing dashboard with real-time job updates over WebSockets.",
      "Set up component library and design tokens used across web and mobile webviews.",
      "Wired auth and role-based routing (customer vs. buddy vs. operator).",
      "Owned accessibility and mobile-first responsive behavior end-to-end.",
    ],
    architecture: [
      "Nuxt SSR for marketing pages, SPA mode for the authenticated app shell.",
      "Pinia stores split by domain (session, jobs, billing) with persisted slices.",
      "REST for CRUD + WebSocket channel for live job status and notifications.",
      "Shared design tokens consumed by Tailwind theme and a Figma library.",
    ],
    challenges: [
      {
        title: "Real-time state without re-render storms",
        body: "Buddies receive a stream of job-status events while scrolling long lists. I scoped the WebSocket payload by visible viewport and debounced store writes to keep frame budget under 16ms on mid-range Android.",
      },
      {
        title: "Multi-role routing with one codebase",
        body: "Customers, buddies, and operators see very different UIs from the same shell. I built a role-aware route guard plus a layout switcher so the bundle stays small and copy stays consistent.",
      },
    ],
    screenshots: [
      { src: "01-home.png", alt: "Buddy Assist landing page hero" },
      { src: "02-request.png", alt: "Multi-step request flow" },
      { src: "03-dashboard.png", alt: "Buddy dashboard with live job feed" },
      { src: "04-tracking.png", alt: "In-progress job tracking screen" },
    ],
    accent: "#7dd3fc",
  },
  {
    slug: "symple",
    name: "Symple",
    tagline: "Operational tooling for service businesses.",
    description:
      "Symple is an internal-ops SaaS that streamlines quoting, scheduling, and billing for small service teams. I joined to rebuild the dashboard with a fresher visual language and to ship a calendar view that operators had been requesting for months.",
    year: "2023 — 2024",
    role: "Frontend Engineer",
    isPrivate: true,
    stack: [
      "Vue 3",
      "Nuxt",
      "TypeScript",
      "Tailwind CSS",
      "Vue Query",
      "FullCalendar",
      "Laravel API",
    ],
    responsibilities: [
      "Rebuilt the dashboard from legacy templates into a token-driven component system.",
      "Designed and shipped the scheduling calendar (drag, resize, conflict detection).",
      "Refactored the data layer onto Vue Query, removing hand-rolled cache logic.",
      "Set up Storybook for the new component library and onboarded two teammates.",
    ],
    architecture: [
      "Vue Query for server state with optimistic updates on schedule changes.",
      "Composable per domain entity (useJobs, useClients, useInvoices) over a Laravel JSON API.",
      "Component library with primitive + composite layers documented in Storybook.",
    ],
    challenges: [
      {
        title: "Calendar performance with hundreds of events",
        body: "Operators load multi-week views with 300+ events. I virtualized the day columns and memoized event positioning so initial paint stayed under 200ms.",
      },
      {
        title: "Migrating without breaking workflows",
        body: "Teams used the old UI daily. I shipped the rebuild behind a per-tenant flag and ran parallel dashboards for two weeks to gather feedback before flipping the default.",
      },
    ],
    screenshots: [
      { src: "01-dashboard.png", alt: "Symple dashboard overview" },
      { src: "02-calendar.png", alt: "Scheduling calendar view" },
      { src: "03-quote.png", alt: "Quote builder" },
      { src: "04-invoice.png", alt: "Invoice detail" },
    ],
    accent: "#a78bfa",
  },
  {
    slug: "39dollarglasses",
    name: "39DollarGlasses",
    tagline: "Affordable prescription eyewear, online.",
    description:
      "39DollarGlasses is a direct-to-consumer prescription eyewear retailer. I work on the storefront experience — product pages, lens configurator, cart, and the My Account area — focused on conversion clarity and post-purchase support.",
    year: "2025 — present",
    role: "Frontend Engineer",
    isPrivate: false,
    link: { label: "39dollarglasses.com", href: "https://www.39dollarglasses.com" },
    stack: [
      "Nuxt",
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "Headless Commerce API",
      "Algolia",
      "Klaviyo",
    ],
    responsibilities: [
      "Owned the lens configurator flow — frame → prescription → coatings → checkout handoff.",
      "Rebuilt product listing pages with Algolia faceted search and instant filtering.",
      "Improved Core Web Vitals (LCP, CLS) on PDP and PLP, reducing CLS below 0.05.",
      "Collaborated with the merchandising team on weekly campaign landing pages.",
    ],
    architecture: [
      "Nuxt hybrid rendering — SSG for marketing, SSR for PDP/PLP, SPA for the account area.",
      "Algolia for search and faceted filtering with URL-synced filter state.",
      "Klaviyo for lifecycle email and on-site capture flows.",
      "Image pipeline with responsive srcset + AVIF/WebP fallbacks.",
    ],
    challenges: [
      {
        title: "Lens configurator complexity",
        body: "Prescription + lens type + coatings + add-ons produce thousands of valid combinations and many invalid ones. I modeled the configurator as a state machine so impossible states are unreachable and pricing stays in sync as the user edits backward.",
      },
      {
        title: "Squeezing CLS on PDP",
        body: "Hero gallery, reviews widget, and a sticky add-to-cart were each contributing to layout shift. I reserved fixed aspect-ratios per slot and deferred third-party widgets behind IntersectionObserver, cutting CLS from 0.18 to under 0.05.",
      },
    ],
    screenshots: [
      { src: "01-home.png", alt: "39DollarGlasses home page" },
      { src: "02-plp.png", alt: "Product listing with faceted filters" },
      { src: "03-pdp.png", alt: "Product detail page" },
      { src: "04-configurator.png", alt: "Lens configurator flow" },
    ],
    accent: "#c5ff3a",
  },
  {
    slug: "ast-surf-resort",
    name: "AST Surf Resort",
    tagline: "Boutique surf-and-stay marketing site.",
    description:
      "AST Surf Resort is a hospitality property targeting traveling surfers. The brief was a fast, image-heavy marketing site with a clear booking-inquiry path and bilingual content (EN/ES).",
    year: "2023",
    role: "Frontend Engineer & Designer",
    isPrivate: false,
    link: { label: "Live site", href: "#" },
    stack: ["Nuxt", "Vue 3", "Tailwind CSS", "Nuxt i18n", "Sanity CMS", "Cloudinary"],
    responsibilities: [
      "Designed and built the full marketing site from a Figma starting point.",
      "Modeled CMS schemas in Sanity so the owner can edit rooms, rates, and trips.",
      "Implemented EN/ES localization with Nuxt i18n and per-locale OG metadata.",
      "Set up the Cloudinary pipeline for responsive imagery and art-directed crops.",
    ],
    architecture: [
      "Nuxt SSG with on-demand revalidation triggered by Sanity webhooks.",
      "Sanity Studio embedded under /studio for the owner to self-serve content.",
      "Cloudinary for responsive imagery, art direction, and AVIF delivery.",
    ],
    challenges: [
      {
        title: "Image-heavy without being slow",
        body: "The brand lives on big surf photography. I art-directed crops per breakpoint in Cloudinary and used native lazy loading + LQIP placeholders so the hero is interactive in under 1.5s on 4G.",
      },
      {
        title: "Bilingual content the owner can edit",
        body: "Owner wanted to change copy without touching code. Localized fields in Sanity + a per-locale preview made it possible without a separate translation workflow.",
      },
    ],
    screenshots: [
      { src: "01-home.png", alt: "AST Surf Resort home page" },
      { src: "02-rooms.png", alt: "Rooms listing" },
      { src: "03-trips.png", alt: "Surf trips section" },
      { src: "04-booking.png", alt: "Booking inquiry form" },
    ],
    accent: "#fb923c",
  },
];

export const useProjects = () => {
  return {
    all: () => projects,
    bySlug: (slug: string) => projects.find((p) => p.slug === slug),
  };
};
