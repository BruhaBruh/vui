<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SidebarNavigation from './storybook-sidebar-navigation.vue';
import { navigation } from '../navigation';
</script>

<template>
  <header
    class="w-64 fixed left-md inset-y-md flex flex-col bg-surface-container text-on-surface border border-outline-variant rounded-sm"
  >
    <section class="p-md border-b border-outline-variant">
      <RouterLink to="/" class="inline-flex flex-col w-full">
        <span class="typography-title-medium">@bruhabruh/ui</span>
        <span class="typography-label-small text-secondary">v1.0.0</span>
      </RouterLink>
    </section>
    <nav class="p-md flex-1 overflow-y-auto">
      <SidebarNavigation :navigation="navigation" />
    </nav>
  </header>
</template>
