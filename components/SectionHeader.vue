<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="reveal-up max-w-2xl space-y-3">
    <p
      v-if="eyebrow"
      class="font-mono text-xs uppercase tracking-[0.18em] text-accent"
    >
      {{ eyebrow }}
    </p>
    <h2 class="text-balance text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="description" class="text-balance text-base text-ink-300 sm:text-lg">
      {{ description }}
    </p>
  </div>
</template>
