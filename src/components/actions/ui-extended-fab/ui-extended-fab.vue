<script setup lang="ts">
import { computedVariants, useButton, useRipple } from '@/composables';
import { AnimatePresence } from 'motion-v';
import { computed, useTemplateRef } from 'vue';
import {
  type ExtendedFabVariants,
  extendedFabVariants,
} from './ui-extended-fab.variants';
import {
  Icon,
  type IconProps,
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import {
  extendedFabIconMargin,
  extendedFabIconSize,
} from './ui-extended-fab.options';
import { transitionConfig } from '@/config';

export type ExtendedFabProps = Omit<MotionComponentProps, 'asChild'> & {
  loading?: IconProps['icon'];
  icon?: IconProps['icon'];
  badgeColor?: IconProps['color'];
  badgeValue?: IconProps['value'];
  badgeMaxValue?: IconProps['maxValue'];
  size?: ExtendedFabVariants['size'];
  variant?: ExtendedFabVariants['variant'];
  color?: ExtendedFabVariants['color'];
};

const {
  loading,
  icon,
  badgeColor,
  badgeValue,
  badgeMaxValue,
  size = 'sm',
  variant = 'filled',
  color = 'primary',
  as = 'button',
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
        v-if="loading ?? icon"
        :key="JSON.stringify(loading ?? icon)"
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
        <Icon
          :icon="loading ?? icon!"
          :badge="badgeValue !== undefined"
          :color="badgeColor"
          :value="badgeValue"
          :max-value="badgeMaxValue"
          :class="[loading && 'animate-spin']"
        />
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
