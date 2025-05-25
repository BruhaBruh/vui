<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { breadcrumbsVariants } from './ui-breadcrumbs.variants';
import {
  type BreadcrumbsStateOptions,
  provideBreadcrumbsState,
} from './ui-breadcrumbs.context';

export type BreadcrumbsProps = PropsPolymorphic & {
  size?: BreadcrumbsStateOptions['size'];
  active?: BreadcrumbsStateOptions['active'];
  currentVariant?: BreadcrumbsStateOptions['currentVariant'];
};

const {
  size,
  active,
  currentVariant = 'page',
  as = 'ul',
} = defineProps<BreadcrumbsProps>();

provideBreadcrumbsState({
  size: () => size,
  active: () => active,
  currentVariant: () => currentVariant,
});
</script>

<template>
  <component :is="as" :class="breadcrumbsVariants({ size: size })" v-tw-merge>
    <slot />
  </component>
</template>
