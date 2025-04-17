<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { useCarouselState } from './ui-carousel.context';
import { carouselVariants } from './ui-carousel.variants';

export type CarouselViewProps = PropsPolymorphic;

const { as = 'div' } = defineProps<CarouselViewProps>();

defineOptions({
  inheritAttrs: false,
});

const { carousel } = useCarouselState();
</script>

<template>
  <slot name="left" />
  <component
    :is="as"
    ref="carousel"
    v-bind="$attrs"
    :class="carouselVariants.view()"
    v-tw-merge
  >
    <div :class="carouselVariants.viewContainer()" v-tw-merge>
      <slot />
    </div>
  </component>
  <slot name="right" />
</template>
