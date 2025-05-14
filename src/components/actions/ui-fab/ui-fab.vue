<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
import { materialDuration, materialEasing } from '@/config';
import type { MotionPropsPolymorphic } from '@/types';
import { AnimatePresence, Motion } from 'motion-v';
import { computed, useTemplateRef } from 'vue';
import { type FabVariants, fabVariants } from './ui-fab.variants';
import { fabIconSize } from './ui-fab.options';
import { Slot } from '@/components/utility';

export type FabProps = MotionPropsPolymorphic & {
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
  <Motion
    as-child
    :transition="{
      duration: materialDuration.asMotion('medium-1'),
      ease: materialEasing.standard,
    }"
  >
    <component
      :is="as"
      ref="fab"
      tabindex="0"
      :class="fabVariants(variants)"
      v-tw-merge
    >
      <AnimatePresence mode="wait">
        <Motion
          as-child
          :key="iconKey"
          :initial="{ width: 0, height: 0 }"
          :animate="{
            width: fabIconSize[size],
            height: fabIconSize[size],
          }"
          :exit="{ width: 0, height: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
        >
          <Slot :class="fabVariants.icon(variants)" v-tw-merge>
            <slot />
          </Slot>
        </Motion>
      </AnimatePresence>
    </component>
  </Motion>
</template>
