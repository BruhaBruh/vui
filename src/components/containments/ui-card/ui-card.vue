<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import type { VariantProps } from 'class-variance-authority';
import { cardVariants } from './ui-card.variants';
import { useButton, useRipple } from '@/composables';
import { computed, useTemplateRef } from 'vue';

type Variants = VariantProps<typeof cardVariants>;

export type CardProps = PropsPolymorphic & {
  color?: Variants['color'];
  variant?: Variants['variant'];
  interactable?: boolean;
  disabled?: boolean;
};

const {
  color,
  variant,
  interactable,
  disabled,
  as = 'section',
} = defineProps<CardProps>();

const elementRef = useTemplateRef<HTMLElement>('card');

const removeRole = computed(() => !interactable);

useButton(elementRef, {
  elementType: as === 'button' ? 'button' : '',
  removeRole,
});
useRipple(elementRef);

const computedDisabled = computed(() => {
  if (!interactable) return undefined;
  if (!disabled) return undefined;
  return disabled;
});
</script>

<template>
  <component
    :is="as"
    ref="card"
    :tabindex="interactable ? 0 : undefined"
    :aria-disabled="as !== 'button' ? computedDisabled : undefined"
    :disabled="as === 'button' ? computedDisabled : undefined"
    :class="cardVariants({ color, variant, interactable })"
    v-tw-merge
  >
    <slot />
  </component>
</template>
