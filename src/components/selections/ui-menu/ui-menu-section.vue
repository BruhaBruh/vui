<script setup lang="ts">
import { computed, onUnmounted, useId } from 'vue';
import { useMenuState } from './ui-menu.context';
import { menuVariants } from './ui-menu.variants';
import { Divider } from '@/components/containments';

export type MenuSectionProps = {
  label?: string;
};

const { label } = defineProps<MenuSectionProps>();

defineOptions({
  inheritAttrs: false,
});

const { collection, addToCollection, removeFromCollection } = useMenuState();

const id = useId();

const sectionId = `${id}-section`;

const showDivider = computed(() => collection.value[0] !== sectionId);

addToCollection(sectionId);

onUnmounted(() => {
  removeFromCollection(sectionId);
});
</script>

<template>
  <Divider v-if="showDivider" :class="menuVariants.divider()" />
  <li role="presentation" v-bind="$attrs">
    <ul
      :aria-label="label"
      :class="menuVariants.list({ withScroll: true })"
      v-tw-merge
    >
      <slot />
    </ul>
  </li>
</template>
