<script setup lang="ts">
import { computed } from 'vue';
import { type BadgeVariants, badgeVariants } from './ui-badge.variants';
import { AnimatePresence } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

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
  ...motionProps
} = defineProps<BadgeProps>();

const displayValue = computed(() => {
  if (value < 1) return '';
  if (value > maxValue) return `${maxValue}+`;
  return `${value}`;
});
</script>

<template>
  <MotionComponent :as v-bind="motionProps" :class="badgeVariants.wrapper()">
    <slot />
    <AnimatePresence mode="wait">
      <MotionComponent
        v-if="value >= 0"
        as="span"
        :data-one-digit="value < 10"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{
          opacity: 1,
          scale: 1,
        }"
        :exit="{ opacity: 0, scale: 0 }"
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
            :initial="{ y: -20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :exit="{ y: 20, opacity: 0 }"
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
