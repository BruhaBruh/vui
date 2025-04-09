<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { AnimatePresence, motion } from 'motion-v';
import { useTemplateRef } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { extendedFabVariants } from './ui-extended-fab.variants';

type Variants = VariantProps<typeof extendedFabVariants>;

export type ExtendedFabProps = PropsPolymorphic & {
  color?: Variants['color'];
  lowered?: Variants['lowered'];
  iconKey?: string;
  slotKey?: string;
};

const {
  color,
  lowered,
  iconKey,
  slotKey,
  as = 'button',
} = defineProps<ExtendedFabProps>();

const elementRef = useTemplateRef<HTMLElement>('extended-fab');

useButton(elementRef, {
  elementType: as === 'button' ? 'button' : '',
  interaction: { disabled: false },
});
useRipple(elementRef);
</script>

<template>
  <component
    :is="as"
    ref="extended-fab"
    tabindex="0"
    :class="
      extendedFabVariants({
        color,
        lowered,
        hasText: $slots.default !== undefined,
      })
    "
    v-tw-merge
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="iconKey"
        v-if="$slots.icon"
        :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :animate="{
          width: 'var(--spacing-6)',
          height: 'var(--spacing-6)',
          marginRight: $slots.default ? 'var(--spacing-xs)' : 0,
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="extendedFabVariants.icon()"
        v-tw-merge
      >
        <slot name="icon" />
      </motion.span>
    </AnimatePresence>
    <AnimatePresence mode="wait">
      <motion.span
        :key="slotKey"
        v-if="$slots.default"
        :initial="{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }"
        :exit="{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }"
        :animate="{
          width: 'max-content',
          opacity: 1,
          paddingLeft: 'var(--spacing-2xs)',
          paddingRight: 'var(--spacing-2xs)',
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="extendedFabVariants.label()"
        v-tw-merge
      >
        <slot />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
