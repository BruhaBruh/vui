<script setup lang="ts">
import { useRipple, useToggleButton } from '@/composables';
import { computed, useTemplateRef } from 'vue';
import { useSegmentedButtonState } from './ui-segmented-button.context';
import {
  type SegmentedButtonVariants,
  segmentedButtonVariants,
} from './ui-segmented-button.variants';
import { AnimatePresence } from 'motion-v';
import { IconCheck } from '@tabler/icons-vue';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type SegmentedButtonProps = Omit<MotionComponentProps, 'asChild'> & {
  value: string | number;
  color?: SegmentedButtonVariants['color'];
  iconKey?: string;
};

const {
  value,
  color: buttonColor,
  iconKey,
  as = 'button',
  ...motionProps
} = defineProps<SegmentedButtonProps>();

const element = useTemplateRef<HTMLElement>('segmented-button');

const {
  mode,
  selected,
  disabled,
  color: groupColor,
  select,
} = useSegmentedButtonState();

const isSelected = computed(() => selected.value.includes(value));
const color = computed(() => buttonColor ?? groupColor.value);

useToggleButton(element, {
  isToggleable: true,
  isSelected,
  onClick: () => {
    select(value);
  },
  elementType: as === 'button' ? 'button' : '',
});
useRipple(element);

const checked = computed(() => {
  if (mode.value !== 'single') return undefined;
  return isSelected.value;
});

const extraProps = computed(() => ({
  ...motionProps,
  role: mode.value === 'single' ? 'radio' : undefined,
  disabled: disabled.value ? true : undefined,
}));
</script>

<template>
  <MotionComponent
    ref="segmented-button"
    :as
    :aria-checked="checked"
    v-bind="extraProps"
    :class="
      segmentedButtonVariants({
        color,
        isSelected: isSelected,
      })
    "
  >
    <AnimatePresence mode="wait">
      <MotionComponent
        as="span"
        v-if="!isSelected"
        aria-hidden
        :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :animate="{
          width: 'var(--spacing-2e)',
          height: 'var(--spacing-2e)',
          marginRight: 'var(--spacing-3xs)',
          opacity: 1,
        }"
      />
    </AnimatePresence>
    <AnimatePresence mode="wait">
      <MotionComponent
        as-child
        v-if="isSelected"
        :key="iconKey"
        :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-4h)',
          marginRight: 'var(--spacing-2xs)',
          opacity: 1,
        }"
        :class="segmentedButtonVariants.icon()"
      >
        <slot name="icon">
          <IconCheck />
        </slot>
      </MotionComponent>
    </AnimatePresence>
    <span :class="segmentedButtonVariants.label()" v-tw-merge>
      <slot />
    </span>
    <AnimatePresence mode="wait">
      <MotionComponent
        as="span"
        v-if="!isSelected"
        aria-hidden
        :initial="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
        :animate="{
          width: 'var(--spacing-2e)',
          height: 'var(--spacing-2e)',
          marginLeft: 'var(--spacing-3xs)',
          opacity: 1,
        }"
      />
    </AnimatePresence>
  </MotionComponent>
</template>
