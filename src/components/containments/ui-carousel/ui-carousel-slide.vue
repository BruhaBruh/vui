<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { carouselVariants } from './ui-carousel.variants';

export type CarouselSlideProps = PropsPolymorphic;

const { as = 'div' } = defineProps<CarouselSlideProps>();
</script>

<template>
  <component :is="as" :class="carouselVariants.slide()" v-tw-merge>
    <slot />
  </component>
</template>
