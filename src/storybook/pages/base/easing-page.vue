<script setup lang="ts">
import { materialEasing } from '@/config';
import { ref } from 'vue';

const durations = ref(
  materialEasing.keys().map((key) => ({
    name: key
      .split('-')
      .map((v) => v[0].toUpperCase() + v.slice(1))
      .join(' '),
    value: materialEasing.asString(key),
  })),
);
</script>

<template>
  <section
    v-for="{ name, value } in durations"
    :key="name"
    class="mb-md last:mb-0 flex items-center justify-between gap-sm"
  >
    <section>
      <p class="typography-headline-medium">{{ name }}</p>
      <p class="typography-title-large text-secondary">{{ value }}</p>
    </section>
    <section
      class="group/track bg-surface-container w-64 h-10 p-1 rounded-full"
    >
      <section
        :style="{ transitionTimingFunction: value }"
        :class="[
          'bg-on-surface-variant size-8 rounded-full',
          'transition duration-extra-long-4',
          'scale-75 group-hover/track:scale-100',
          'group-hover/track:translate-x-[calc(var(--spacing-64)-var(--spacing-10))]',
        ]"
      />
    </section>
  </section>
</template>
