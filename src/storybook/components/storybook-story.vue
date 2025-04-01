<script setup lang="ts">
const { name } = defineProps<{
  name: string;
}>();
</script>

<template>
  <section class="flex flex-col gap-sm mb-md last:mb-0">
    <h2 class="typography-title-large">{{ name }}</h2>
    <section
      class="relative flex min-h-64 items-center justify-center gap-md rounded-lg border p-lg border-outline-variant"
    >
      <slot />
    </section>
  </section>
</template>
