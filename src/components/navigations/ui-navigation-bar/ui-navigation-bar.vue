<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { navigationBarVariants } from './ui-navigation-bar.variants';
import { useTemplateRef } from 'vue';
import { useInteractions } from '@/composables';

export type NavigationBarProps = PropsPolymorphic & {};

const { as = 'div' } = defineProps<NavigationBarProps>();

const elementRef = useTemplateRef<HTMLElement>('navigation-bar');

useInteractions(elementRef);
</script>

<template>
  <component
    ref="navigation-bar"
    :is="as"
    :class="navigationBarVariants()"
    v-tw-merge
  >
    <div :class="navigationBarVariants.content()" v-tw-merge>
      <slot />
    </div>
  </component>
</template>
