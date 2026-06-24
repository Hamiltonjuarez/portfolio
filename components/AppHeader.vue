<script setup lang="ts">
const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-ink-800/60 bg-ink-950/80 backdrop-blur-md"
  >
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
      <NuxtLink
        to="/"
        class="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-md bg-accent text-ink-950 transition-transform group-hover:rotate-3"
        >
          <span class="font-bold leading-none">H</span>
        </span>
        <span class="hidden text-ink-100 sm:inline">hamilton.dev</span>
      </NuxtLink>

      <nav class="flex items-center gap-1 sm:gap-2">
        <NuxtLink
          v-if="!isHome"
          to="/"
          class="rounded-md px-3 py-1.5 text-sm text-ink-300 transition hover:bg-ink-900 hover:text-ink-100"
        >
          Home
        </NuxtLink>
        <a
          href="#work"
          class="rounded-md px-3 py-1.5 text-sm text-ink-300 transition hover:bg-ink-900 hover:text-ink-100"
        >
          Work
        </a>
        <a
          href="#about"
          class="rounded-md px-3 py-1.5 text-sm text-ink-300 transition hover:bg-ink-900 hover:text-ink-100"
        >
          About
        </a>
        <a
          href="mailto:hamiltonjuarez97@gmail.com"
          class="ml-1 rounded-md bg-ink-100 px-3 py-1.5 text-sm font-medium text-ink-950 transition hover:bg-accent"
        >
          Contact
        </a>
      </nav>
    </div>
  </header>
</template>
