import tailwindcss from "@tailwindcss/vite";

// Production origin — used for absolute OG/sitemap URLs. Change if the domain differs.
const siteUrl = "https://hamilton.dev";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: { public: { siteUrl } },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "Hamilton Juárez — Full-Stack Engineer",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Full-stack engineer building production web apps for ecommerce, SaaS, and service platforms — front to back.",
        },
        { name: "theme-color", content: "#0a0a0a" },
        // Open Graph / Twitter defaults (pages override title/description/image)
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Hamilton Juárez" },
        { property: "og:url", content: siteUrl },
        { property: "og:title", content: "Hamilton Juárez — Full-Stack Engineer" },
        {
          property: "og:description",
          content:
            "Full-stack engineer building production web apps for ecommerce, SaaS, and service platforms — front to back.",
        },
        { property: "og:image", content: `${siteUrl}/og.png` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Hamilton Juárez — Full-Stack Engineer" },
        {
          name: "twitter:description",
          content:
            "Full-stack engineer building production web apps for ecommerce, SaaS, and service platforms.",
        },
        { name: "twitter:image", content: `${siteUrl}/og.png` },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },
});
