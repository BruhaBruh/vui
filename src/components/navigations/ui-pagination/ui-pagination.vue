<script setup lang="ts">
import { paginationVariants } from './ui-pagination.variants';
import { computed, nextTick, useId, useTemplateRef, watchEffect } from 'vue';
import { IconButton } from '@/components/actions';
import type { PropsPolymorphic } from '@/types';
import { useFocusWithin } from '@vueuse/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';
import { calculatePages } from './ui-pagination.utility';

export type PaginationProps = PropsPolymorphic & {
  pageAmount?: number;
  pagesToView?: number;
};

const {
  pageAmount = 1,
  pagesToView = 5,
  as = 'div',
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

addEventListener('keydown', async (e) => {
  if (!focused.value) return;
  if (['ArrowLeft', 'ArrowDown'].includes(e.key)) {
    previousPage();
  } else if (['ArrowRight', 'ArrowUp'].includes(e.key)) {
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
</script>

<template>
  <component
    :is="as"
    ref="pagination"
    role="radiogroup"
    :class="paginationVariants()"
    v-tw-merge
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
      :id="`pagination-page-${p}`"
      :selected="page === p"
      :page="p"
      @click="selectPage(p)"
    >
      <IconButton
        :id="`${id}-p-${p}`"
        variant="tonal"
        toggleable
        ignore-select-behavior
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
  </component>
</template>
