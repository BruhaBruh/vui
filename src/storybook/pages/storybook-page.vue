<script setup lang="ts">
import { useRoute } from 'vue-router';
import { type NavigationNode, navigationByPath } from '../navigation';
import { computed } from 'vue';
import { StorybookBreadcrumbs, StorybookNavigation } from '../components';

const route = useRoute();

const node = computed(() => navigationByPath[route.path]);

const breadcrumbs = computed(() => {
  const pathPieces = route.path.split('/');
  const result: NavigationNode[] = [];

  for (let i = 1; i < pathPieces.length; i++) {
    const path = pathPieces.slice(0, i).join('/');
    const n = navigationByPath[path];
    if (n) {
      result.push(n);
    }
  }

  if (node.value) {
    result.push(node.value);
  }

  return result.map((v) => ({ name: v.name, to: v.path }));
});
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
