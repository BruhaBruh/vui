<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { transitionConfig } from '@/config';
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
      :initial="{
        width: 0,
        height: 0,
        opacity: 0,
        transition: transitionConfig.preset.short.enter.asMotion(),
      }"
      :animate="{
        width: 'var(--spacing-6)',
        height: 'var(--spacing-6)',
        opacity: 1,
        transition: transitionConfig.preset.short.beginEnd.asMotion(),
      }"
      :exit="{
        width: 0,
        height: 0,
        opacity: 0,
        transition: transitionConfig.preset.short.exit.asMotion(),
      }"
      v-bind="$attrs"
      :class="dialogVariants.icon()"
    >
      <slot />
    </MotionComponent>
  </AnimatePresence>
</template>
