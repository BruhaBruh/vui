<script setup lang="ts">
import { carouselVariants } from './ui-carousel.variants';
import { useCarouselState } from './ui-carousel.context';
import { ref, watchEffect } from 'vue';
import { IconChevronLeft } from '@tabler/icons-vue';
import { IconButton, type IconButtonProps } from '@/components/actions';

export type CarouselPrevButtonProps = IconButtonProps;

const {
  color = 'secondary',
  variant = 'standard',
  ...props
} = defineProps<CarouselPrevButtonProps>();

const { api } = useCarouselState();

const disabled = ref(false);

function onSelect() {
  if (!api.value) return;
  disabled.value = !api.value.canScrollPrev();
}

function onClick() {
  if (!api.value) return;
  api.value.scrollPrev();
}

watchEffect(() => {
  onSelect();
  api.value?.on('reInit', onSelect).on('select', onSelect);
});
</script>

<template>
  <IconButton
    :color
    :variant
    :disabled
    aria-label="Previous slide"
    v-bind="props"
    :class="carouselVariants.arrowButton()"
    :animate="{ height: 'auto' }"
    @click="onClick()"
  >
    <slot>
      <IconChevronLeft />
    </slot>
  </IconButton>
</template>
