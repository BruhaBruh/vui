<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { AnimatePresence } from 'motion-v';
import { computed, useTemplateRef } from 'vue';
import { type FabVariants, fabVariants } from './ui-fab.variants';
import { fabIconSize } from './ui-fab.options';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type FabProps = Omit<MotionComponentProps, 'asChild'> & {
  size?: FabVariants['size'];
  variant?: FabVariants['variant'];
  color?: FabVariants['color'];
  iconKey?: string;
};

const {
  size = 'sm',
  variant = 'filled',
  color = 'primary',
  as = 'button',
  iconKey,
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
</script>

<template>
  <MotionComponent
    ref="fab"
    :as
    tabindex="0"
    v-bind="motionProps"
    :class="fabVariants(variants)"
  >
    <AnimatePresence mode="wait">
      <MotionComponent
        as-child
        :key="iconKey"
        :initial="{ width: 0, height: 0 }"
        :animate="{
          width: fabIconSize[size],
          height: fabIconSize[size],
        }"
        :exit="{ width: 0, height: 0 }"
        :class="fabVariants.icon(variants)"
      >
        <slot />
      </MotionComponent>
    </AnimatePresence>
  </MotionComponent>
</template>
