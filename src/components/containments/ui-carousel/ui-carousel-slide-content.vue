<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { carouselVariants } from './ui-carousel.variants';

export type CarouselSlideContentProps = PropsPolymorphic;

const { as = 'div' } = defineProps<CarouselSlideContentProps>();
</script>

<template>
  <component :is="as" :class="carouselVariants.slideContent()" v-tw-merge>
    <slot />
  </component>
</template>
