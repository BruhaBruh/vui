<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import type { VariantProps } from 'class-variance-authority';
import { containerVariants } from './ui-container.variants';

type Variants = VariantProps<typeof containerVariants>;

export type ContainerProps = PropsPolymorphic & {
  color?: Variants['color'];
};

const { color, as = 'section' } = defineProps<ContainerProps>();
</script>

<template>
  <component :is="as" :class="containerVariants({ color })" v-tw-merge>
    <slot />
  </component>
</template>
