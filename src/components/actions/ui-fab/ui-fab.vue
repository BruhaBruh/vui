<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { AnimatePresence, motion } from 'motion-v';
import { useTemplateRef } from 'vue';
import { type VariantProps } from 'class-variance-authority';
import { fabVariants } from './ui-fab.variants';

type Variants = VariantProps<typeof fabVariants>;

export type FabProps = PropsPolymorphic & {
  color?: Variants['color'];
  size?: Variants['size'];
  lowered?: Variants['lowered'];
  iconKey?: string;
};

const {
  color,
  size,
  lowered,
  iconKey,
  as = 'button',
} = defineProps<FabProps>();

const ref = useTemplateRef<HTMLElement>('fab');

useButton(ref, {
  elementType: as === 'button' ? 'button' : '',
  interaction: { disabled: false },
});
useRipple(ref);
</script>

<template>
  <component
    :is="as"
    ref="fab"
    tabindex="0"
    :class="fabVariants({ color, size, lowered })"
    v-tw-merge
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="iconKey"
        :initial="{ width: 0, height: 0, opacity: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0 }"
        :animate="{
          width: {
            sm: 'var(--spacing-6)',
            md: 'var(--spacing-6)',
            lg: 'var(--spacing-9)',
          }[size ?? 'md'],
          height: {
            sm: 'var(--spacing-6)',
            md: 'var(--spacing-6)',
            lg: 'var(--spacing-9)',
          }[size ?? 'md'],
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="fabVariants.icon({ size })"
        v-tw-merge
      >
        <slot />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
