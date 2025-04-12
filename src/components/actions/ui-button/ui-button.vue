<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { AnimatePresence, motion } from 'motion-v';
import { useTemplateRef } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from './ui-button.variants';

type Variants = VariantProps<typeof buttonVariants>;

export type ButtonProps = PropsPolymorphic & {
  variant?: Variants['variant'];
  color?: Variants['color'];
  leftKey?: string;
  rightKey?: string;
};

const {
  variant,
  color,
  as = 'button',
  leftKey,
  rightKey,
} = defineProps<ButtonProps>();

const elementRef = useTemplateRef<HTMLElement>('button');

useButton(elementRef, { elementType: as === 'button' ? 'button' : '' });
useRipple(elementRef);
</script>

<template>
  <component
    :is="as"
    ref="button"
    tabindex="0"
    :class="buttonVariants({ variant, color })"
    v-tw-merge
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="leftKey"
        v-if="$slots.left"
        :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-4h)',
          opacity: 1,
          marginRight: variant === 'text' ? 'var(--spacing-2xs)' : 0,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="[
          buttonVariants.icon(),
          'button--left-icon',
          variant === 'text' && 'mr-2xs',
        ]"
        v-tw-merge
      >
        <slot name="left" />
      </motion.span>
    </AnimatePresence>
    <span
      :class="buttonVariants.label({ isText: variant === 'text' })"
      v-tw-merge
    >
      <slot />
    </span>
    <AnimatePresence mode="wait">
      <motion.span
        :key="rightKey"
        v-if="$slots.right"
        :initial="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-4h)',
          opacity: 1,
          marginLeft: variant === 'text' ? 'var(--spacing-2xs)' : 0,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="[
          buttonVariants.icon(),
          'button--right-icon',
          variant === 'text' && 'ml-2xs',
        ]"
        v-tw-merge
      >
        <slot name="right" />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
