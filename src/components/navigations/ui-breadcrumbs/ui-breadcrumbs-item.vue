<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { breadcrumbsVariants } from './ui-breadcrumbs.variants';
import { IconChevronRight } from '@tabler/icons-vue';
import { useBreadcrumbsState } from './ui-breadcrumbs.context';
import { computed } from 'vue';

export type BreadcrumbsItemProps = PropsPolymorphic & {
  value: string;
  currentVariant?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
};

const {
  value,
  currentVariant = 'page',
  as = 'span',
} = defineProps<BreadcrumbsItemProps>();

defineOptions({
  inheritAttrs: false,
});

const { active, size } = useBreadcrumbsState();

const isActive = computed(() => active.value === value);
</script>

<template>
  <li>
    <component
      :is="as"
      :aria-current="isActive ? currentVariant : undefined"
      :class="breadcrumbsVariants.item({ isActive, size })"
      v-bind="$attrs"
      v-tw-merge
    >
      <slot />
    </component>
  </li>
  <li aria-hidden class="last:hidden">
    <IconChevronRight :class="breadcrumbsVariants.icon({ size })" />
  </li>
</template>
