<script setup lang="ts">
import { materialDuration, materialEasing } from '@/config';
import { type AsTag, Motion, type MotionProps } from 'motion-v';
import { Slot } from './slot';

export type MotionComponentProps = MotionProps<AsTag>;

const {
  as = 'div',
  asChild,
  transition = {
    duration: materialDuration.asMotion('medium-1'),
    ease: materialEasing.standard,
  },
  ...props
} = defineProps<MotionComponentProps>();
</script>

<template>
  <Motion as-child :transition v-bind="props" v-tw-merge>
    <Slot>
      <slot v-if="asChild" />
      <component v-else :is="as">
        <slot />
      </component>
    </Slot>
  </Motion>
</template>
