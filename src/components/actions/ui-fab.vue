<script setup lang="ts">
import { useInteractions, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { AnimatePresence, motion } from 'motion-v';
import { useTemplateRef } from 'vue';

export type FabProps = PropsPolymorphic & {
  color?:
    | 'surface'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'caution'
    | 'critical';
  size?: 'sm' | 'md' | 'lg';
  lowered?: boolean;
  iconKey?: string;
};

const {
  color = 'surface',
  size = 'md',
  lowered = false,
  iconKey,
  as = 'button',
} = defineProps<FabProps>();

const ref = useTemplateRef<HTMLElement>('fab');

useInteractions(ref, { disabled: false });
useRipple(ref);
</script>

<template>
  <component
    ref="fab"
    :is="as"
    :class="[
      'fab group/fab',
      'cursor-pointer',
      'relative',
      'outline-none border-transparent',
      'inline-flex items-center justify-center',
      'transition easing-standard duration-medium-1',
      'overflow-hidden whitespace-nowrap',
      [
        'is-disabled:state-transparent',
        'is-disabled:pointer-events-none',
        'is-hovered:state-hover',
        'in-focus-visible:state-focus',
        'is-pressed:state-press',
      ],
      ['ripple-wrapper:inset-0'],
      {
        surface: ['text-primary', 'ripple:bg-primary', 'state-primary'],
        primary: [
          'bg-primary-container',
          'text-on-primary-container',
          'ripple:bg-on-primary-container',
          'state-on-primary-container',
        ],
        secondary: [
          'bg-secondary-container',
          'text-on-secondary-container',
          'ripple:bg-on-secondary-container',
          'state-on-secondary-container',
        ],
        info: [
          'bg-info-container',
          'text-on-info-container',
          'ripple:bg-on-info-container',
          'state-on-info-container',
        ],
        success: [
          'bg-success-container',
          'text-on-success-container',
          'ripple:bg-on-success-container',
          'state-on-success-container',
        ],
        caution: [
          'bg-caution-container',
          'text-on-caution-container',
          'ripple:bg-on-caution-container',
          'state-on-caution-container',
        ],
        critical: [
          'bg-critical-container',
          'text-on-critical-container',
          'ripple:bg-on-critical-container',
          'state-on-critical-container',
        ],
      }[color],
      {
        sm: ['size-10 rounded-xs'],
        md: ['size-14 rounded-md p-md'],
        lg: ['size-24 rounded-2xl p-md'],
      }[size],
      {
        true: [
          'elevation-1',
          'is-hovered:elevation-2',
          'in-focus-visible:elevation-1',
          'is-pressed:elevation-1',
        ],
        false: [
          'elevation-3',
          'is-hovered:elevation-4',
          'in-focus-visible:elevation-3',
          'is-pressed:elevation-3',
        ],
      }[`${lowered}`],
      {
        'bg-surface-container-low': color === 'surface' && lowered,
        'bg-surface-container-high': color === 'surface' && !lowered,
      },
    ]"
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
          }[size],
          height: {
            sm: 'var(--spacing-6)',
            md: 'var(--spacing-6)',
            lg: 'var(--spacing-9)',
          }[size],
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="[
          'fab--icon',
          'relative',
          'inline-flex items-center justify-center',
          'overflow-hidden empty:hidden',
          '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
          {
            sm: ['size-6'],
            md: ['size-6'],
            lg: ['size-9'],
          }[size],
        ]"
      >
        <slot />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
