<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { type CardVariants, cardVariants } from './ui-card.variants';
import { useButton, useRipple } from '@/composables';
import { computed, useTemplateRef } from 'vue';

export type CardProps = PropsPolymorphic & {
  color?: CardVariants['color'];
  variant?: CardVariants['variant'];
  interactable?: boolean;
  disabled?: boolean;
};

const {
  color,
  variant,
  interactable,
  disabled,
  as = 'div',
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

const extraProps = computed(() => ({
  tabindex: interactable ? 0 : undefined,
  'aria-disabled': as === 'button' ? undefined : computedDisabled.value,
  disabled: as === 'button' ? computedDisabled.value : undefined,
}));
</script>

<template>
  <component
    :is="as"
    ref="card"
    v-bind="extraProps"
    :class="cardVariants({ color, variant, interactable })"
    v-tw-merge
  >
    <slot />
  </component>
</template>
