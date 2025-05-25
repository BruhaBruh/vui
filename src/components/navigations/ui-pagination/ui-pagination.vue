<script setup lang="ts">
import { paginationVariants } from './ui-pagination.variants';
import { computed, nextTick, useId, useTemplateRef, watchEffect } from 'vue';
import { IconButton } from '@/components/actions';
import { useEventListener, useFocusWithin } from '@vueuse/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';
import { calculatePages } from './ui-pagination.utility';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import { computedVariants } from '@/composables';
import { transitionConfig } from '@/config';

export type PaginationProps = MotionComponentProps & {
  pageAmount?: number;
  pagesToView?: number;
};

const {
  pageAmount = 1,
  pagesToView = 5,
  as = 'div',
  initial,
  animate,
  exit,
  ...motionProps
} = defineProps<PaginationProps>();

const elementRef = useTemplateRef<HTMLElement>('pagination');

const page = defineModel<number>('page', {
  default: 1,
});

const id = useId();
const pages = computed(() =>
  calculatePages({ page: page.value, pageAmount, pagesToView }),
);
const hasPrevious = computed(() => page.value > 1);
const hasNext = computed(() => page.value < pageAmount);
const { focused } = useFocusWithin(elementRef);

watchEffect(() => {
  const isLowerThanMinPage = page.value < 1;
  const isHigherThanMaxPage = page.value > pageAmount;

  if (isLowerThanMinPage && isHigherThanMaxPage) return;
  if (isLowerThanMinPage) {
    page.value = 1;
  } else if (isHigherThanMaxPage) {
    page.value = pageAmount;
  }
});

function selectPage(newPage: number) {
  const isLowerThanMinPage = newPage < 1;
  const isHigherThanMaxPage = newPage > pageAmount;

  if (isLowerThanMinPage && isHigherThanMaxPage) return;
  if (isLowerThanMinPage) {
    page.value = 1;
  } else if (isHigherThanMaxPage) {
    page.value = pageAmount;
  } else {
    page.value = newPage;
  }
}

function nextPage() {
  if (!hasNext.value) return;
  page.value = page.value + 1;
}

function previousPage() {
  if (!hasPrevious.value) return;
  page.value = page.value - 1;
}

useEventListener('keydown', async (e) => {
  if (!focused.value) return;
  if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
    previousPage();
  } else if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
    nextPage();
  } else {
    return;
  }
  await nextTick();
  const currentPageButton = document.querySelector(
    `#${id}-p-${page.value}`,
  ) as HTMLElement | null;
  currentPageButton?.focus();
});

const {
  initial: initialObject,
  animate: animateObject,
  exit: exitObject,
} = computedVariants(() => ({
  initial,
  animate,
  exit,
}));
</script>

<template>
  <MotionComponent
    :as
    ref="pagination"
    role="radiogroup"
    v-bind="motionProps"
    :initial="{
      transition: transitionConfig.preset.short.enter.asMotion(),
      ...initialObject,
    }"
    :animate="{
      transition: transitionConfig.preset.short.beginEnd.asMotion(),
      ...animateObject,
    }"
    :exit="{
      transition: transitionConfig.preset.short.exit.asMotion(),
      ...exitObject,
    }"
    :class="paginationVariants()"
  >
    <slot name="previous" :disabled="!hasPrevious" @click="previousPage()">
      <IconButton
        aria-label="Previous page"
        variant="tonal"
        :disabled="!hasPrevious"
        @click="previousPage()"
      >
        <IconChevronLeft />
      </IconButton>
    </slot>
    <slot
      v-for="p in pages"
      :key="p"
      :id="`${id}-page-${p}`"
      :selected="page === p"
      :page="p"
      @click="selectPage(p)"
    >
      <IconButton
        :id="`${id}-p-${p}`"
        variant="tonal"
        toggleable
        :selected="page === p"
        role="radio"
        :aria-checked="page === p"
        :tabindex="page === p ? 0 : -1"
        @click="selectPage(p)"
      >
        <span :class="paginationVariants.buttonText()" v-tw-merge>
          {{ p }}
        </span>
      </IconButton>
    </slot>
    <slot name="next" :disabled="!hasNext" @click="nextPage()">
      <IconButton
        aria-label="Next page"
        variant="tonal"
        :disabled="!hasNext"
        @click="nextPage()"
      >
        <IconChevronRight />
      </IconButton>
    </slot>
  </MotionComponent>
</template>
