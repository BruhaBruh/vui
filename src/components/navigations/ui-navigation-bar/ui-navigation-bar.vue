<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { navigationBarVariants } from './ui-navigation-bar.variants';

export type NavigationBarProps = PropsPolymorphic & {};

const { as = 'div' } = defineProps<NavigationBarProps>();
</script>

<template>
  <component :is="as" :class="navigationBarVariants()" v-tw-merge>
    <div :class="navigationBarVariants.content()" v-tw-merge>
      <slot />
    </div>
  </component>
</template>
