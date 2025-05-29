<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { breadcrumbsVariants } from './ui-breadcrumbs.variants';
import { useBreadcrumbsState } from './ui-breadcrumbs.context';
import { computed } from 'vue';
import { Icon } from '@/components/utility';

export type BreadcrumbsItemProps = PropsPolymorphic & {
  value: string;
};

const { value, as = 'span' } = defineProps<BreadcrumbsItemProps>();

defineOptions({
  inheritAttrs: false,
});

const { active, size, currentVariant } = useBreadcrumbsState();

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
    <Icon
      icon="tabler:chevron-right"
      :class="breadcrumbsVariants.icon({ size })"
    />
  </li>
</template>
