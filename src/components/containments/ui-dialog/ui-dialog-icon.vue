<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { dialogVariants } from './ui-dialog.variants';
import { MotionComponent } from '@/components/utility';

export type DialogIconProps = {
  iconKey?: string;
};

const { iconKey } = defineProps<DialogIconProps>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <AnimatePresence>
    <MotionComponent
      as-child
      :key="iconKey"
      :initial="{ width: 0, height: 0, opacity: 0 }"
      :exit="{ width: 0, height: 0, opacity: 0 }"
      :animate="{
        width: 'var(--spacing-6)',
        height: 'var(--spacing-6)',
        opacity: 1,
      }"
      :transition="{
        duration: materialDuration.asMotion('medium-1'),
        ease: materialEasing.standard,
      }"
      v-bind="$attrs"
      :class="dialogVariants.icon()"
    >
      <slot />
    </MotionComponent>
  </AnimatePresence>
</template>
