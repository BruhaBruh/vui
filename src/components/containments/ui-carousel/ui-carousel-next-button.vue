<script setup lang="ts">
import { carouselVariants } from './ui-carousel.variants';
import { useCarouselState } from './ui-carousel.context';
import { ref, watchEffect } from 'vue';
import { IconButton, type IconButtonProps } from '@/components/actions';

export type CarouselNextButtonProps = IconButtonProps;

const {
  icon = 'tabler:chevron-right',
  color = 'secondary',
  variant = 'standard',
  ...props
} = defineProps<CarouselNextButtonProps>();

const { api } = useCarouselState();

const disabled = ref(false);

function onSelect() {
  if (!api.value) return;
  disabled.value = !api.value.canScrollNext();
}

function onClick() {
  if (!api.value) return;
  api.value.scrollNext();
}

watchEffect(() => {
  onSelect();
  api.value?.on('reInit', onSelect).on('select', onSelect);
});
</script>

<template>
  <IconButton
    :icon
    :color
    :variant
    :disabled
    aria-label="Next slide"
    v-bind="props"
    :class="carouselVariants.arrowButton()"
    :animate="{ height: 'auto' }"
    @click="onClick()"
  />
</template>
