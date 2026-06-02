<script setup lang="ts">
useHead({
  htmlAttrs: { class: "dark" },
});
</script>

<template>
  <div class="min-h-dvh bg-ink-950 text-ink-100 antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
