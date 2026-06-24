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
    tagline: "Pet-care services marketplace with bookings and live notifications.",
    description:
      "Buddy is a marketplace where pet owners discover vendors, book veterinary and grooming services, and manage care-plan subscriptions. I built the consumer-facing Nuxt client and worked across the Laravel API and Keycloak SSO that back it, focusing on the booking flow, vendor discovery, and real-time notifications.",
    year: "2025 — 2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Nuxt 4", "Vue 3", "Pinia", "Tailwind CSS", "Laravel 11", "Keycloak", "Pusher", "MySQL"],
    responsibilities: [
      "Built the consumer web app: pet management, service booking, and care-plan subscriptions.",
      "Implemented cookie-based PKCE auth against Keycloak so the SPA never holds raw tokens.",
      "Wired real-time booking and notification updates over Pusher/WebSockets.",
      "Integrated map-based vendor search and payment-method management.",
      "Contributed to the multi-vendor Laravel API powering the platform.",
    ],
    architecture: [
      "Nuxt 4 SSR client talking to a Laravel 11 multi-vendor REST API.",
      "Keycloak as the identity provider; backend mediates token exchange and issues HttpOnly session cookies.",
      "Pusher channels for live booking status and notifications, with a fallback slug set for resilience.",
      "Geospatial vendor search backed by MySQL spatial columns.",
    ],
    challenges: [
      {
        title: "Cookie-based PKCE without exposing tokens",
        body: "A public SPA can't safely hold a client secret. I ran the OIDC authorization-code flow with PKCE and had the backend exchange the code and set HttpOnly cookies, so the browser never touches raw access tokens — at the cost of carefully allowlisting Keycloak and the WebSocket host in CSP.",
      },
      {
        title: "Real-time notifications that survive a settings failure",
        body: "Channel subscriptions depend on dynamic event slugs fetched from the settings API. If that call failed, notifications would silently stop. I merged the dynamic slugs with a hard-coded fallback set via a deduplicating Set so live updates keep working even when settings can't load.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Buddy storefront home with service categories" },
      { src: "02-services.jpg", alt: "Buddy service catalog with filters" },
      { src: "03-login.jpg", alt: "Branded Buddy sign-in screen" },
      { src: "04-mobile.jpg", alt: "Mobile view of the storefront" },
    ],
    accent: "#e46767",
  },
  {
    slug: "ast",
    name: "Coastal Surf Resort Platform",
    tagline: "Bilingual surf-and-stay marketing site with a self-serve CMS.",
    description:
      "A hospitality property for traveling surfers needed an image-heavy, bilingual (EN/ES) marketing site with accommodations, surf programs, and a booking-inquiry path. I built and iterated the platform across three versions, evolving the CMS and adding an optional e-commerce mode.",
    year: "2021 — 2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 9", "Vue 2", "jQuery", "Bootstrap 4", "MySQL", "Laravel Mix"],
    responsibilities: [
      "Built the marketing site: accommodations, surf lessons/camps, packages, and dining.",
      "Implemented locale middleware for full EN/ES content.",
      "Built an admin CMS with CRUD, media galleries, and newsletter management.",
      "Added an optional e-commerce mode (products, orders, coupons) behind a feature flag.",
      "Maintained the schema and content model across three site iterations.",
    ],
    architecture: [
      "Laravel 9 monolith with Blade views and Vue 2 islands for interactive sections.",
      "Locale middleware switches content; per-locale metadata for SEO.",
      "Flexible 'section/extra' content model lets the owner compose pages from the admin.",
      "Optional WooCommerce-style storefront toggled per deployment.",
    ],
    challenges: [
      {
        title: "Image-heavy without being slow",
        body: "The brand lives on big surf photography. I leaned on responsive imagery and lazy loading so hero sections stay fast on mobile connections that travelers actually use.",
      },
      {
        title: "Content the owner can edit in two languages",
        body: "A flexible section/extra content model with localized fields let the owner restructure pages and edit EN/ES copy without a developer in the loop.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Surf resort home page" },
      { src: "02-about.jpg", alt: "About / story section" },
      { src: "03-dining.jpg", alt: "Dining section" },
      { src: "04-services.jpg", alt: "Surf services and programs" },
      { src: "05-stay.jpg", alt: "Accommodations listing" },
      { src: "06-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#e49567",
  },
  {
    slug: "solid-platform",
    name: "Solid",
    tagline: "Corporate site with a custom headless CMS — and a multi-client store platform.",
    description:
      "Solid is the studio's own corporate site: a marketing front end driven by a bespoke admin CMS for blog, portfolio, services, and careers. Alongside it sits a reusable WordPress + WooCommerce platform that spins up branded multi-client stores from a shared codebase.",
    year: "2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 12", "Inertia v2", "React 19", "TypeScript", "Tailwind v4", "WordPress", "WooCommerce", "MySQL"],
    responsibilities: [
      "Built the corporate marketing site (home, work, services, blog, careers) on Inertia + React.",
      "Built the admin CMS: blog with translations, portfolio, services, jobs, and newsletter campaigns.",
      "Implemented 2FA, email verification, and role-based access with Fortify + spatie/permission.",
      "Engineered a multi-client WordPress/WooCommerce platform with a shared plugin and vendor theme.",
      "Added bilingual storefronts, seeded catalogs, and Wompi/Tilopay payment gateways.",
    ],
    architecture: [
      "Laravel 12 monolith serving an Inertia v2 + React 19 front end, no separate API layer.",
      "Headless-style admin CMS with translation tables driving public content.",
      "Separate WordPress + WooCommerce platform split across plugin, theme, and per-client repos.",
      "Dockerized store deploys that auto-install WP, seed a catalog, and wire commerce config from env.",
    ],
    challenges: [
      {
        title: "One store codebase, many branded clients",
        body: "The WooCommerce platform had to stay reusable while every client looks bespoke. A shared platform plugin plus an isolated vendor theme and a per-client repo kept client-specific code from leaking into the shared base, with hooks as the only extension surface.",
      },
      {
        title: "Bilingual CMS without a translation plugin",
        body: "Rather than pull in WPML/Polylang, the storefront does EN/ES through a gettext filter map plus a cookie — which means every new string has to be registered in both the gettext and ngettext maps to stay translated.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Solid brand imagery" },
    ],
    accent: "#e4c567",
  },
  {
    slug: "dealer-intranet",
    name: "Corporate Intranet Portal",
    tagline: "Internal comms and training hub for a multi-brand retail group.",
    description:
      "An automotive retail group needed an internal portal for company news, onboarding, and product training across departments. I built a role-based intranet with a content hub, induction modules with progress tracking, and a media-rich knowledge base.",
    year: "2018 — 2025",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 9", "Vue 2", "Bootstrap 4", "MySQL", "Laravel Passport", "Laravel Mix"],
    responsibilities: [
      "Built multi-role authentication and a role-aware navigation model.",
      "Implemented a hierarchical posts/categories CMS for branched news feeds.",
      "Built induction and training modules with lessons and progress tracking.",
      "Added a media library with a PDF viewer, comments, and reactions.",
      "Implemented Excel exports for administrative reporting.",
    ],
    architecture: [
      "Laravel 9 monolith with Passport for token-based access and custom role middleware.",
      "Hierarchical content model feeding department-specific feeds (sales, HR, IT, activities).",
      "Vue 2 islands over Blade for interactive lessons and media views.",
      "Laravel Mix asset pipeline.",
    ],
    challenges: [
      {
        title: "Many roles, one navigation surface",
        body: "Departments and seniority levels each see a different slice of the portal. Layering custom role middleware over a single hierarchical content model kept the routing consistent while letting each role see only what it should.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Intranet portal sign-in screen" },
      { src: "02-mobile.jpg", alt: "Mobile view of the sign-in screen" },
    ],
    accent: "#d4e467",
  },
  {
    slug: "barra-oliba",
    name: "Restaurant Website & Admin Platform",
    tagline: "Bilingual restaurant site with a Filament-powered back office.",
    description:
      "A restaurant and cocktail bar needed a polished bilingual site with an editable menu, gallery, and reviews, plus a self-serve admin. I built the public site and a Filament admin panel for menu, content, and media management.",
    year: "2025 — 2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 11", "Filament 3", "Livewire 3", "Vue 3", "Tailwind CSS", "MySQL", "Redis", "Vite"],
    responsibilities: [
      "Built the public site: home slider, menu, gallery, and contact.",
      "Implemented EN/ES locale switching with translated content.",
      "Built a Filament admin panel with role-based access for menu and content.",
      "Integrated cached Google reviews on the front end.",
      "Set up activity logging and an audit trail for content changes.",
    ],
    architecture: [
      "Laravel 11 with a Filament 3 / Livewire admin panel.",
      "MySQL for content plus Redis for caching (including external reviews).",
      "Vue 3 + Vite for interactive front-end sections.",
      "Translatable models driving EN/ES content.",
    ],
    challenges: [
      {
        title: "Self-serve content without breaking layout",
        body: "Owners edit menu items, slides, and galleries directly. Modeling that content as translatable, ordered records in Filament kept the front end stable while giving non-technical staff full control of what renders.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Restaurant home page" },
      { src: "02-about.jpg", alt: "About section" },
      { src: "03-menu.jpg", alt: "Menu page" },
      { src: "04-gallery.jpg", alt: "Photo gallery" },
      { src: "05-contact.jpg", alt: "Contact page" },
      { src: "06-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#a6e467",
  },
  {
    slug: "brandy",
    name: "Advertising Agency Marketing Site",
    tagline: "Agency portfolio site with a content-managed back office.",
    description:
      "A branding and advertising agency wanted a marketing site to showcase work, clients, and a blog, all editable without a developer. I built the public site and an admin panel for portfolio, posts, galleries, and contact handling.",
    year: "2020 — 2025",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 9", "Bootstrap 5", "jQuery", "MySQL", "Laravel Mix", "Sass"],
    responsibilities: [
      "Built the homepage with a dynamic slider and a portfolio/work showcase.",
      "Built project detail pages and a client showcase gallery.",
      "Implemented a blog with an admin for posts and categories.",
      "Wired contact forms with email notifications and newsletter signup.",
      "Added multi-language support across the site.",
    ],
    architecture: [
      "Laravel 9 monolith with Blade views and a custom admin panel.",
      "Media and gallery management with multiple images per gallery.",
      "MySQL-backed content model for work, posts, and clients.",
      "Laravel Mix / Sass asset pipeline.",
    ],
    challenges: [
      {
        title: "A portfolio the agency keeps current itself",
        body: "Agencies refresh their work constantly. Moving the showcase and client list into a database-driven admin meant new case studies and logos go live without a deploy.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Agency home page" },
      { src: "02-work.jpg", alt: "Work showcase" },
      { src: "03-blog.jpg", alt: "Blog index" },
      { src: "04-contact.jpg", alt: "Contact page" },
      { src: "05-clients.jpg", alt: "Client showcase" },
      { src: "06-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#78e467",
  },
  {
    slug: "cobra-studio",
    name: "Cobra Studio",
    tagline: "Studio marketing site with a Filament CMS and integrated job board.",
    description:
      "Cobra Studio is the agency's own marketing site: bilingual landing pages, a blog, a project showcase, and a careers section with job listings synced from ClickUp. I built the public site and the Filament admin behind it.",
    year: "2025",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 11", "Filament 3", "Livewire 3", "Vue 3", "Tailwind CSS", "MySQL", "Vite"],
    responsibilities: [
      "Built bilingual (EN/ES) landing pages, blog, and project showcase.",
      "Built a careers section with job listings integrated with ClickUp.",
      "Built a Filament admin for content, services, reviews, and team/partners.",
      "Implemented contact forms protected with reCAPTCHA.",
      "Set up FAQ sections segmented for talent and companies.",
    ],
    architecture: [
      "Laravel 11 with a Filament 3 / Livewire admin panel.",
      "ClickUp integration feeding the job board.",
      "Vue 3 + Vite for interactive front-end sections.",
      "MySQL content model with translatable records.",
    ],
    challenges: [
      {
        title: "A job board that stays in sync with operations",
        body: "Recruiting lived in ClickUp, so the careers page had to mirror it rather than become a second source of truth. Pulling listings from ClickUp kept the public board accurate without double data entry.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Cobra Studio home page" },
    ],
    accent: "#67e487",
  },
  {
    slug: "vehicle-rental",
    name: "Car Rental Admin System",
    tagline: "Public fleet site plus a drag-to-reorder fleet admin.",
    description:
      "A car-rental company needed a public site showcasing its fleet and destinations, backed by an admin to manage everything. I built a Laravel + Inertia/React app with a sortable fleet manager, media library, and full SEO controls.",
    year: "2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 12", "Inertia v2", "React 19", "TypeScript", "Tailwind v4", "MySQL", "Vite"],
    responsibilities: [
      "Built the public landing page with fleet showcase and destinations.",
      "Built a fleet admin with drag-to-reorder cars and sortable destinations.",
      "Implemented user/role management and two-factor authentication.",
      "Built a media manager with folder organization.",
      "Implemented SEO controls (canonicals, JSON-LD, sitemap) and newsletter confirmation.",
    ],
    architecture: [
      "Laravel 12 serving an Inertia v2 + React 19 front end.",
      "Sortable, ordered records for fleet and destinations.",
      "Media manager with folders backing both public and admin imagery.",
      "Activity logging and database backups for operations.",
    ],
    challenges: [
      {
        title: "Letting staff arrange the fleet visually",
        body: "Which cars surface first is a merchandising decision, not a code change. A drag-to-reorder admin over ordered records put that control in the operator's hands while keeping the public listing deterministic.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Car rental home with fleet" },
      { src: "02-condiciones.jpg", alt: "Rental conditions page" },
      { src: "03-privacy.jpg", alt: "Privacy page" },
      { src: "04-terms.jpg", alt: "Terms page" },
    ],
    accent: "#67e4b6",
  },
  {
    slug: "copey",
    name: "Astronomical Experience Booking Platform",
    tagline: "Booking platform for stargazing experiences with payments.",
    description:
      "An astronomy observatory tour operator needed to sell scheduled stargazing experiences online. I built a Laravel + Vue platform with experience booking, availability and schedule management, payments, and reminder notifications.",
    year: "2025",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 11", "Vue 3", "Tailwind CSS", "Alpine.js", "MySQL", "Vite"],
    responsibilities: [
      "Built the experience-booking flow with availability and schedule management.",
      "Integrated Tilopay for online payments.",
      "Built an admin panel for experiences, content, and bookings.",
      "Implemented booking-reminder email notifications via scheduled jobs.",
      "Built blog, gallery, contact, and newsletter sections.",
    ],
    architecture: [
      "Laravel 11 with Vue 3 + Alpine.js front-end interactions.",
      "Scheduled jobs for upcoming-booking reminders.",
      "Tilopay payment integration.",
      "MySQL-backed experiences, schedules, and bookings.",
    ],
    challenges: [
      {
        title: "Selling time-boxed experiences",
        body: "Stargazing slots are capacity- and date-bound, so the booking model had to reconcile schedule, capacity, and existing bookings before taking payment — the kind of availability logic that's easy to get subtly wrong.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Observatory experiences home" },
      { src: "02-experiences.jpg", alt: "Experiences listing" },
      { src: "03-blog.jpg", alt: "Blog index" },
      { src: "04-about.jpg", alt: "About page" },
      { src: "05-gallery.jpg", alt: "Photo gallery" },
      { src: "06-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#67e4e4",
  },
  {
    slug: "crudo",
    name: "Restaurant Platform",
    tagline: "Bilingual restaurant site with a modern Inertia/React admin.",
    description:
      "A restaurant needed a bilingual site with a menu, reservations, and an editable back office. I built a Laravel 12 + Inertia/React app with a shadcn/ui admin, translatable content, and a reservation-capable contact flow.",
    year: "2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 12", "Inertia v2", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "MySQL"],
    responsibilities: [
      "Built the public site: hero carousel, bilingual menu, testimonials, and FAQ.",
      "Built a contact flow supporting table reservations.",
      "Built an admin dashboard with role-based access and a media library.",
      "Implemented EN/ES content via translation tables and JSON locale files.",
      "Added activity audit trails and database backups.",
    ],
    architecture: [
      "Laravel 12 serving an Inertia v2 + React 19 front end with shadcn/ui in the admin.",
      "Dual-language content via DB translation tables plus JSON locale files.",
      "Public pages use richer animation tooling; admin stays on shadcn/ui primitives.",
      "Pest test suite over the back end.",
    ],
    challenges: [
      {
        title: "Two sources of translation, one source of truth",
        body: "Content lives in DB translation tables while UI strings live in JSON locale files. Keeping the admin forms and seeders disciplined about which layer owns what is what stops EN/ES drift as the menu changes.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Restaurant home page" },
      { src: "02-about.jpg", alt: "About page" },
      { src: "03-menu.jpg", alt: "Menu page" },
      { src: "04-experience.jpg", alt: "Experience page" },
      { src: "05-faq.jpg", alt: "FAQ page" },
    ],
    accent: "#67b6e4",
  },
  {
    slug: "surf-travel",
    name: "Surf Resort Booking Platform",
    tagline: "Multi-location surf booking with 3-D Secure payments.",
    description:
      "A surf-travel operator needed to sell packages across multiple resort locations with online payment. I built a Laravel + Vue platform covering the booking workflow, package management, and Wompi payments with 3-D Secure.",
    year: "2024 — 2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 9", "Vue 3", "Blade", "Tailwind CSS", "MySQL", "Laravel Mix"],
    responsibilities: [
      "Built multi-location package browsing and availability.",
      "Built the booking workflow: schedule → payment → confirmation.",
      "Integrated Wompi payments with 3-D Secure support.",
      "Implemented registration, social auth, and email verification.",
      "Built an admin for content, media, and coupon/discount codes.",
    ],
    architecture: [
      "Laravel 9 monolith with Blade and Vue 3 components.",
      "Booking state machine across schedule, payment, and confirmation steps.",
      "Wompi payment integration with 3DS challenge handling.",
      "Multi-language content with an admin CMS.",
    ],
    challenges: [
      {
        title: "Payments that must clear a 3DS challenge",
        body: "Card payments route through Wompi's 3-D Secure flow, which interrupts checkout with a bank challenge. The booking had to hold its state across that round-trip and only confirm once the challenge resolves — gracefully handling the cases where it doesn't.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Surf travel home page" },
      { src: "02-about.jpg", alt: "About page" },
      { src: "03-contact.jpg", alt: "Contact page" },
      { src: "04-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#6787e4",
  },
  {
    slug: "ficus",
    name: "Financial Consulting CMS",
    tagline: "Consulting firm site with a fully content-managed front end.",
    description:
      "A financial-consulting firm needed a marketing site driven entirely by an admin: services, portfolio, blog, careers, and FAQs, in two languages. I built a Laravel 12 + Inertia/React app with a CMS, Mailchimp newsletter, and bot-protected forms.",
    year: "2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 12", "Inertia v2", "React 19", "TypeScript", "Tailwind v4", "MySQL", "Pest"],
    responsibilities: [
      "Built the animated marketing site with locale switching.",
      "Built an admin CMS for projects, services, jobs, blog, and FAQs.",
      "Implemented a contact form with rate limiting and Turnstile CAPTCHA.",
      "Integrated Mailchimp newsletter with token-based confirm/unsubscribe.",
      "Added activity logging, RBAC, and SEO (robots.txt, sitemap).",
    ],
    architecture: [
      "Laravel 12 serving an Inertia v2 + React 19 front end.",
      "Translation tables drive every public content type.",
      "Cloudflare Turnstile on forms; throttling on submissions.",
      "Mailchimp integration with tokenized confirmation flows.",
    ],
    challenges: [
      {
        title: "Everything editable, nothing hard-coded",
        body: "The firm wanted to manage all copy and content themselves across two languages. Backing every public section with translation tables and a consistent admin form pattern meant the site can be fully re-authored without a deploy.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Consulting firm brand imagery" },
    ],
    accent: "#7867e4",
  },
  {
    slug: "cancer-charity",
    name: "Cancer Foundation Portal",
    tagline: "Bilingual nonprofit site with a content-managed back office.",
    description:
      "A cancer-care nonprofit needed a bilingual public site for programs, services, and news, with a self-serve admin. I built a Laravel 12 + Filament platform with a sortable programs directory, blog, galleries, and bot-protected contact.",
    year: "2024 — 2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 12", "Filament 3", "Tailwind CSS", "Alpine.js", "MySQL", "Vite"],
    responsibilities: [
      "Built the bilingual (EN/ES) landing site with programs and services.",
      "Built a Filament admin with role-based access.",
      "Built a blog with categories and featured posts and a sortable services directory.",
      "Implemented a contact form protected with reCAPTCHA and email delivery.",
      "Added photo galleries with image processing and an activity audit trail.",
    ],
    architecture: [
      "Laravel 12 with a Filament 3 admin panel and Alpine.js front-end interactions.",
      "Environment-switched Vite build configs for master vs. developer modes.",
      "Database-backed sessions and translatable content models.",
      "Vite asset pipeline.",
    ],
    challenges: [
      {
        title: "One codebase, two build targets",
        body: "The project switches Vite configurations based on a deploy-time flag, so the same code can ship as a master build or a developer build. Keeping that branching predictable across environments was the main operational wrinkle.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Nonprofit home page" },
      { src: "02-about.jpg", alt: "About page" },
      { src: "03-services.jpg", alt: "Programs and services" },
      { src: "04-blog.jpg", alt: "Blog index" },
      { src: "05-contact.jpg", alt: "Contact page" },
    ],
    accent: "#a667e4",
  },
  {
    slug: "travel-agency",
    name: "Travel & Hospitality Platform",
    tagline: "Travel catalog and rentals site with a Filament admin.",
    description:
      "A travel and hospitality operator needed a site for travel products, rental properties, and editorial content, with a self-serve back office. I built a Laravel 11 + Filament platform with catalog, rentals, blog, and an arrival questionnaire.",
    year: "2025 — 2026",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 11", "Filament 3", "Vue 3", "Tailwind CSS", "MySQL", "Redis", "Docker"],
    responsibilities: [
      "Built a travel product catalog with categories.",
      "Built rental-property listings with media and amenities.",
      "Built a blog with authors and categories and a photo gallery.",
      "Implemented an arrival questionnaire and contact forms with notifications.",
      "Built a Filament admin with role-based permissions and EN/ES content.",
    ],
    architecture: [
      "Laravel 11 with a Filament 3 admin, MySQL, and Redis.",
      "Dockerized dev/prod environments.",
      "Route groups separating master, core, and custom-admin areas.",
      "Translatable content models for EN/ES.",
    ],
    challenges: [
      {
        title: "Scaffolding a site from a shared template",
        body: "The project was built on a reusable agency template, which meant reconciling template defaults (config naming, route groups) with this client's actual catalog and rentals before the back office behaved predictably.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Travel platform home page" },
      { src: "02-about.jpg", alt: "About page" },
      { src: "03-gallery.jpg", alt: "Photo gallery" },
      { src: "04-blog.jpg", alt: "Blog index" },
    ],
    accent: "#d467e4",
  },
  {
    slug: "tsunami",
    name: "Restaurant & Hospitality CMS",
    tagline: "Restaurant and surf-hotel site with an interactive menu.",
    description:
      "A beachfront restaurant and surf hotel needed a single site for both: an interactive menu, room showcase, and editable content. I built a Laravel site with a sectioned menu, hotel gallery, and an admin CMS.",
    year: "2019 — 2025",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 9", "Vue 2", "jQuery", "Tailwind CSS", "Bootstrap 4", "MySQL"],
    responsibilities: [
      "Built the homepage and an interactive menu with sections, categories, and products.",
      "Built a surf-hotel showcase with a room gallery.",
      "Built an admin dashboard for content and media management.",
      "Implemented role-based access control.",
      "Built contact forms with email submission.",
    ],
    architecture: [
      "Laravel 9 monolith with Blade, Vue 2, and jQuery sections.",
      "Sectioned content model spanning restaurant and hotel.",
      "Media management with image processing and galleries.",
      "MySQL-backed posts, sections, and products.",
    ],
    challenges: [
      {
        title: "Two businesses, one site",
        body: "A restaurant and a hotel share the property and the domain. A sectioned content model let both live under one CMS and one navigation without forcing visitors to pick which business they came for.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Restaurant and hotel home page" },
      { src: "02-menu.jpg", alt: "Interactive menu" },
      { src: "03-ast-surf-hotel.jpg", alt: "Surf hotel showcase" },
      { src: "04-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#e467c5",
  },
  {
    slug: "digital-menu",
    name: "Restaurant Digital Menu Platform",
    tagline: "Multi-vendor QR menu SaaS with orders and subscriptions.",
    description:
      "A multi-vendor SaaS that lets restaurants publish QR-code digital menus and take orders. I worked on the Laravel + Inertia back end and vendor/admin dashboards covering catalogs, orders, reviews, and vendor subscription plans.",
    year: "2025",
    role: "Full-stack Engineer",
    isPrivate: true,
    stack: ["Laravel 11", "Vue 3", "Inertia.js", "Tailwind CSS", "MySQL", "Sanctum", "Vite"],
    responsibilities: [
      "Built per-vendor QR menus with categories and sections.",
      "Built a vendor management dashboard.",
      "Implemented order management for on-site and delivery flows.",
      "Built customer reviews and ratings.",
      "Implemented vendor subscription plans and role-based admin.",
    ],
    architecture: [
      "Laravel 11 with an Inertia + Vue 3 admin and Sanctum auth.",
      "Multi-tenant, vendor-scoped public routes (per-vendor menu URLs).",
      "Geospatial vendor location tracking.",
      "MySQL-backed vendors, products, orders, and subscriptions.",
    ],
    challenges: [
      {
        title: "Multi-tenant URLs scoped per vendor",
        body: "Every public page hangs off a vendor slug, so the routing and data access have to resolve and isolate the right tenant on each request — the core constraint of a menu SaaS where one codebase serves many restaurants.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Digital menu platform banner" },
    ],
    accent: "#e46795",
  },
  {
    slug: "39dollarglasses",
    name: "39DollarGlasses",
    tagline: "High-volume prescription eyewear store with virtual try-on and a lens configurator.",
    description:
      "39DollarGlasses is a long-running, high-traffic US e-commerce retailer selling prescription eyeglasses and sunglasses with lenses included. As tech lead I owned the core e-commerce platform, leading frontend and backend across the Laravel/Node back end and the React/Blade storefront — the product catalog, lens configuration, CRM and internal dashboards, and the virtual try-on and home-trial experiences.",
    year: "2021 — 2024",
    role: "Tech Lead · Full-stack Developer",
    isPrivate: false,
    link: { label: "Visit site", href: "https://www.39dollarglasses.com" },
    stack: ["Laravel", "Node.js", "React", "Blade", "MySQL"],
    responsibilities: [
      "Led frontend and backend development as tech lead and senior owner of the core e-commerce platform (React, Blade, Laravel, Node.js).",
      "Built CRM modules, internal dashboards, and customer-facing features that streamlined operations and drove conversion.",
      "Worked on the lens configurator: lens type, coatings, tint, and prescription entry.",
      "Improved UX and checkout flows alongside product and design to retain customers and reduce friction.",
      "Drove SEO and performance improvements that expanded organic reach and sped up page loads.",
    ],
    architecture: [
      "Laravel back end serving a React + Blade storefront.",
      "Server-rendered Blade pages with React for interactive configurator and try-on widgets.",
      "MySQL-backed catalog, orders, and customer accounts.",
    ],
    challenges: [
      {
        title: "A lens configurator with many dependent options",
        body: "Prescription eyewear has a large, interdependent option space — lens type, coatings, tint, and Rx values — that has to stay valid and correctly priced as the customer changes any selection.",
      },
      {
        title: "Prescription data entry customers can trust",
        body: "Capturing prescriptions and pupillary distance accurately matters for a product made to the customer's eyes, so the entry flow has to guide and validate without scaring people off.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "39DollarGlasses storefront home page" },
      { src: "02-eyeglasses.jpg", alt: "Eyeglasses product listing" },
      { src: "03-home-trial.jpg", alt: "Virtual try-on and home-trial page" },
      { src: "04-sunglasses.jpg", alt: "Sunglasses product listing" },
      { src: "06-lens.jpg", alt: "Lens options and coatings" },
      { src: "07-brands.jpg", alt: "Eyewear brands page" },
      { src: "08-new.jpg", alt: "New arrivals listing" },
      { src: "05-mobile.jpg", alt: "Mobile view of the storefront" },
    ],
    accent: "#67a7e4",
  },
  {
    slug: "symple",
    name: "Symple",
    tagline: "UK property-compliance platform for certificates, inspections, and an engineer network.",
    description:
      "Symple automates property compliance for UK landlords, letting agents, and property managers — gas safety, EICR, EPC, PAT and related certificates — connecting them with a nationwide network of vetted engineers and tracking renewals. As a full-stack developer at Trezlabs I worked across the Laravel back end and the Vue front end.",
    year: "2021 — 2024",
    role: "Tech Lead · Senior Developer",
    isPrivate: false,
    link: { label: "Visit site", href: "https://www.symple.co.uk" },
    stack: ["Laravel", "Inertia.js", "Vue.js", "Tailwind CSS", "MySQL"],
    responsibilities: [
      "Built features end to end as tech lead at Trezlabs — the senior resource on the agency's most demanding frontend work — with reusable component libraries that sped delivery across projects.",
      "Worked on certificate ordering and compliance-tracking flows.",
      "Worked on engineer/provider matching and scheduling.",
      "Built supporting tools and pages such as the compliance checker and time-savings calculator.",
    ],
    architecture: [
      "Laravel back end with a Vue front end.",
      "MySQL-backed properties, certificates, and engineer records.",
      "Automated renewal reminders and scheduling.",
    ],
    challenges: [
      {
        title: "Compliance rules that must stay correct",
        body: "Each certificate type (gas, electrical, energy) carries its own validity period and legal requirements; modelling them so renewals and reminders fire on time is the core of the product.",
      },
      {
        title: "Matching jobs to a national engineer network",
        body: "Connecting each job to an available, qualified engineer across the country means the data model and scheduling logic have to reason about coverage, certification, and availability.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "Symple home page" },
      { src: "02-landlords.jpg", alt: "Landlords solution page" },
      { src: "03-compliance-checker.jpg", alt: "Compliance checker tool" },
      { src: "04-providers.jpg", alt: "Service providers page" },
      { src: "06-agents.jpg", alt: "Letting agents solution page" },
      { src: "07-time-savings.jpg", alt: "Time-savings calculator" },
      { src: "08-faqs.jpg", alt: "FAQs page" },
      { src: "05-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#67e4c5",
  },
  {
    slug: "digipharm",
    name: "DigiPharm",
    tagline: "Hebrew SEO link-building marketplace with tiered packages and partner sites.",
    description:
      "DigiPharm is an Israeli (Hebrew, right-to-left) platform for buying backlinks and content to improve SEO, connecting customers with 1,000+ partner sites through tiered one-time and subscription packages. As a full-stack developer at Trezlabs I worked across the Laravel back end and the Vue front end.",
    year: "2021 — 2024",
    role: "Tech Lead · Senior Developer",
    isPrivate: false,
    link: { label: "Visit site", href: "https://digipharm.co.il" },
    stack: ["Laravel", "Inertia.js", "Vue.js", "Tailwind CSS", "MySQL"],
    responsibilities: [
      "Built features end to end as tech lead at Trezlabs — the senior resource on the agency's most demanding frontend work — with reusable component libraries that sped delivery across projects.",
      "Worked on the package catalog and checkout for both one-time and subscription purchases.",
      "Worked on the partner-site directory and order management.",
      "Built the right-to-left, Hebrew-language storefront UI.",
    ],
    architecture: [
      "Laravel back end with a Vue front end.",
      "Right-to-left (Hebrew) interface throughout.",
      "MySQL-backed packages, orders, partner sites, and subscriptions.",
    ],
    challenges: [
      {
        title: "A right-to-left Hebrew interface end to end",
        body: "Building the whole storefront right-to-left in Hebrew means layout, typography, and component behaviour all have to mirror correctly — not just translate the copy.",
      },
      {
        title: "One-time and subscription billing in one catalog",
        body: "The same packages sell as both one-off purchases and recurring subscriptions, so the order and billing model has to handle both without duplicating the catalog.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "DigiPharm home page (Hebrew)" },
      { src: "02-best.jpg", alt: "Featured packages page" },
      { src: "03-optimization.jpg", alt: "SEO optimization services page" },
      { src: "04-about-us.jpg", alt: "About page" },
      { src: "06-courses.jpg", alt: "Courses and training page" },
      { src: "07-links.jpg", alt: "Backlink packages page" },
      { src: "08-contact.jpg", alt: "Contact page" },
      { src: "05-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#9567e4",
  },
  {
    slug: "imgprep",
    name: "IMGPrep",
    tagline: "Residency-match consulting platform for international medical graduates.",
    description:
      "IMGPrep is a US academic-consulting service that helps international medical graduates match into US residency programs — match consulting, clinical externships, ERAS application support, interview prep, and a data-driven programs list. As a full-stack developer at Trezlabs I worked across the Laravel back end and the Vue front end.",
    year: "2021 — 2024",
    role: "Tech Lead · Senior Developer",
    isPrivate: false,
    link: { label: "Visit site", href: "https://www.imgprep.com" },
    stack: ["Laravel", "Inertia.js", "Vue.js", "Tailwind CSS", "MySQL"],
    responsibilities: [
      "Built features end to end as tech lead at Trezlabs — the senior resource on the agency's most demanding frontend work — with reusable component libraries that sped delivery across projects.",
      "Worked on service pages for match consulting, externships, and ERAS support.",
      "Worked on the customized residency-programs list and search.",
      "Built lead capture and the applicant account area.",
    ],
    architecture: [
      "Laravel back end with a Vue front end.",
      "MySQL-backed program data, applicant profiles, and service content.",
      "Data-driven program matching based on scores, visa status, and timeline.",
    ],
    challenges: [
      {
        title: "Targeting programs from messy real-world criteria",
        body: "Matching applicants to residency programs depends on scores, visa status, and timing, so the programs list has to filter and rank against criteria that vary widely per applicant.",
      },
    ],
    screenshots: [
      { src: "01-home.jpg", alt: "IMGPrep home page" },
      { src: "02-consulting.jpg", alt: "Residency match consulting page" },
      { src: "03-programs.jpg", alt: "Residency programs list" },
      { src: "04-externship.jpg", alt: "Clinical experience and externship page" },
      { src: "05-mobile.jpg", alt: "Mobile view of the home page" },
    ],
    accent: "#67e489",
  },
];

// Pinned to the top of the listing, in this order. Everything else keeps its
// original order below them.
// ponytail: featured-first via a slug list; reorder the array literally if it grows
const featured = ["39dollarglasses", "buddy-assist", "digipharm", "symple"];
const rank = (slug: string) => {
  const i = featured.indexOf(slug);
  return i === -1 ? featured.length + 1 : i;
};

export const useProjects = () => {
  return {
    all: () => [...projects].sort((a, b) => rank(a.slug) - rank(b.slug)),
    bySlug: (slug: string) => projects.find((p) => p.slug === slug),
  };
};
