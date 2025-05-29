<script setup lang="ts">
import StorybookNavigation from './storybook-sidebar-navigation.vue';
import { AnimatePresence } from 'motion-v';
import { RouterLink } from 'vue-router';
import type { NavigationNode } from '../navigation';
import { useLocalStorage } from '@vueuse/core';
import { Icon } from '@/components';

const { node } = defineProps<{ node: NavigationNode }>();

const isOpen = useLocalStorage(`navigation-${node.path}`, true);
</script>

<template>
  <li :class="['w-full inline-flex flex-col']">
    <component
      :is="node.type === 'folder' ? 'button' : RouterLink"
      :to="node.path"
      :class="[
        'w-full cursor-pointer select-none',
        'inline-flex items-center gap-2xs',
        'py-2xs px-xs rounded-sm',
        'state-on-surface hover:state-hover',
        '[&>svg]:size-4',
      ]"
      @click="isOpen = !isOpen"
    >
      <Icon v-if="node.icon" :icon="node.icon" />
      <Icon v-else-if="node.type === 'folder'" icon="tabler:folder" />
      <Icon v-else icon="tabler:file" />

      <span class="typography-label-large">{{ node.name }}</span>
      <Icon
        v-if="node.type === 'folder'"
        icon="tabler:chevron-down"
        :class="[
          'ml-auto',
          'transition duration-medium-1 easing-standard',
          {
            'rotate-180': isOpen,
          },
        ]"
      />
    </component>
    <AnimatePresence v-if="node.type === 'folder'">
      <StorybookNavigation
        v-if="isOpen"
        class="pl-xs"
        :navigation="node.children"
      />
    </AnimatePresence>
  </li>
</template>
