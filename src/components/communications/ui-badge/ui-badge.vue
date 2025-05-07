<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { computed } from 'vue';
import { type BadgeVariants, badgeVariants } from './ui-badge.variants';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';

export type BadgeProps = PropsPolymorphic & {
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
} = defineProps<BadgeProps>();

const displayValue = computed(() => {
  if (value < 1) return '';
  if (value > maxValue) return `${maxValue}+`;
  return `${value}`;
});
</script>

<template>
  <component :is="as" :class="badgeVariants.wrapper()" v-tw-merge>
    <slot />
    <AnimatePresence mode="wait">
      <motion.span
        v-if="value >= 0"
        :data-one-digit="value < 10"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{
          opacity: 1,
          scale: 1,
        }"
        :exit="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="
          badgeVariants({
            size: value < 1 ? 'small' : 'large',
            color,
            placement,
          })
        "
        v-tw-merge
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            v-for="(char, i) in displayValue.split('')"
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
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </AnimatePresence>
  </component>
</template>
