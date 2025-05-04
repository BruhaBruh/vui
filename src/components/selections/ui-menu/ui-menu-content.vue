<script setup lang="ts">
import {
  PopoverContent,
  type PopoverContentProps,
} from '@/components/containments';
import { materialDuration, materialEasing } from '@/config';
import type { PropsPolymorphic } from '@/types';
import { motion } from 'motion-v';
import { menuVariants } from './ui-menu.variants';
import { provideMenuState } from './ui-menu.context';
import type { MenuStateOptions } from './ui-menu.context';
import { onUnmounted } from 'vue';

export type MenuContentProps = PropsPolymorphic &
  Omit<PopoverContentProps, 'as'> & {
    contentAs?: PropsPolymorphic['as'];
    selectionMode?: MenuStateOptions['selectionMode'];
    disabledValues?: MenuStateOptions['disabledValues'];
  };

const {
  as = motion.div,
  selectionMode = 'none',
  disabledValues = [],
  contentAs,
  placement = 'bottom',
  offset = 4,
  ...contentProps
} = defineProps<MenuContentProps>();

defineOptions({
  inheritAttrs: false,
});

const selectedValues = defineModel<MenuStateOptions['selectedValues']>(
  'selected',
  {
    default: [],
  },
);

const { triggerId, clearCollection } = provideMenuState({
  selectionMode: () => selectionMode,
  disabledValues: () => disabledValues,
  selectedValues,
});

onUnmounted(clearCollection);
</script>

<template>
  <PopoverContent :as="contentAs" :placement :offset v-bind="contentProps">
    <component
      :is="as"
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0 }"
      :transition="{
        duration: materialDuration.asMotion('medium-1'),
        ease: materialEasing.standard,
      }"
      :class="menuVariants()"
      v-bind="$attrs"
      v-tw-merge
    >
      <ul
        :aria-labelledby="triggerId"
        role="menu"
        tabindex="-1"
        :class="menuVariants.list()"
        v-tw-merge
      >
        <slot />
      </ul>
    </component>
  </PopoverContent>
</template>
