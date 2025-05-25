<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import {
  type ContainerContentVariants,
  containerVariants,
} from './ui-container.variants';

export type ContainerContentProps = PropsPolymorphic & {
  variant?: ContainerContentVariants['variant'];
  padding?: ContainerContentVariants['padding'];
  fluid?: ContainerContentVariants['fluid'];
};

const {
  variant,
  padding,
  fluid,
  as = 'section',
} = defineProps<ContainerContentProps>();
</script>

<template>
  <component
    :is="as"
    :class="containerVariants.content({ variant, padding, fluid })"
    v-tw-merge
  >
    <slot />
  </component>
</template>
