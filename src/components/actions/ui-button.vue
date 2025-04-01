<script setup lang="ts">
import { useInteractions, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { AnimatePresence, motion } from 'motion-v';
import { useTemplateRef } from 'vue';

export type ButtonProps = PropsPolymorphic & {
  variant?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'caution' | 'critical';
  leftKey?: string;
  rightKey?: string;
};

const {
  variant = 'elevated',
  color = 'primary',
  as = 'button',
  leftKey,
  rightKey,
} = defineProps<ButtonProps>();

const ref = useTemplateRef<HTMLElement>('button');

useInteractions(ref);
useRipple(ref);
</script>

<template>
  <component
    ref="button"
    :is="as"
    :class="[
      'button group/button',
      'cursor-pointer',
      'relative',
      'h-10 rounded-md',
      'outline-none',
      variant !== 'outlined' && 'border-transparent',
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
      {
        'px-md': variant !== 'text',
        'px-sm': variant === 'text',
      },
      {
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
        text: ['is-disabled:text-on-surface/38'],
      }[variant],
      {
        primary: {
          elevated: ['text-primary', 'ripple:bg-primary', 'state-primary'],
          filled: [
            'bg-primary',
            'text-on-primary',
            'ripple:bg-on-primary',
            'state-on-primary',
          ],
          tonal: [
            'bg-primary-container',
            'text-on-primary-container',
            'ripple:bg-on-primary-container',
            'state-on-primary-container',
          ],
          outlined: [
            'text-primary',
            'ripple:bg-primary',
            'state-primary',
            'in-focus-visible:border-primary',
          ],
          text: ['text-primary', 'ripple:bg-primary', 'state-primary'],
        }[variant],
        secondary: {
          elevated: [
            'text-secondary',
            'ripple:bg-secondary',
            'state-secondary',
          ],
          filled: [
            'bg-secondary',
            'text-on-secondary',
            'ripple:bg-on-secondary',
            'state-on-secondary',
          ],
          tonal: [
            'bg-secondary-container',
            'text-on-secondary-container',
            'ripple:bg-on-secondary-container',
            'state-on-secondary-container',
          ],
          outlined: [
            'text-secondary',
            'ripple:bg-secondary',
            'state-secondary',
            'in-focus-visible:border-secondary',
          ],
          text: ['text-secondary', 'ripple:bg-secondary', 'state-secondary'],
        }[variant],
        info: {
          elevated: ['text-info', 'ripple:bg-info', 'state-info'],
          filled: [
            'bg-info',
            'text-on-info',
            'ripple:bg-on-info',
            'state-on-info',
          ],
          tonal: [
            'bg-info-container',
            'text-on-info-container',
            'ripple:bg-on-info-container',
            'state-on-info-container',
          ],
          outlined: [
            'text-info',
            'ripple:bg-info',
            'state-info',
            'in-focus-visible:border-info',
          ],
          text: ['text-info', 'ripple:bg-info', 'state-info'],
        }[variant],
        success: {
          elevated: ['text-success', 'ripple:bg-success', 'state-success'],
          filled: [
            'bg-success',
            'text-on-success',
            'ripple:bg-on-success',
            'state-on-success',
          ],
          tonal: [
            'bg-success-container',
            'text-on-success-container',
            'ripple:bg-on-success-container',
            'state-on-success-container',
          ],
          outlined: [
            'text-success',
            'ripple:bg-success',
            'state-success',
            'in-focus-visible:border-success',
          ],
          text: ['text-success', 'ripple:bg-success', 'state-success'],
        }[variant],
        caution: {
          elevated: ['text-caution', 'ripple:bg-caution', 'state-caution'],
          filled: [
            'bg-caution',
            'text-on-caution',
            'ripple:bg-on-caution',
            'state-on-caution',
          ],
          tonal: [
            'bg-caution-container',
            'text-on-caution-container',
            'ripple:bg-on-caution-container',
            'state-on-caution-container',
          ],
          outlined: [
            'text-caution',
            'ripple:bg-caution',
            'state-caution',
            'in-focus-visible:border-caution',
          ],
          text: ['text-caution', 'ripple:bg-caution', 'state-caution'],
        }[variant],
        critical: {
          elevated: ['text-critical', 'ripple:bg-critical', 'state-critical'],
          filled: [
            'bg-critical',
            'text-on-critical',
            'ripple:bg-on-critical',
            'state-on-critical',
          ],
          tonal: [
            'bg-critical-container',
            'text-on-critical-container',
            'ripple:bg-on-critical-container',
            'state-on-critical-container',
          ],
          outlined: [
            'text-critical',
            'ripple:bg-critical',
            'state-critical',
            'in-focus-visible:border-critical',
          ],
          text: ['text-critical', 'ripple:bg-critical', 'state-critical'],
        }[variant],
      }[color],
    ]"
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="leftKey"
        :initial="{ width: 0, height: 0, opacity: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-4h)',
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="[
          'button--icon',
          'relative',
          'inline-flex items-center justify-center',
          'size-4.5',
          'overflow-hidden empty:hidden',
          '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
          variant === 'text' && 'starting:mr-0 mr-2xs',
        ]"
      >
        <slot name="left" />
      </motion.span>
    </AnimatePresence>
    <span
      :class="[
        'button-label',
        'typography-label-large truncate',
        {
          'px-xs': variant !== 'text',
          'px-2xs': variant === 'text',
        },
      ]"
    >
      <slot />
    </span>

    <AnimatePresence mode="wait">
      <motion.span
        :key="rightKey"
        :initial="{ width: 0, height: 0, opacity: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0 }"
        :animate="{
          width: 'var(--spacing-4h)',
          height: 'var(--spacing-4h)',
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="[
          'button--icon',
          'relative',
          'inline-flex items-center justify-center',
          'size-4.5',
          'overflow-hidden empty:hidden',
          '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
          variant === 'text' && 'starting:ml-0 ml-2xs',
        ]"
      >
        <slot name="right" />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
