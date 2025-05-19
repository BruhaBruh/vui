<script setup lang="ts">
import { computedVariants, useRipple, useToggleButton } from '@/composables';
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
import { transitionConfig } from '@/config';

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
  initial,
  animate,
  exit,
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

const {
  initial: initialObject,
  animate: animateObject,
  exit: exitObject,
} = computedVariants(() => ({
  initial,
  animate,
  exit,
}));
</script>

<template>
  <MotionComponent
    ref="segmented-button"
    :as
    :aria-checked="checked"
    v-bind="extraProps"
    :initial="{
      transition: transitionConfig.preset.short.enter.asMotion(),
      ...initialObject,
    }"
    :animate="{
      transition: transitionConfig.preset.short.beginEnd.asMotion(),
      ...animateObject,
    }"
    :exit="{
      transition: transitionConfig.preset.short.exit.asMotion(),
      ...exitObject,
    }"
    :class="
      segmentedButtonVariants({
        color,
        isSelected: isSelected,
      })
    "
  >
    <AnimatePresence mode="wait">
      <MotionComponent
        as-child
        v-if="isSelected"
        :key="iconKey"
        :initial="{
          width: 0,
          height: 0,
          marginRight: 0,
          opacity: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-4h)',
          marginRight: 'var(--spacing-2xs)',
          opacity: 1,
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        }"
        :exit="{
          width: 0,
          height: 0,
          marginRight: 0,
          opacity: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        }"
        :class="segmentedButtonVariants.icon()"
      >
        <slot name="icon">
          <IconCheck />
        </slot>
      </MotionComponent>
    </AnimatePresence>
    <MotionComponent
      as="span"
      :animate="{
        marginLeft: isSelected ? 0 : 'var(--spacing-3q)',
        marginRight: isSelected ? 0 : 'var(--spacing-3q)',
        opacity: 1,
        transition: transitionConfig.preset.short.beginEnd.asMotion(),
      }"
      :class="segmentedButtonVariants.label()"
      v-tw-merge
    >
      <slot />
    </MotionComponent>
  </MotionComponent>
</template>
