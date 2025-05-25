<script setup lang="ts">
import { computed } from 'vue';
import { type BadgeVariants, badgeVariants } from './ui-badge.variants';
import { AnimatePresence } from 'motion-v';
import { materialDuration, materialEasing, transitionConfig } from '@/config';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import { computedVariants } from '@/composables';

export type BadgeProps = MotionComponentProps & {
  color?: BadgeVariants['color'];
  placement?: BadgeVariants['placement'];
  value?: number;
  maxValue?: number;
};

const {
  color,
  placement,
  value = 0,
  maxValue = 999,
  as = 'div',
  initial,
  animate,
  exit,
  ...motionProps
} = defineProps<BadgeProps>();

const displayValue = computed(() => {
  if (value < 1) return '';
  if (value > maxValue) return `${maxValue}+`;
  return `${value}`;
});

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
    :class="badgeVariants.wrapper()"
  >
    <slot />
    <AnimatePresence mode="wait">
      <MotionComponent
        v-if="value >= 0"
        as="span"
        :data-one-digit="value < 10"
        :initial="{
          opacity: 0,
          scale: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        }"
        :animate="{
          opacity: 1,
          scale: 1,
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        }"
        :exit="{
          opacity: 0,
          scale: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        }"
        :class="
          badgeVariants({
            size: value < 1 ? 'small' : 'large',
            color,
            placement,
          })
        "
      >
        <AnimatePresence mode="popLayout">
          <MotionComponent
            v-for="(char, i) in displayValue.split('')"
            as="span"
            :key="char + i"
            :initial="{
              y: -20,
              opacity: 0,
              transition: transitionConfig.preset.short.enter.asMotion(),
            }"
            :animate="{
              y: 0,
              opacity: 1,
              transition: transitionConfig.preset.short.beginEnd.asMotion(),
            }"
            :exit="{
              y: 20,
              opacity: 0,
              transition: transitionConfig.preset.short.exit.asMotion(),
            }"
            :transition="{
              duration: materialDuration.asMotion('short-2'),
              ease: materialEasing.standard,
            }"
          >
            {{ char }}
          </MotionComponent>
        </AnimatePresence>
      </MotionComponent>
    </AnimatePresence>
  </MotionComponent>
</template>
