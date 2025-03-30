<script setup lang="ts">
import { useRoute } from 'vue-router';
import { type NavigationNode, navigationByPath } from '../navigation';
import { computed } from 'vue';
import { StorybookBreadcrumbs, StorybookNavigation } from '../components';

const route = useRoute();

const node = computed(() => navigationByPath[route.path]);

const breadcrumbs = computed(() =>
  route.path
    .split('/')
    .reduce((acc, p, index, arr) => {
      const path = [...arr.slice(0, index), p].join('/');
      return [...acc, navigationByPath[path]];
    }, [] as NavigationNode[])
    .filter(Boolean)
    .map((v) => ({ name: v.name, to: v.path })),
);
</script>

<template>
  <template v-if="node">
    <StorybookBreadcrumbs
      :breadcrumbs="[{ name: 'Home', to: '/' }, ...breadcrumbs]"
    />
    <StorybookNavigation
      v-if="node.type === 'folder'"
      :navigation="node.children"
    />
    <component :is="node.page" v-else />
  </template>
  <section v-else class="typography-headline-large">404 Not Found</section>
</template>
