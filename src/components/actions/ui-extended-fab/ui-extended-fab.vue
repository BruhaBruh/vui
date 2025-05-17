<script setup lang="ts">
import { useButton, useRipple } from '@/composables';
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
</script>

<template>
  <MotionComponent
    ref="extended-fab"
    :as
    tabindex="0"
    v-bind="motionProps"
    :class="extendedFabVariants(variants)"
  >
    <AnimatePresence mode="wait">
      <MotionComponent
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
        :class="extendedFabVariants.icon(variants)"
      >
        <slot name="icon" />
      </MotionComponent>
    </AnimatePresence>
    <MotionComponent
      as="span"
      :initial="{ width: 0, opacity: 0 }"
      :exit="{ width: 0, opacity: 0 }"
      :animate="{
        width: 'max-content',
        opacity: 1,
      }"
      :class="extendedFabVariants.label(variants)"
    >
      <slot />
    </MotionComponent>
  </MotionComponent>
</template>
