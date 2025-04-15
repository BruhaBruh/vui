<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import {
  type ContainerVariants,
  containerVariants,
} from './ui-container.variants';

export type ContainerProps = PropsPolymorphic & {
  color?: ContainerVariants['color'];
};

const { color, as = 'section' } = defineProps<ContainerProps>();
</script>

<template>
  <component :is="as" :class="containerVariants({ color })" v-tw-merge>
    <slot />
  </component>
</template>
