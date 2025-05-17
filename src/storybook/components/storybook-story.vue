<script setup lang="ts">
const { name } = defineProps<{
  name: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-sm mb-md last:mb-3xl overflow-hidden">
    <h2 class="typography-title-large">{{ name }}</h2>
    <div
      class="relative flex min-h-64 items-center justify-center gap-md rounded-lg border p-lg border-outline-variant"
    >
      <slot />
    </div>
  </div>
</template>
