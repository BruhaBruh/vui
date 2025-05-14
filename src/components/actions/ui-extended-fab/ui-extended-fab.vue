<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { MotionPropsPolymorphic } from '@/types';
import { AnimatePresence, Motion, motion } from 'motion-v';
import { computed, useTemplateRef } from 'vue';
import {
  type ExtendedFabVariants,
  extendedFabVariants,
} from './ui-extended-fab.variants';
import { Slot } from '@/components/utility';
import {
  extendedFabIconMargin,
  extendedFabIconSize,
} from './ui-extended-fab.options';

export type ExtendedFabProps = MotionPropsPolymorphic & {
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
</script>

<template>
  <Motion
    as-child
    :transition="{
      duration: materialDuration.asMotion('medium-1'),
      ease: materialEasing.standard,
    }"
  >
    <component
      :is="as"
      ref="extended-fab"
      tabindex="0"
      :class="extendedFabVariants(variants)"
      v-tw-merge
    >
      <AnimatePresence mode="wait">
        <Motion
          as-child
          v-if="$slots.icon"
          :key="iconKey"
          :initial="{ width: 0, height: 0, marginRight: 0 }"
          :animate="{
            width: extendedFabIconSize[size],
            height: extendedFabIconSize[size],
            marginRight: extendedFabIconMargin[size],
          }"
          :exit="{ width: 0, height: 0, marginRight: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
        >
          <Slot :class="extendedFabVariants.icon(variants)" v-tw-merge>
            <slot name="icon" />
          </Slot>
        </Motion>
      </AnimatePresence>
      <motion.span
        :initial="{ width: 0, opacity: 0 }"
        :exit="{ width: 0, opacity: 0 }"
        :animate="{
          width: 'max-content',
          opacity: 1,
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="extendedFabVariants.label(variants)"
        v-tw-merge
      >
        <slot />
      </motion.span>
    </component>
  </Motion>
</template>
