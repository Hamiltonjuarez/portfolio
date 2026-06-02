<script setup lang="ts">
const { all } = useProjects();
const projects = all();

useReveal();

useSeoMeta({
  title: "Hamilton Juárez — Frontend Engineer",
  description:
    "Selected work building production interfaces for ecommerce, SaaS, and service platforms.",
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
        Available for frontend roles
      </div>

      <h1
        class="reveal text-balance text-4xl font-semibold leading-tight tracking-tight text-ink-50 sm:text-5xl lg:text-6xl"
      >
        Frontend engineer who ships
        <span class="text-accent">production interfaces</span>
        for ecommerce, SaaS, and service platforms.
      </h1>

      <p
        class="reveal max-w-2xl text-balance text-lg text-ink-300 sm:text-xl"
      >
        I'm Hamilton — I build fast, accessible web apps with Nuxt, Vue, and
        TypeScript. Four selected projects below, with case-study detail on
        architecture, responsibilities, and what was hard about each one.
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
          href="mailto:hamilton@solid.com.sv"
          class="inline-flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-900/50 px-5 py-2.5 text-sm font-semibold text-ink-100 transition hover:border-ink-500 hover:bg-ink-900"
        >
          Get in touch
        </a>
      </div>
    </div>
  </section>

  <!-- ============== WORK ============== -->
  <section id="work" class="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
    <SectionHeader
      eyebrow="Selected work"
      title="Four projects I'd defend in an interview."
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
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          About
        </p>
        <h2 class="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
          Building interfaces people actually use.
        </h2>
      </div>

      <div class="reveal-up space-y-5 text-base text-ink-300 sm:text-lg">
        <p>
          I focus on the bits of frontend that move metrics: clear conversion
          flows, accessible components, and Core Web Vitals you'd be happy to
          show a stakeholder.
        </p>
        <p>
          Most of my recent work is in <strong class="text-ink-100">Nuxt + Vue 3 + TypeScript + Tailwind</strong>,
          paired with whatever the backend team prefers — Laravel, Firebase,
          headless commerce APIs.
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
            <p class="font-mono text-2xl text-accent">4+</p>
            <p class="mt-1 text-xs text-ink-400">Years building UIs</p>
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
          Have a frontend role or a project in mind?
        </h2>
        <p class="mt-4 text-lg text-ink-300">
          Email is the fastest way to reach me. Happy to share extra screenshots,
          repo access, or a code walkthrough on request.
        </p>
        <a
          href="mailto:hamilton@solid.com.sv"
          class="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
        >
          hamilton@solid.com.sv
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
