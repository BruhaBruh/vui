<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import {
  type ContainerContentVariants,
  containerVariants,
} from './ui-container.variants';
import { MotionComponent } from '@/components/utility';

export type ContainerContentProps = PropsPolymorphic & {
  variant?: ContainerContentVariants['variant'];
  padding?: ContainerContentVariants['padding'];
  fluid?: ContainerContentVariants['fluid'];
};

const {
  variant,
  padding,
  fluid,
  as = 'div',
} = defineProps<ContainerContentProps>();
</script>

<template>
  <MotionComponent
    :as
    :class="containerVariants.content({ variant, padding, fluid })"
    v-tw-merge
  >
    <slot />
  </MotionComponent>
</template>
