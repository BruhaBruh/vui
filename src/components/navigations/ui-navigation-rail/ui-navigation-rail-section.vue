<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { MotionComponent } from '@/components/utility';
import { navigationRailVariants } from './ui-navigation-rail.variants';
import { computed } from 'vue';

export type NavigationRailSectionProps = PropsPolymorphic & {
  expanded?: boolean;
};

const { expanded, as = 'div' } = defineProps<NavigationRailSectionProps>();

const variants = computed(() => ({ expanded }));
</script>

<template>
  <MotionComponent :as :class="navigationRailVariants.section(variants)">
    <p
      v-if="expanded && $slots.header"
      :class="navigationRailVariants.sectionHeader()"
      v-tw-merge
    >
      <slot name="header" />
    </p>
    <slot />
  </MotionComponent>
</template>
