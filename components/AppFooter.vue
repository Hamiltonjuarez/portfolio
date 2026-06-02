<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-ink-800/60 bg-ink-950">
    <div
      class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center"
    >
      <div>
        <p class="font-mono text-sm text-ink-300">Hamilton Juárez</p>
        <p class="text-sm text-ink-500">
          Frontend engineer · {{ year }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-sm text-ink-400">
        <a
          href="mailto:hamilton@solid.com.sv"
          class="transition hover:text-accent"
        >
          Email
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener"
          class="transition hover:text-accent"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener"
          class="transition hover:text-accent"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
</template>
