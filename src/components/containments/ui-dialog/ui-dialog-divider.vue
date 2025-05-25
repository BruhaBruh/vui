<script setup lang="ts">
import { Divider, type DividerProps } from '../ui-divider';
import {
  type DialogDividerVariants,
  dialogVariants,
} from './ui-dialog.variants';

export type DialogDividerProps = DividerProps & {
  spacing?: DialogDividerVariants['spacing'];
};

const { spacing, as = 'p', ...rest } = defineProps<DialogDividerProps>();
</script>

<template>
  <Divider
    :is="as"
    :class="dialogVariants.divider({ spacing })"
    v-tw-merge
    v-bind="rest"
  />
</template>
