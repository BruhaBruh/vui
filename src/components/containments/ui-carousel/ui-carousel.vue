<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import type {
  EmblaCarouselApi,
  EmblaOptions,
  EmblaPlugin,
} from '@/composables';
import { provideCarouselState } from './ui-carousel.context';
import { carouselVariants } from './ui-carousel.variants';

export type CarouselProps = PropsPolymorphic & {
  options?: EmblaOptions;
  plugins?: EmblaPlugin[];
};

const { as = 'div', options = {}, plugins = [] } = defineProps<CarouselProps>();

const api = defineModel<EmblaCarouselApi | undefined>('api', {
  default: undefined,
});

provideCarouselState({
  api,
  options: () => options,
  plugins: () => plugins,
});
</script>

<template>
  <component
    :is="as"
    :class="carouselVariants()"
    aria-roledescription="carousel"
    v-tw-merge
  >
    <slot name="before" />
    <div :class="carouselVariants.container()" v-tw-merge>
      <slot />
    </div>
    <slot name="after" />
  </component>
</template>
