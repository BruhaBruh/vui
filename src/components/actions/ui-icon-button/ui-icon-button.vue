<script setup lang="ts">
import { useRipple, useToggleButton } from '@/composables';
import type { PropsPolymorphic } from '@/types';
import { computed, useTemplateRef } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { iconButtonVariants } from './ui-icon-button.variants';

type Variants = VariantProps<typeof iconButtonVariants>;

export type IconButtonProps = PropsPolymorphic & {
  variant?: Variants['variant'];
  color?: Variants['color'];
  iconKey?: string;
};

const {
  variant = 'standard',
  color = 'primary',
  as = 'button',
  iconKey,
} = defineProps<IconButtonProps>();

const toggleable = defineModel<boolean>('toggleable', { default: false });
const selected = defineModel<boolean>('selected', { default: false });

const element = useTemplateRef<HTMLElement>('icon-button');

useToggleButton(element, {
  isToggleable: toggleable,
  isSelected: selected,
  onClick: () => {
    if (toggleable.value) {
      selected.value = !selected.value;
    }
  },
  elementType: as === 'button' ? 'button' : '',
});
useRipple(element);

const state = computed<Variants['state']>(() => {
  if (toggleable.value && selected.value) return 'toggleable-selected';
  if (toggleable.value) return 'toggleable-not-selected';
  return 'default';
});
</script>

<template>
  <component
    :is="as"
    ref="icon-button"
    tabindex="0"
    :class="iconButtonVariants({ variant, color, state })"
    v-tw-merge
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="iconKey"
        :initial="{ width: 0, height: 0, opacity: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0 }"
        :animate="{
          width: 'var(--spacing-6)',
          height: 'var(--spacing-6)',
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="iconButtonVariants.icon()"
        v-tw-merge
      >
        <slot />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
