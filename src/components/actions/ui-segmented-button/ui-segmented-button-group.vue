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
import { computed } from 'vue';
import { Motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';

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

const extraProps = computed(() => ({
  role: state.mode.value === 'single' ? 'radiogroup' : 'toolbar',
  'aria-disabled': state.disabled.value || disabled ? 'true' : undefined,
}));
</script>

<template>
  <Motion
    as-child
    :transition="{
      duration: materialDuration.asMotion('medium-1'),
      ease: materialEasing.standard,
    }"
  >
    <component
      :is="as"
      aria-orientation="horizontal"
      v-bind="extraProps"
      :class="segmentedButtonVariants.group({ density })"
      v-tw-merge
    >
      <slot />
    </component>
  </Motion>
</template>
