<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import type { VariantProps } from 'class-variance-authority';
import { containerVariants } from './ui-container.variants';

type Variants = VariantProps<typeof containerVariants.content>;

export type ContainerContentProps = PropsPolymorphic & {
  variant?: Variants['variant'];
  padding?: Variants['padding'];
  fluid?: Variants['fluid'];
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
