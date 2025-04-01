<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SidebarNavigation from './storybook-sidebar-navigation.vue';
import { navigation } from '../navigation';
import { motion } from 'motion-v';
</script>

<template>
  <motion.header
    :initial="{ height: 'max-content' }"
    :animate="{ height: 'max-content' }"
    class="w-64 max-h-[calc(100vh-(var(--spacing-md)*2))] fixed left-md my-md flex flex-col bg-surface-container text-on-surface border border-outline-variant rounded-sm"
  >
    <section class="p-md border-b border-outline-variant">
      <RouterLink to="/" class="inline-flex flex-col w-full">
        <span class="typography-title-medium">@bruhabruh/vui</span>
        <span class="typography-label-small text-secondary">v1.0.0</span>
      </RouterLink>
    </section>
    <nav class="p-md flex-1 overflow-y-auto">
      <SidebarNavigation :navigation="navigation" />
    </nav>
  </motion.header>
</template>
