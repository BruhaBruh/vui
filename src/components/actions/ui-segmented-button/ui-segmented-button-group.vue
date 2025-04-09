<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { provideSegmentedButtonState } from './ui-segmented-button.context';
import type {
  SegmentedButtonGroupMode,
  SegmentedButtonSelectedValue,
} from './ui-segmented-button.context';
import { type VariantProps } from 'class-variance-authority';
import { segmentedButtonVariants } from './ui-segmented-button.variants';
import { computed } from 'vue';

type Variants = VariantProps<typeof segmentedButtonVariants.group>;

export type SegmentedButtonGroupProps = PropsPolymorphic & {
  density?: Variants['density'];
  selectionMode?: SegmentedButtonGroupMode;
  disabled?: boolean;
};

const {
  density,
  selectionMode = 'single',
  disabled = false,
  as = 'section',
} = defineProps<SegmentedButtonGroupProps>();

const selected = defineModel<SegmentedButtonSelectedValue[]>('selected', {
  default: [],
});

const state = provideSegmentedButtonState(
  selected,
  () => selectionMode,
  () => disabled,
);
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
