<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SidebarNavigation from './storybook-sidebar-navigation.vue';
import { navigation } from '../navigation';
import { motion } from 'motion-v';
import { useColorMode, useCycleList } from '@vueuse/core';
import { watchEffect } from 'vue';
import { IconButton } from '@/components';

const mode = useColorMode({
  emitAuto: true,
  initialValue: 'light',
  selector: 'body',
  modes: { dark: 'dark', light: 'light' },
});

const { state, next } = useCycleList(['dark', 'light'] as const, {
  initialValue: mode,
});

watchEffect(() => {
  mode.value = state.value;
});
</script>

<template>
  <motion.header
    :initial="{ height: 'max-content' }"
    :animate="{ height: 'max-content' }"
    class="w-64 max-h-[calc(100vh-(var(--spacing-md)*2))] fixed left-md my-md flex flex-col bg-surface-container text-on-surface border border-outline-variant rounded-md"
  >
    <div class="p-md border-b border-outline-variant flex items-center gap-sm">
      <RouterLink to="/" class="inline-flex flex-col flex-1">
        <span class="typography-title-medium">@bruhabruh/vui</span>
        <span class="typography-label-small text-secondary">v0.1.0</span>
      </RouterLink>
      <IconButton
        @click="next()"
        color="secondary"
        variant="standard"
        :aria-label="`Toggle theme. Current is ${mode}`"
        :icon="mode === 'dark' ? 'tabler:moon' : 'tabler:sun'"
      />
    </div>
    <nav class="p-md flex-1 overflow-y-auto">
      <SidebarNavigation :navigation="navigation" />
    </nav>
  </motion.header>
</template>
