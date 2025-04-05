<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import type { VariantProps } from 'class-variance-authority';
import { computed } from 'vue';
import { badgeVariants } from './ui-badge.variants';

type Variants = VariantProps<typeof badgeVariants>;

export type BadgeProps = PropsPolymorphic & {
  color?: Variants['color'];
  placement?: Variants['placement'];
  value?: number;
  maxValue?: number;
};

const {
  color,
  placement,
  value = 0,
  maxValue = 999,
  as = 'span',
} = defineProps<BadgeProps>();

const displayValue = computed(() => {
  if (value < 1) return '';
  if (value > maxValue) return `${maxValue}+`;
  return value;
});
</script>

<template>
  <component :is="as" class="relative" v-tw-merge>
    <slot />
    <span
      v-if="value >= 0"
      :data-one-digit="value < 10"
      :class="
        badgeVariants({
          size: value < 1 ? 'small' : 'large',
          color,
          placement,
        })
      "
      v-tw-merge
    >
      {{ displayValue }}
    </span>
  </component>
</template>
