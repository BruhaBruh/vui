<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { MotionComponent } from '@/components/utility';
import { navigationRailVariants } from './ui-navigation-rail.variants';
import { computed } from 'vue';

export type NavigationRailProps = PropsPolymorphic & {
  modal?: boolean;
  expanded?: boolean;
};

const { modal, expanded, as = 'div' } = defineProps<NavigationRailProps>();

const variants = computed(() => ({ modal, expanded }));
</script>

<template>
  <MotionComponent :as :class="navigationRailVariants(variants)">
    <div
      v-if="$slots.menu || $slots.fab"
      :class="navigationRailVariants.menuFab()"
      v-tw-merge
    >
      <slot name="menu" />
      <slot name="fab" />
    </div>
    <div :class="navigationRailVariants.items(variants)" v-tw-merge>
      <slot :expanded />
    </div>
  </MotionComponent>
</template>
