<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { AnimatePresence, motion } from 'motion-v';
import { useTemplateRef } from 'vue';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'button group/button',
    'cursor-pointer',
    'relative',
    'h-10 rounded-md',
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
    ['ripple-wrapper:inset-0', 'ripple-wrapper:rounded-md'],
  ],
  {
    variants: {
      variant: {
        elevated: [
          'bg-surface-container-low is-disabled:bg-on-surface/12',
          'is-disabled:text-on-surface/38',
          [
            'elevation-1',
            'is-hovered:elevation-2',
            'in-focus-visible:elevation-1',
            'is-pressed:elevation-1',
            'is-disabled:elevation-0',
          ],
        ],
        filled: [
          'is-disabled:bg-on-surface/12',
          'is-disabled:text-on-surface/38',
          [
            'elevation-0',
            'is-hovered:elevation-1',
            'in-focus-visible:elevation-0',
            'is-pressed:elevation-0',
          ],
        ],
        tonal: [
          'is-disabled:bg-on-surface/12',
          'is-disabled:text-on-surface/38',
          [
            'elevation-0',
            'is-hovered:elevation-1',
            'in-focus-visible:elevation-0',
            'is-pressed:elevation-0',
          ],
        ],
        outlined: [
          'is-disabled:text-on-surface/38',
          'border border-outline',
          'is-disabled:border-on-surface/38',
        ],
        text: ['px-sm', 'is-disabled:text-on-surface/38'],
      },
      color: {
        primary: [],
        secondary: [],
        info: [],
        success: [],
        caution: [],
        critical: [],
      },
    },
    defaultVariants: {
      variant: 'elevated',
      color: 'primary',
    },
    compoundVariants: [
      {
        variant: ['elevated', 'filled', 'tonal', 'outlined'],
        class: 'px-md',
      },

      {
        color: 'primary',
        variant: 'elevated',
        class: ['text-primary', 'ripple:bg-primary', 'state-primary'],
      },
      {
        color: 'primary',
        variant: 'filled',
        class: [
          'bg-primary',
          'text-on-primary',
          'ripple:bg-on-primary',
          'state-on-primary',
        ],
      },
      {
        color: 'primary',
        variant: 'tonal',
        class: [
          'bg-primary-container',
          'text-on-primary-container',
          'ripple:bg-on-primary-container',
          'state-on-primary-container',
        ],
      },
      {
        color: 'primary',
        variant: 'outlined',
        class: [
          'text-primary',
          'ripple:bg-primary',
          'state-primary',
          'in-focus-visible:border-primary',
        ],
      },
      {
        color: 'primary',
        variant: 'text',
        class: ['text-primary', 'ripple:bg-primary', 'state-primary'],
      },

      {
        color: 'secondary',
        variant: 'elevated',
        class: ['text-secondary', 'ripple:bg-secondary', 'state-secondary'],
      },
      {
        color: 'secondary',
        variant: 'filled',
        class: [
          'bg-secondary',
          'text-on-secondary',
          'ripple:bg-on-secondary',
          'state-on-secondary',
        ],
      },
      {
        color: 'secondary',
        variant: 'tonal',
        class: [
          'bg-secondary-container',
          'text-on-secondary-container',
          'ripple:bg-on-secondary-container',
          'state-on-secondary-container',
        ],
      },
      {
        color: 'secondary',
        variant: 'outlined',
        class: [
          'text-secondary',
          'ripple:bg-secondary',
          'state-secondary',
          'in-focus-visible:border-secondary',
        ],
      },
      {
        color: 'secondary',
        variant: 'text',
        class: ['text-secondary', 'ripple:bg-secondary', 'state-secondary'],
      },

      {
        color: 'info',
        variant: 'elevated',
        class: ['text-info', 'ripple:bg-info', 'state-info'],
      },
      {
        color: 'info',
        variant: 'filled',
        class: [
          'bg-info',
          'text-on-info',
          'ripple:bg-on-info',
          'state-on-info',
        ],
      },
      {
        color: 'info',
        variant: 'tonal',
        class: [
          'bg-info-container',
          'text-on-info-container',
          'ripple:bg-on-info-container',
          'state-on-info-container',
        ],
      },
      {
        color: 'info',
        variant: 'outlined',
        class: [
          'text-info',
          'ripple:bg-info',
          'state-info',
          'in-focus-visible:border-info',
        ],
      },
      {
        color: 'info',
        variant: 'text',
        class: ['text-info', 'ripple:bg-info', 'state-info'],
      },

      {
        color: 'success',
        variant: 'elevated',
        class: ['text-success', 'ripple:bg-success', 'state-success'],
      },
      {
        color: 'success',
        variant: 'filled',
        class: [
          'bg-success',
          'text-on-success',
          'ripple:bg-on-success',
          'state-on-success',
        ],
      },
      {
        color: 'success',
        variant: 'tonal',
        class: [
          'bg-success-container',
          'text-on-success-container',
          'ripple:bg-on-success-container',
          'state-on-success-container',
        ],
      },
      {
        color: 'success',
        variant: 'outlined',
        class: [
          'text-success',
          'ripple:bg-success',
          'state-success',
          'in-focus-visible:border-success',
        ],
      },
      {
        color: 'success',
        variant: 'text',
        class: ['text-success', 'ripple:bg-success', 'state-success'],
      },

      {
        color: 'caution',
        variant: 'elevated',
        class: ['text-caution', 'ripple:bg-caution', 'state-caution'],
      },
      {
        color: 'caution',
        variant: 'filled',
        class: [
          'bg-caution',
          'text-on-caution',
          'ripple:bg-on-caution',
          'state-on-caution',
        ],
      },
      {
        color: 'caution',
        variant: 'tonal',
        class: [
          'bg-caution-container',
          'text-on-caution-container',
          'ripple:bg-on-caution-container',
          'state-on-caution-container',
        ],
      },
      {
        color: 'caution',
        variant: 'outlined',
        class: [
          'text-caution',
          'ripple:bg-caution',
          'state-caution',
          'in-focus-visible:border-caution',
        ],
      },
      {
        color: 'caution',
        variant: 'text',
        class: ['text-caution', 'ripple:bg-caution', 'state-caution'],
      },

      {
        color: 'critical',
        variant: 'elevated',
        class: ['text-critical', 'ripple:bg-critical', 'state-critical'],
      },
      {
        color: 'critical',
        variant: 'filled',
        class: [
          'bg-critical',
          'text-on-critical',
          'ripple:bg-on-critical',
          'state-on-critical',
        ],
      },
      {
        color: 'critical',
        variant: 'tonal',
        class: [
          'bg-critical-container',
          'text-on-critical-container',
          'ripple:bg-on-critical-container',
          'state-on-critical-container',
        ],
      },
      {
        color: 'critical',
        variant: 'outlined',
        class: [
          'text-critical',
          'ripple:bg-critical',
          'state-critical',
          'in-focus-visible:border-critical',
        ],
      },
      {
        color: 'critical',
        variant: 'text',
        class: ['text-critical', 'ripple:bg-critical', 'state-critical'],
      },
    ],
  },
);

const iconVariants = cva([
  'button--icon',
  'relative',
  'inline-flex items-center justify-center',
  'size-4.5',
  'overflow-hidden empty:hidden',
  '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
]);

const labelVariants = cva(
  ['button--label', 'typography-label-large truncate'],
  {
    variants: {
      isText: {
        true: 'px-2xs',
        false: 'px-xs',
      },
    },
  },
);

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

const ref = useTemplateRef<HTMLElement>('button');

useButton(ref, { elementType: as === 'button' ? 'button' : '' });
useRipple(ref);
</script>

<template>
  <component
    :is="as"
    ref="button"
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
        :class="[iconVariants(), variant === 'text' && 'mr-2xs']"
        v-tw-merge
      >
        <slot name="left" />
      </motion.span>
    </AnimatePresence>
    <span :class="labelVariants({ isText: variant === 'text' })" v-tw-merge>
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
        :class="[iconVariants(), variant === 'text' && 'ml-2xs']"
        v-tw-merge
      >
        <slot name="right" />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
