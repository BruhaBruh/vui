<script setup lang="ts">
import { type CardVariants, cardVariants } from './ui-card.variants';
import { useButton, useRipple } from '@/composables';
import { computed, useTemplateRef } from 'vue';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type CardProps = MotionComponentProps & {
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
  ...motionProps
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
  ...motionProps,
  tabindex: interactable ? 0 : undefined,
  'aria-disabled': as === 'button' ? undefined : computedDisabled.value,
  disabled: as === 'button' ? computedDisabled.value : undefined,
}));
</script>

<template>
  <MotionComponent
    :as
    ref="card"
    v-bind="extraProps"
    :class="cardVariants({ color, variant, interactable })"
  >
    <slot />
  </MotionComponent>
</template>
