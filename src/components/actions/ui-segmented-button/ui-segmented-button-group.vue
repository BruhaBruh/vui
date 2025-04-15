<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { provideSegmentedButtonState } from './ui-segmented-button.context';
import type {
  SegmentedButtonGroupStateOptions,
  SegmentedButtonSelectedValue,
} from './ui-segmented-button.context';
import {
  type SegmentedButtonGroupVariants,
  segmentedButtonVariants,
} from './ui-segmented-button.variants';

export type SegmentedButtonGroupProps = PropsPolymorphic & {
  density?: SegmentedButtonGroupVariants['density'];
  color?: SegmentedButtonGroupStateOptions['color'];
  selectionMode?: SegmentedButtonGroupStateOptions['mode'];
  disabled?: SegmentedButtonGroupStateOptions['disabled'];
};

const {
  density,
  color,
  selectionMode = 'single',
  disabled = false,
  as = 'div',
} = defineProps<SegmentedButtonGroupProps>();

const selected = defineModel<SegmentedButtonSelectedValue[]>('selected', {
  default: [],
});

const state = provideSegmentedButtonState({
  mode: () => selectionMode,
  selected,
  disabled: () => disabled,
  color: () => color,
});
</script>

<template>
  <component
    :is="as"
    :role="state.mode.value === 'single' ? 'radiogroup' : 'toolbar'"
    aria-orientation="horizontal"
    :aria-disabled="disabled ? 'true' : undefined"
    :class="segmentedButtonVariants.group({ density })"
    v-tw-merge
  >
    <slot />
  </component>
</template>
