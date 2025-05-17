<script setup lang="ts">
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
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type SegmentedButtonGroupProps = MotionComponentProps & {
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
  ...motionProps
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
  ...motionProps,
  role: state.mode.value === 'single' ? 'radiogroup' : 'toolbar',
  'aria-disabled': state.disabled.value || disabled ? 'true' : undefined,
}));
</script>

<template>
  <MotionComponent
    :as
    aria-orientation="horizontal"
    v-bind="extraProps"
    :class="segmentedButtonVariants.group({ density })"
  >
    <slot />
  </MotionComponent>
</template>
