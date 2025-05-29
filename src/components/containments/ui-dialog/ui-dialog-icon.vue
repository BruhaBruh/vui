<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { transitionConfig } from '@/config';
import { dialogVariants } from './ui-dialog.variants';
import { Icon, type IconProps, MotionComponent } from '@/components/utility';

export type DialogIconProps = {
  icon: IconProps['icon'];
};

const { icon } = defineProps<DialogIconProps>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <AnimatePresence>
    <MotionComponent
      as-child
      :key="JSON.stringify(icon)"
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
      <Icon :icon />
    </MotionComponent>
  </AnimatePresence>
</template>
