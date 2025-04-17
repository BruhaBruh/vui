import type {
  EmblaCarouselApi,
  EmblaOptions,
  EmblaPlugin,
} from '@/composables';
import {
  useCarousel,
} from '@/composables';
import type { Context } from '@/types';
import { toRef } from '@vueuse/core';
import type { InjectionKey, Ref } from 'vue';
import { inject, provide, watchEffect } from 'vue';

type CarouselContext = Context<
  {
    api: Ref<EmblaCarouselApi | undefined>;
    carousel: Ref<HTMLElement | undefined>;
  },
  {
    api: EmblaCarouselApi | undefined;
    options: EmblaOptions;
    plugins: EmblaPlugin[];
  }
>;

export type CarouselState = CarouselContext['state'];

export type CarouselStateOptions = CarouselContext['options'];

const carouselStateKey = Symbol() as InjectionKey<CarouselState>;

export function provideCarouselState(
  options: CarouselContext['provideOptions'],
) {
  const api = toRef(options.api);

  const { ref: carousel, api: carouselApi } = useCarousel({
    options: options.options,
    plugins: options.plugins,
  });

  watchEffect(() => {
    api.value = carouselApi.value;
  });

  const state: CarouselState = {
    api,
    carousel,
  };

  provide(carouselStateKey, state);

  return state;
}

export function useCarouselState() {
  const state = inject(carouselStateKey);

  if (!state) {
    throw new Error(
      'useCarouselState must be used within a Carousel component',
    );
  }

  return state;
}
