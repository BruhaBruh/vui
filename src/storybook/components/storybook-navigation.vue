<script setup lang="ts">
import { motion } from 'motion-v';
import Item from './storybook-navigation-item.vue';
import type { NavigationNode } from '../navigation';

const { navigation } = defineProps<{
  navigation: NavigationNode[];
}>();
</script>

<template>
  <motion.ul
    :initial="{ height: 0, opacity: 0 }"
    :animate="{ height: 'auto', opacity: 1 }"
    :exit="{ height: 0, opacity: 0 }"
  >
    <Item v-for="node in navigation" :key="node.path" :node="node" />
  </motion.ul>
</template>
