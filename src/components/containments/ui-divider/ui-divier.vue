<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { dividerVariants } from './ui-divider.variants';

export type DividerProps = PropsPolymorphic & {
  orientation?: 'horizontal' | 'vertical';
  inset?: boolean;
};

const {
  orientation = 'horizontal',
  inset,
  as = 'div',
} = defineProps<DividerProps>();
</script>

<template>
  <component
    :is="as"
    role="separator"
    :aria-orientation="orientation"
    :class="dividerVariants({ inset })"
    v-tw-merge
  />
</template>
