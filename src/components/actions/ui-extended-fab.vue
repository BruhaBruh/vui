<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { AnimatePresence, motion } from 'motion-v';
import { useTemplateRef } from 'vue';

export type ExtendedFabProps = PropsPolymorphic & {
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
  slotKey?: string;
};

const {
  color = 'surface',
  lowered = false,
  iconKey,
  slotKey,
  as = 'button',
} = defineProps<ExtendedFabProps>();

const ref = useTemplateRef<HTMLElement>('extended-fab');

useButton(ref, {
  elementType: as === 'button' ? 'button' : '',
  interaction: { disabled: false },
});
useRipple(ref);
</script>

<template>
  <component
    :is="as"
    ref="extended-fab"
    :class="[
      'extended-fab group/extended-fab',
      'cursor-pointer',
      'relative',
      'outline-none border-transparent',
      'h-14 rounded-md p-md',
      'inline-flex items-center justify-center',
      'transition-box easing-standard duration-medium-1',
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
        true: 'min-w-20',
        false: 'min-w-14',
      }[`${$slots.default !== undefined}`],
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
        :class="[
          'extended-fab--icon',
          'relative size-6',
          'inline-flex items-center justify-center',
          'overflow-hidden empty:hidden',
          '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
        ]"
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
        :class="[
          'extended-fab--label',
          'relative',
          'inline-flex',
          'w-max px-2xs',
          'typography-label-large truncate',
          'overflow-hidden empty:hidden',
        ]"
      >
        <slot />
      </motion.span>
    </AnimatePresence>
  </component>
</template>
