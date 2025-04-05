<script setup lang="ts">
import { useRipple, useToggleButton } from '@/composables';
import type { PropsPolymorphic } from '@/types';
import { computed, useTemplateRef } from 'vue';
import { useSegmentedButtonState } from './ui-segmented-button.context';
import type { VariantProps } from 'class-variance-authority';
import { segmentedButtonVariants } from './ui-segmented-button.variants';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { IconCheck } from '@tabler/icons-vue';

type Variants = VariantProps<typeof segmentedButtonVariants>;

export type SegmentedButtonProps = PropsPolymorphic & {
  value: string | number;
  color?: Variants['color'];
  iconKey?: string;
};

const {
  value,
  color,
  iconKey,
  as = 'button',
} = defineProps<SegmentedButtonProps>();

const element = useTemplateRef<HTMLElement>('segmented-button');

const state = useSegmentedButtonState();

const isSelected = computed(() => state.selected.value.includes(value));

useToggleButton(element, {
  isToggleable: true,
  isSelected,
  onClick: () => {
    state.select(value);
  },
  elementType: as === 'button' ? 'button' : '',
});
useRipple(element);
</script>

<template>
  <component
    :is="as"
    ref="segmented-button"
    tabindex="0"
    :role="state.mode.value === 'single' ? 'radio' : undefined"
    :disabled="state.disabled.value ? true : undefined"
    :class="
      segmentedButtonVariants({
        color,
        isSelected: isSelected,
      })
    "
    v-tw-merge
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="iconKey"
        v-if="!isSelected"
        :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-2h)',
          marginRight: 'var(--spacing-2xs)',
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        aria-hidden
        class="pointer-events-none"
        v-tw-merge
      />
    </AnimatePresence>
    <AnimatePresence mode="wait">
      <motion.span
        :key="iconKey"
        v-if="isSelected"
        :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-4h)',
          marginRight: 'var(--spacing-2xs)',
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="segmentedButtonVariants.icon()"
        v-tw-merge
      >
        <slot name="icon">
          <IconCheck />
        </slot>
      </motion.span>
    </AnimatePresence>
    <span :class="segmentedButtonVariants.label()" v-tw-merge>
      <slot />
    </span>
    <AnimatePresence mode="wait">
      <motion.span
        :key="iconKey"
        v-if="!isSelected"
        :initial="{ width: 0, height: 0, opacity: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-2h)',
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        aria-hidden
        class="pointer-events-none"
        v-tw-merge
      />
    </AnimatePresence>
  </component>
</template>
