<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Teleport, type TeleportProps, useAttrs, watchEffect } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { useModalState } from './ui-modal.context';
import { modalVariants } from './ui-modal.variants';

export type ModalContentProps = PropsPolymorphic;

const { as = motion.div } = defineProps<ModalContentProps>();

defineOptions({
  inheritAttrs: false,
});

const { id } = useModalState();

const { id: idAttribute } = useAttrs();

watchEffect(() => {
  if (!idAttribute) return;
  id.value = `${idAttribute}`;
});
</script>

<template>
  <AnimatePresence mode="wait">
    <component
      :is="as"
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{
        duration: materialDuration.asMotion('medium-1'),
        ease: materialEasing.standard,
      }"
      :id
      :class="modalVariants()"
      @click.stop
      v-bind="$attrs"
      v-tw-merge
    >
      <slot />
    </component>
  </AnimatePresence>
</template>
