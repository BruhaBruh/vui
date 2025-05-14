<script setup lang="ts">
import { IconChevronDown, IconFile, IconFolder } from '@tabler/icons-vue';
import { ref } from 'vue';
import StorybookNavigation from './storybook-sidebar-navigation.vue';
import { AnimatePresence } from 'motion-v';
import { RouterLink } from 'vue-router';
import type { NavigationNode } from '../navigation';

const { node } = defineProps<{ node: NavigationNode }>();

const isOpen = ref(true);
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
      <component :is="node.icon" v-if="node.icon" />
      <IconFolder v-else-if="node.type === 'folder'" />
      <IconFile v-else />

      <span class="typography-label-large">{{ node.name }}</span>
      <IconChevronDown
        v-if="node.type === 'folder'"
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
