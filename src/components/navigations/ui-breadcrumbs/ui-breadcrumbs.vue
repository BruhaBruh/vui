<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { breadcrumbsVariants } from './ui-breadcrumbs.variants';
import type { VariantProps } from 'class-variance-authority';
import { provideBreadcrumbsState } from './ui-breadcrumbs.context';

type Variants = VariantProps<typeof breadcrumbsVariants>;

export type BreadcrumbsProps = PropsPolymorphic & {
  size?: Variants['size'];
  active?: string;
};

const { size, active, as = 'ul' } = defineProps<BreadcrumbsProps>();

provideBreadcrumbsState(
  () => size,
  () => active,
);
</script>

<template>
  <component :is="as" :class="breadcrumbsVariants({ size: size })" v-tw-merge>
    <slot />
  </component>
</template>
