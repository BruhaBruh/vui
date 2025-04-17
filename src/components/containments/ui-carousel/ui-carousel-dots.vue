<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { carouselVariants } from './ui-carousel.variants';
import { useCarouselState } from './ui-carousel.context';
import { ref, watchEffect } from 'vue';
import { IconCircleFilled } from '@tabler/icons-vue';

export type CarouselDotsProps = PropsPolymorphic & {
  label?: string;
};

const { label = 'Select slide', as = 'div' } = defineProps<CarouselDotsProps>();

const { api } = useCarouselState();

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
  <component :is="as" :class="carouselVariants.dotsContainer()" v-tw-merge>
    <button
      v-for="(_, index) in scrollSnaps"
      :key="index"
      @click="select(index)"
      tabindex="0"
      type="button"
      :aria-label="`${label} ${index + 1}`"
      :class="
        carouselVariants.dot({
          isSelected: selectedIndex === index,
        })
      "
      v-tw-merge
    >
      <slot>
        <IconCircleFilled />
      </slot>
    </button>
  </component>
</template>
