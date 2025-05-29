<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { carouselVariants } from './ui-carousel.variants';
import { useCarouselState } from './ui-carousel.context';
import { ref, watchEffect } from 'vue';
import { Icon } from '@/components/utility';

export type CarouselDotsProps = PropsPolymorphic & {
  label?: string;
};

const { label = 'Slide', as = 'div' } = defineProps<CarouselDotsProps>();

const { id, api } = useCarouselState();

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);

function onInit() {
  if (!api.value) return;
  scrollSnaps.value = api.value.scrollSnapList();
}
function onSelect() {
  if (!api.value) return;
  selectedIndex.value = api.value.selectedScrollSnap();
}

function select(index: number) {
  if (!api.value) return;
  api.value.scrollTo(index);
}

watchEffect(() => {
  onInit();
  onSelect();
  api.value?.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
});
</script>

<template>
  <component
    :is="as"
    :class="carouselVariants.dotsContainer()"
    role="tablist"
    aria-label="Slides"
    v-tw-merge
  >
    <button
      v-for="(_, index) in scrollSnaps"
      :key="index"
      @click="select(index)"
      type="button"
      :aria-label="`${label} ${index + 1}`"
      role="tab"
      :aria-selected="selectedIndex === index"
      :tabindex="selectedIndex === index ? undefined : -1"
      :aria-controls="`${id}-slide-${index}`"
      :class="
        carouselVariants.dot({
          isSelected: selectedIndex === index,
        })
      "
      v-tw-merge
    >
      <slot>
        <Icon icon="tabler:circle-filled" />
      </slot>
    </button>
  </component>
</template>
