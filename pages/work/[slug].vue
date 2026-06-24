<script setup lang="ts">
const route = useRoute();
const { bySlug, all } = useProjects();
const project = bySlug(route.params.slug as string);

if (!project) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

useReveal();

// Each case study previews with its own first screenshot.
const siteUrl = useRuntimeConfig().public.siteUrl;
const ogImage = project.screenshots[0]
  ? `${siteUrl}/projects/${project.slug}/${project.screenshots[0].src}`
  : `${siteUrl}/og.png`;

useSeoMeta({
  title: `${project.name} — Hamilton Juárez`,
  description: project.tagline,
  ogTitle: `${project.name} — Hamilton Juárez`,
  ogDescription: project.tagline,
  ogImage,
  ogUrl: `${siteUrl}/work/${project.slug}`,
  twitterImage: ogImage,
});

// Sibling navigation
const allProjects = all();
const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
const nextProject =
  allProjects[(currentIndex + 1) % allProjects.length];
</script>

<template>
  <article v-if="project">
    <!-- ============== HEADER ============== -->
    <header class="relative isolate overflow-hidden border-b border-ink-800/60">
      <div class="absolute inset-0 bg-grid opacity-40"></div>
      <div
        class="pointer-events-none absolute -top-32 left-1/3 h-[400px] w-[400px] rounded-full blur-3xl"
        :style="{
          background:
            'radial-gradient(circle, color-mix(in oklab, ' +
            (project.accent || '#c5ff3a') +
            ' 20%, transparent), transparent 70%)',
        }"
      ></div>

      <div class="relative mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <NuxtLink
          to="/#work"
          class="reveal inline-flex items-center gap-1.5 font-mono text-xs text-ink-400 transition hover:text-accent"
        >
          ← Back to work
        </NuxtLink>

        <div class="reveal mt-6 flex flex-wrap items-center gap-3">
          <span
            v-if="project.isPrivate"
            class="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-ink-400"></span>
            Private client project
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
            Public · Live
          </span>
          <span class="font-mono text-xs text-ink-500">{{ project.year }}</span>
          <span class="font-mono text-xs text-ink-500">·</span>
          <span class="font-mono text-xs text-ink-500">{{ project.role }}</span>
        </div>

        <h1
          class="reveal mt-5 text-balance text-4xl font-semibold tracking-tight text-ink-50 sm:text-5xl lg:text-6xl"
        >
          {{ project.name }}
        </h1>
        <p
          class="reveal mt-4 max-w-2xl text-balance text-lg text-ink-300 sm:text-xl"
        >
          {{ project.tagline }}
        </p>

        <a
          v-if="project.link"
          :href="project.link.href"
          target="_blank"
          rel="noopener"
          class="reveal mt-6 inline-flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-4 py-2 text-sm font-medium text-ink-100 transition hover:border-accent hover:text-accent"
        >
          {{ project.link.label }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-3.5 w-3.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>
    </header>

    <!-- ============== OVERVIEW ============== -->
    <section class="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <div class="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <SectionHeader eyebrow="Overview" title="The project" />
        <div class="reveal-up text-lg leading-relaxed text-ink-300">
          {{ project.description }}
        </div>
      </div>
    </section>

    <!-- ============== SCREENSHOTS ============== -->
    <section
      class="border-t border-ink-800/60 bg-ink-900/20 py-16 sm:py-20"
    >
      <div class="mx-auto w-full max-w-5xl px-6">
        <SectionHeader
          eyebrow="Screens"
          title="Screenshots"
          description="Tap any image to enlarge. Use arrow keys to navigate."
        />
        <div class="mt-10">
          <ScreenshotGallery :project="project" />
        </div>
      </div>
    </section>

    <!-- ============== STACK + RESPONSIBILITIES ============== -->
    <section class="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <div class="grid gap-12 lg:grid-cols-2">
        <div class="reveal-up">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Stack
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
            What I built it with
          </h2>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tech in project.stack"
              :key="tech"
              class="rounded-md border border-ink-800 bg-ink-950/60 px-3 py-1.5 font-mono text-sm text-ink-200"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="reveal-up">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            My role
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
            What I owned
          </h2>
          <ul class="mt-6 space-y-3">
            <li
              v-for="(item, i) in project.responsibilities"
              :key="i"
              class="flex gap-3 text-ink-300"
            >
              <span
                class="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent"
                aria-hidden="true"
              ></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============== ARCHITECTURE ============== -->
    <section
      class="border-t border-ink-800/60 bg-ink-900/20 py-16 sm:py-20"
    >
      <div class="mx-auto w-full max-w-5xl px-6">
        <div class="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow="Architecture" title="How it's wired" />
          <ul class="reveal-stagger space-y-4">
            <li
              v-for="(line, i) in project.architecture"
              :key="i"
              :style="{ '--i': i }"
              class="flex gap-4 rounded-xl border border-ink-800 bg-ink-950/40 p-5"
            >
              <span
                class="grid h-7 w-7 flex-none place-items-center rounded-md bg-accent/15 font-mono text-xs text-accent"
              >
                {{ String(i + 1).padStart(2, "0") }}
              </span>
              <span class="text-ink-200">{{ line }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============== CHALLENGES ============== -->
    <section class="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeader
        eyebrow="Hard parts"
        title="What was challenging"
        description="The decisions worth talking about in an interview."
      />
      <div class="reveal-stagger mt-10 grid gap-6 md:grid-cols-2">
        <div
          v-for="(c, i) in project.challenges"
          :key="i"
          :style="{ '--i': i }"
          class="rounded-2xl border border-ink-800 bg-ink-950/40 p-6 sm:p-7"
        >
          <h3 class="text-lg font-semibold text-ink-50 sm:text-xl">
            {{ c.title }}
          </h3>
          <p class="mt-3 text-ink-300">{{ c.body }}</p>
        </div>
      </div>
    </section>

    <!-- ============== NEXT PROJECT ============== -->
    <section
      v-if="nextProject"
      class="border-t border-ink-800/60 bg-gradient-to-b from-ink-950 to-ink-900/30 py-16 sm:py-20"
    >
      <div class="mx-auto w-full max-w-5xl px-6">
        <NuxtLink
          :to="`/work/${nextProject.slug}`"
          class="group reveal-up flex flex-col gap-2 rounded-2xl border border-ink-800 bg-ink-950/60 p-8 transition hover:border-ink-600 hover:bg-ink-950 sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
              Next project
            </p>
            <p class="mt-2 text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
              {{ nextProject.name }}
            </p>
            <p class="mt-1 text-ink-400">{{ nextProject.tagline }}</p>
          </div>
          <div
            class="flex items-center gap-2 font-mono text-sm text-ink-300 transition group-hover:text-accent"
          >
            View case study
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </section>
  </article>
</template>
