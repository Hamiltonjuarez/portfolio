<script setup lang="ts">
import type { Project } from "~/composables/useProjects";

const props = defineProps<{ project: Project }>();

const failed = ref<Record<string, boolean>>({});
const lightboxIndex = ref<number | null>(null);

const open = (i: number) => (lightboxIndex.value = i);
const close = () => (lightboxIndex.value = null);
const next = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value + 1) % props.project.screenshots.length;
};
const prev = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + props.project.screenshots.length) %
    props.project.screenshots.length;
};

const onKey = (e: KeyboardEvent) => {
  if (lightboxIndex.value === null) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
};

onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

const src = (filename: string) => `/projects/${props.project.slug}/${filename}`;
</script>

<template>
  <div class="reveal-stagger grid gap-4 sm:grid-cols-2">
    <button
      v-for="(shot, i) in project.screenshots"
      :key="shot.src"
      type="button"
      class="group relative overflow-hidden rounded-xl border border-ink-800 bg-ink-900 text-left transition hover:border-ink-600"
      :style="{ '--i': i, '--accent': project.accent || '#c5ff3a' }"
      @click="open(i)"
    >
      <div
        class="relative aspect-[16/10] w-full"
        :style="{
          background:
            'radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%), #111113',
        }"
      >
        <img
          v-if="!failed[shot.src]"
          :src="src(shot.src)"
          :alt="shot.alt"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          @error="failed[shot.src] = true"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center p-6 text-center"
        >
          <div>
            <p
              class="font-mono text-xs uppercase tracking-[0.2em] text-ink-500"
            >
              Screenshot {{ String(i + 1).padStart(2, "0") }}
            </p>
            <p
              class="mt-2 font-mono text-base text-ink-300"
            >
              {{ shot.alt }}
            </p>
            <p class="mt-3 font-mono text-[10px] text-ink-600">
              /public/projects/{{ project.slug }}/{{ shot.src }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="shot.caption" class="px-4 py-3">
        <p class="text-sm text-ink-300">{{ shot.caption }}</p>
      </div>
    </button>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxIndex !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <button
          type="button"
          class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 bg-ink-900 text-ink-200 transition hover:bg-ink-800"
          aria-label="Close"
          @click="close"
        >
          ✕
        </button>

        <button
          v-if="project.screenshots.length > 1"
          type="button"
          class="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-900 text-ink-200 transition hover:bg-ink-800 sm:inline-flex"
          aria-label="Previous"
          @click="prev"
        >
          ‹
        </button>
        <button
          v-if="project.screenshots.length > 1"
          type="button"
          class="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-900 text-ink-200 transition hover:bg-ink-800 sm:inline-flex"
          aria-label="Next"
          @click="next"
        >
          ›
        </button>

        <div class="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-xl border border-ink-800 bg-ink-900">
          <div
            class="relative aspect-[16/10] w-full"
            :style="{
              background:
                'radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent, #c5ff3a) 18%, transparent), transparent 60%), #111113',
            }"
          >
            <img
              v-if="lightboxIndex !== null && !failed[project.screenshots[lightboxIndex].src]"
              :src="src(project.screenshots[lightboxIndex].src)"
              :alt="project.screenshots[lightboxIndex].alt"
              class="h-full w-full object-contain"
            />
            <div
              v-else-if="lightboxIndex !== null"
              class="flex h-full w-full items-center justify-center p-8 text-center"
            >
              <p class="font-mono text-sm text-ink-400">
                {{ project.screenshots[lightboxIndex].alt }}
              </p>
            </div>
          </div>
          <div
            v-if="lightboxIndex !== null"
            class="flex items-center justify-between border-t border-ink-800 px-4 py-3"
          >
            <p class="text-sm text-ink-300">
              {{ project.screenshots[lightboxIndex].alt }}
            </p>
            <p class="font-mono text-xs text-ink-500">
              {{ lightboxIndex + 1 }} / {{ project.screenshots.length }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
