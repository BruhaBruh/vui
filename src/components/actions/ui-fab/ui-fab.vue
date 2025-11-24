<script setup lang="ts">
import { computedVariants, useButton, useRipple } from '@/composables';
import { AnimatePresence } from 'motion-v';
import { computed, useTemplateRef } from 'vue';
import { type FabVariants, fabVariants } from './ui-fab.variants';
import { fabIconSize } from './ui-fab.options';
import {
  Icon,
  type IconProps,
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import { transitionConfig } from '@/config';

export type FabProps = Omit<MotionComponentProps, 'asChild'> & {
  loading?: IconProps['icon'] | boolean;
  icon: IconProps['icon'];
  badgeColor?: IconProps['color'];
  badgeValue?: IconProps['value'];
  badgeMaxValue?: IconProps['maxValue'];
  size?: FabVariants['size'];
  variant?: FabVariants['variant'];
  color?: FabVariants['color'];
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
} = defineProps<FabProps>();

const elementRef = useTemplateRef<HTMLElement>('fab');

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


const finalIcon = computed(() => {
  if (loading || loading === "") {
    if (typeof loading === "boolean" || loading === "") {
      return 'tabler:loader-2'
    }
    return loading;
  }
  return icon
})
</script>

<template>
  <MotionComponent
    ref="fab"
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
    :class="fabVariants(variants)"
  >
    <AnimatePresence mode="wait" :initial="false">
      <MotionComponent
        as-child
        :key="JSON.stringify(finalIcon)"
        :initial="{
          width: 0,
          height: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        }"
        :animate="{
          width: fabIconSize[size],
          height: fabIconSize[size],
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        }"
        :exit="{
          width: 0,
          height: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        }"
        :class="fabVariants.icon(variants)"
      >
        <Icon
          :icon="finalIcon"
          :badge="badgeValue !== undefined"
          :color="badgeColor"
          :value="badgeValue"
          :max-value="badgeMaxValue"
          :class="[(loading || loading === '') && 'animate-spin']"
        />
      </MotionComponent>
    </AnimatePresence>
  </MotionComponent>
</template>
