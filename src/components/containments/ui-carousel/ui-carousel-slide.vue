<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { carouselVariants } from './ui-carousel.variants';
import { useCarouselState } from './ui-carousel.context';

export type CarouselSlideProps = PropsPolymorphic & {
  index: number;
};

const { index, as = 'div' } = defineProps<CarouselSlideProps>();

const { id } = useCarouselState();
</script>

<template>
  <component
    :is="as"
    :class="carouselVariants.slide()"
    :id="`${id}-slide-${index}`"
    role="group"
    aria-roledescription="slide"
    v-tw-merge
  >
    <slot />
  </component>
</template>
