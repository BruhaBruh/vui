<script setup lang="ts">
import { Breadcrumbs, BreadcrumbsItem } from '@/components';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const { breadcrumbs } = defineProps<{
  breadcrumbs: { name: string; to: string }[];
}>();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const latestItem = computed(() => breadcrumbs[breadcrumbs.length - 1]!);
</script>

<template>
  <Breadcrumbs :active="latestItem.to" class="mb-md">
    <BreadcrumbsItem
      v-for="item in breadcrumbs"
      :key="item.to"
      :value="item.to"
      :as="RouterLink"
      :to="item.to"
    >
      {{ item.name }}
    </BreadcrumbsItem>
  </Breadcrumbs>
  <h1 v-if="latestItem" class="typography-display-small mb-lg">
    {{ latestItem.name }}
  </h1>
</template>
