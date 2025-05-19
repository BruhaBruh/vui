<script setup lang="ts">
import { type CardVariants, cardVariants } from './ui-card.variants';
import { computedVariants, useButton, useRipple } from '@/composables';
import { computed, useTemplateRef } from 'vue';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import { transitionConfig } from '@/config';

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
  initial,
  animate,
  exit,
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

const {
  initial: initialObject,
  animate: animateObject,
  exit: exitObject,
} = computedVariants(() => ({
  initial,
  animate,
  exit,
}));
</script>

<template>
  <MotionComponent
    :as
    ref="card"
    v-bind="extraProps"
    :initial="{
      transition: transitionConfig.preset.short.enter.asMotion(),
      ...initialObject,
    }"
    :animate="{
      transition: transitionConfig.preset.short.beginEnd.asMotion(),
      ...animateObject,
    }"
    :exit="{
      transition: transitionConfig.preset.short.exit.asMotion(),
      ...exitObject,
    }"
    :class="cardVariants({ color, variant, interactable })"
  >
    <slot />
  </MotionComponent>
</template>
