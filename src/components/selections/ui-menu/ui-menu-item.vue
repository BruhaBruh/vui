<script setup lang="ts">
import { computed, onUnmounted, useId, useTemplateRef } from 'vue';
import { useMenuState } from './ui-menu.context';
import { menuVariants } from './ui-menu.variants';
import { useInteractions, useRipple } from '@/composables';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { IconCheck } from '@tabler/icons-vue';

export type MenuItemProps = {
  value: string;
  emptyLeftIcon?: boolean;
  leftKey?: string;
  rightKey?: string;
};

const { value, emptyLeftIcon, leftKey, rightKey } =
  defineProps<MenuItemProps>();

const {
  selectionMode,
  selectedValues,
  disabledValues,
  focusedId,
  addToCollection,
  removeFromCollection,
  toggleSelect,
} = useMenuState();

const elementRef = useTemplateRef<HTMLElement>('menu-item');

const id = useId();

const isSelected = computed(() => selectedValues.value.includes(value));
const isDisabled = computed(() => disabledValues.value.includes(value));

addToCollection(id);

onUnmounted(() => {
  removeFromCollection(id);
});

const role = computed(() => {
  if (selectionMode.value === 'multiple') return 'menuitemcheckbox';
  if (selectionMode.value === 'single') return 'menuitemradio';
  return 'menuitem';
});

useInteractions(elementRef);
useRipple(elementRef);
</script>

<template>
  <li
    :id
    ref="menu-item"
    :tabindex="focusedId === id ? 0 : -1"
    :role
    :aria-checked="selectionMode !== 'none' ? isSelected : undefined"
    :aria-disabled="isDisabled"
    :data-value="value"
    :class="menuVariants.item({ isSelected })"
    @focus="focusedId = id"
    @blur="focusedId = null"
    @click="toggleSelect(value)"
    v-tw-merge
  >
    <AnimatePresence mode="sync">
      <motion.span
        :key="`${leftKey}-${emptyLeftIcon}-${isSelected}`"
        v-if="emptyLeftIcon || $slots.left || isSelected"
        :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
        :animate="{
          width: 'var(--spacing-6)',
          height: 'var(--spacing-6)',
          opacity: 1,
          marginRight: 'var(--spacing-sm)',
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="[menuVariants.icon({ position: 'left' }), 'menu--left-icon']"
        v-tw-merge
      >
        <IconCheck v-if="isSelected" />
        <slot name="left" v-else />
      </motion.span>
    </AnimatePresence>
    <span :class="menuVariants.label()" v-tw-merge>
      <slot />
    </span>
    <AnimatePresence mode="sync">
      <motion.span
        :key="rightKey"
        v-if="$slots.right"
        :initial="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
        :exit="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
        :animate="{
          width: 'var(--spacing-6)',
          height: 'var(--spacing-6)',
          opacity: 1,
          marginLeft: 'var(--spacing-sm)',
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="[menuVariants.icon({ position: 'right' }), 'menu--right-icon']"
        v-tw-merge
      >
        <slot name="right" />
      </motion.span>
    </AnimatePresence>
  </li>
</template>
