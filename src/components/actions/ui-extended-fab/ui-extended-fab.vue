<script setup lang="ts">
import { computedVariants, useButton, useRipple } from '@/composables';
import { AnimatePresence } from 'motion-v';
import { computed, useTemplateRef } from 'vue';
import {
  type ExtendedFabVariants,
  extendedFabVariants,
} from './ui-extended-fab.variants';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import {
  extendedFabIconMargin,
  extendedFabIconSize,
} from './ui-extended-fab.options';
import { transitionConfig } from '@/config';

export type ExtendedFabProps = Omit<MotionComponentProps, 'asChild'> & {
  size?: ExtendedFabVariants['size'];
  variant?: ExtendedFabVariants['variant'];
  color?: ExtendedFabVariants['color'];
  iconKey?: string;
};

const {
  size = 'sm',
  variant = 'filled',
  color = 'primary',
  as = 'button',
  iconKey,
  initial,
  animate,
  exit,
  ...motionProps
} = defineProps<ExtendedFabProps>();

const elementRef = useTemplateRef<HTMLElement>('extended-fab');

useButton(elementRef, {
  elementType: as === 'button' ? 'button' : '',
  interaction: { disabled: false },
});
useRipple(elementRef);

const variants = computed(() => ({
  size,
  variant,
  color,
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
    ref="extended-fab"
    :as
    tabindex="0"
    v-bind="motionProps"
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
    :class="extendedFabVariants(variants)"
  >
    <AnimatePresence mode="wait">
      <MotionComponent
        as-child
        v-if="$slots.icon"
        :key="iconKey"
        :initial="{
          width: 0,
          height: 0,
          marginRight: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        }"
        :animate="{
          width: extendedFabIconSize[size],
          height: extendedFabIconSize[size],
          marginRight: extendedFabIconMargin[size],
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        }"
        :exit="{
          width: 0,
          height: 0,
          marginRight: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        }"
        :class="extendedFabVariants.icon(variants)"
      >
        <slot name="icon" />
      </MotionComponent>
    </AnimatePresence>
    <MotionComponent
      as="span"
      :variants="{
        enter: {
          width: 0,
          opacity: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        },
        default: {
          width: 'max-content',
          opacity: 1,
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        },
        exit: {
          width: 0,
          opacity: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        },
      }"
      initial="enter"
      animate="default"
      exit="exit"
      :class="extendedFabVariants.label(variants)"
    >
      <slot />
    </MotionComponent>
  </MotionComponent>
</template>
