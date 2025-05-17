<script setup lang="ts">
import {
  type ContainerVariants,
  containerVariants,
} from './ui-container.variants';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type ContainerProps = MotionComponentProps & {
  color?: ContainerVariants['color'];
};

const { color, as = 'div', ...motionProps } = defineProps<ContainerProps>();
</script>

<template>
  <MotionComponent
    :as
    v-bind="motionProps"
    :class="containerVariants({ color })"
  >
    <slot />
  </MotionComponent>
</template>
