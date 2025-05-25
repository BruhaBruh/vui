<script setup lang="ts">
import { transitionConfig } from '@/config';
import { type AsTag, Motion, type MotionProps } from 'motion-v';
import { Slot } from './slot';

export type MotionComponentProps = MotionProps<AsTag>;

const {
  as = 'div',
  asChild,
  transition = transitionConfig.preset.short.beginEnd.asMotion(),
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
