<script setup lang="ts">
const { all } = useProjects();
const projects = all();

useReveal();

useSeoMeta({
  title: "Hamilton Juárez — Full-Stack Engineer",
  description:
    "Selected work building production web apps for ecommerce, SaaS, and service platforms — front to back.",
});
</script>

<template>
  <!-- ============== HERO ============== -->
  <section class="relative isolate overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-50"></div>
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
    ></div>

    <div
      class="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-20 sm:py-28 lg:py-32"
    >
      <div
        class="reveal inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-3 py-1 font-mono text-xs text-ink-300 backdrop-blur"
      >
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span>
        Available for full-stack roles
      </div>

      <h1
        class="reveal text-balance text-4xl font-semibold leading-tight tracking-tight text-ink-50 sm:text-5xl lg:text-6xl"
      >
        Full-stack engineer who ships
        <span class="text-accent">production web apps</span>
        for ecommerce, SaaS, and service platforms.
      </h1>

      <p
        class="reveal max-w-2xl text-balance text-lg text-ink-300 sm:text-xl"
      >
        I'm Hamilton — 5+ years building fast, accessible web apps front to
        back, with Vue/Nuxt, React, TypeScript, and Laravel. Selected projects
        below, with case-study detail on architecture, responsibilities, and
        what was hard about each one.
      </p>

      <div class="reveal flex flex-wrap items-center gap-3 pt-2">
        <a
          href="#work"
          class="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
        >
          See selected work
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </a>
        <a
          href="mailto:hamiltonjuarez97@gmail.com"
          class="inline-flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-900/50 px-5 py-2.5 text-sm font-semibold text-ink-100 transition hover:border-ink-500 hover:bg-ink-900"
        >
          Get in touch
        </a>

        <!-- CV download — bilingual, no JS -->
        <div
          class="inline-flex items-center gap-1.5 rounded-lg border border-ink-700 bg-ink-900/50 px-3 py-2 text-sm text-ink-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-4 w-4 text-ink-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <span class="font-semibold text-ink-100">CV</span>
          <a
            href="/cv/hamilton-juarez-cv-en.pdf"
            download
            aria-label="Download CV in English (PDF)"
            class="rounded px-2 py-1 font-semibold text-accent transition hover:bg-ink-800"
            >EN</a
          >
          <span class="text-ink-600" aria-hidden="true">·</span>
          <a
            href="/cv/hamilton-juarez-cv-es.pdf"
            download
            aria-label="Descargar CV en español (PDF)"
            class="rounded px-2 py-1 font-semibold text-accent transition hover:bg-ink-800"
            >ES</a
          >
        </div>
      </div>
    </div>
  </section>

  <!-- ============== WORK ============== -->
  <section id="work" class="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
    <SectionHeader
      eyebrow="Selected work"
      title="Projects I'd defend in an interview."
      description="A mix of public storefronts and private client platforms. Each card opens a full case study with screenshots, stack, responsibilities, and what was hard about the build."
    />

    <div
      class="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2"
    >
      <div
        v-for="(project, i) in projects"
        :key="project.slug"
        :style="{ '--i': i }"
      >
        <ProjectCard :project="project" :index="i" />
      </div>
    </div>
  </section>

  <!-- ============== ABOUT ============== -->
  <section
    id="about"
    class="border-t border-ink-800/60 bg-ink-900/20"
  >
    <div
      class="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1.5fr]"
    >
      <div class="reveal-up">
        <img
          src="/hamilton.jpg"
          alt="Hamilton Juárez"
          width="112"
          height="112"
          class="mb-5 h-28 w-28 rounded-2xl border border-ink-800 object-cover ring-1 ring-accent/20"
        />
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          About
        </p>
        <h2 class="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
          Building interfaces people actually use.
        </h2>
      </div>

      <div class="reveal-up space-y-5 text-base text-ink-300 sm:text-lg">
        <p>
          I focus on the parts of a product that move metrics: clear conversion
          flows, accessible components, and Core Web Vitals you'd be happy to
          show a stakeholder.
        </p>
        <p>
          I work full-stack — <strong class="text-ink-100">Vue/Nuxt or React + TypeScript + Tailwind</strong>
          on the front, <strong class="text-ink-100">Laravel + MySQL</strong> on
          the back — and I've led frontend and backend as a tech lead across
          ecommerce, SaaS, healthcare, and hospitality.
        </p>
        <p>
          Several projects are under NDA, so the cards labelled
          <span class="font-mono text-xs uppercase tracking-wider text-ink-400"
            >private client</span
          >
          show the work without exposing client data. If you'd like a walk-through
          on a call, get in touch.
        </p>

        <div class="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
          <div class="rounded-lg border border-ink-800 bg-ink-950/50 p-4">
            <p class="font-mono text-2xl text-accent">5+</p>
            <p class="mt-1 text-xs text-ink-400">Years shipping web apps</p>
          </div>
          <div class="rounded-lg border border-ink-800 bg-ink-950/50 p-4">
            <p class="font-mono text-2xl text-accent">Nuxt</p>
            <p class="mt-1 text-xs text-ink-400">Daily driver</p>
          </div>
          <div class="rounded-lg border border-ink-800 bg-ink-950/50 p-4">
            <p class="font-mono text-2xl text-accent">EN/ES</p>
            <p class="mt-1 text-xs text-ink-400">Bilingual</p>
          </div>
          <div class="rounded-lg border border-ink-800 bg-ink-950/50 p-4">
            <p class="font-mono text-2xl text-accent">SV</p>
            <p class="mt-1 text-xs text-ink-400">Based in El Salvador</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============== CONTACT ============== -->
  <section class="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
    <div
      class="reveal-up overflow-hidden rounded-2xl border border-ink-800 bg-gradient-to-br from-ink-900 to-ink-950 p-8 sm:p-12"
    >
      <div class="max-w-2xl">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Contact
        </p>
        <h2 class="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
          Have a full-stack role or a project in mind?
        </h2>
        <p class="mt-4 text-lg text-ink-300">
          Email is the fastest way to reach me. Happy to share extra screenshots,
          repo access, or a code walkthrough on request.
        </p>
        <a
          href="mailto:hamiltonjuarez97@gmail.com"
          class="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
        >
          hamiltonjuarez97@gmail.com
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
