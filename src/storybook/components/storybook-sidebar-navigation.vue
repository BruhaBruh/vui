<script setup lang="ts">
import { motion } from 'motion-v';
import Item from './storybook-sidebar-navigation-item.vue';
import type { NavigationNode } from '../navigation';

const { navigation } = defineProps<{
  navigation: NavigationNode[];
}>();
</script>

<template>
  <motion.ul
    :class="'overflow-hidden'"
    :initial="{ height: 0 }"
    :animate="{ height: 'auto' }"
    :exit="{ height: 0 }"
  >
    <Item v-for="node in navigation" :key="node.path" :node="node" />
  </motion.ul>
</template>
