<script setup lang="ts">
import type { Project } from "~/composables/useProjects";

const props = defineProps<{ project: Project; index: number }>();

const firstShot = computed(() => {
  const shot = props.project.screenshots[0];
  return shot ? `/projects/${props.project.slug}/${shot.src}` : null;
});

const imgError = ref(false);
</script>

<template>
  <NuxtLink
    :to="`/work/${project.slug}`"
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-800/80 bg-ink-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-ink-700 hover:bg-ink-900/80"
    :style="{ '--accent': project.accent || '#c5ff3a' }"
  >
    <!-- Image / placeholder -->
    <div
      class="relative aspect-[16/10] w-full overflow-hidden bg-ink-900"
      :style="{
        background:
          'radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent) 25%, transparent), transparent 60%), #111113',
      }"
    >
      <img
        v-if="firstShot && !imgError"
        :src="firstShot"
        :alt="`${project.name} preview`"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        @error="imgError = true"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center p-8 text-center"
      >
        <div class="space-y-2">
          <p
            class="font-mono text-xs uppercase tracking-[0.2em] text-ink-500"
          >
            Screenshot pending
          </p>
          <p
            class="font-mono text-2xl font-bold tracking-tight"
            :style="{ color: 'var(--accent)' }"
          >
            {{ project.name }}
          </p>
        </div>
      </div>

      <!-- Private badge -->
      <span
        v-if="project.isPrivate"
        class="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-300 backdrop-blur"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-ink-400"></span>
        Private client
      </span>
      <span
        v-else
        class="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
        Live
      </span>
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col gap-3 p-5 sm:p-6">
      <div class="flex items-baseline justify-between gap-4">
        <h3 class="text-xl font-semibold tracking-tight text-ink-50">
          {{ project.name }}
        </h3>
        <span class="font-mono text-xs text-ink-500">{{ project.year }}</span>
      </div>

      <p class="text-sm text-ink-300">{{ project.tagline }}</p>

      <div class="mt-auto flex flex-wrap gap-1.5 pt-3">
        <span
          v-for="tech in project.stack.slice(0, 5)"
          :key="tech"
          class="rounded-md border border-ink-800 bg-ink-950/60 px-2 py-0.5 font-mono text-[11px] text-ink-400"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.stack.length > 5"
          class="rounded-md border border-ink-800 bg-ink-950/60 px-2 py-0.5 font-mono text-[11px] text-ink-500"
        >
          +{{ project.stack.length - 5 }}
        </span>
      </div>

      <div
        class="flex items-center gap-1.5 pt-2 font-mono text-xs text-ink-400 transition group-hover:text-accent"
      >
        <span>View case study</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
          class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>
