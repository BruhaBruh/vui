<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue';
import { computed } from 'vue';

const { breadcrumbs } = defineProps<{
  breadcrumbs: { name: string; to: string }[];
}>();

const latestItem = computed(() => breadcrumbs[breadcrumbs.length - 1]);
</script>

<template>
  <section class="typography-title-medium flex items-center gap-2xs mb-md">
    <template v-for="(item, i) in breadcrumbs" :key="item.to">
      <template v-if="i + 1 < breadcrumbs.length">
        <RouterLink
          class="hover:text-primary transition duration-medium-1 easing-standard"
          :to="item.to"
        >
          {{ item.name }}
        </RouterLink>
        <IconChevronRight class="size-4" />
      </template>
      <span v-else>
        {{ item.name }}
      </span>
    </template>
  </section>
  <h1 v-if="latestItem" class="typography-display-small mb-lg">
    {{ latestItem.name }}
  </h1>
</template>
