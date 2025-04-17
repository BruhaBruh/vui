<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Teleport, type TeleportProps, useAttrs, watchEffect } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { useModalState } from './ui-modal.context';
import { modalVariants } from './ui-modal.variants';

export type ModalUnderlayProps = PropsPolymorphic & {
  teleportTo?: TeleportProps['to'];
  teleportDisabled?: TeleportProps['disabled'];
  teleportDefer?: TeleportProps['defer'];
};

const {
  as = motion.div,
  teleportTo = 'body',
  teleportDisabled,
  teleportDefer,
} = defineProps<ModalUnderlayProps>();

defineOptions({
  inheritAttrs: false,
});

const { open, modal } = useModalState();
</script>

<template>
  <Teleport
    :to="teleportTo"
    :disabled="teleportDisabled"
    :defer="teleportDefer"
  >
    <AnimatePresence mode="wait">
      <component
        :is="as"
        v-if="open"
        ref="modal"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="modalVariants.underlay()"
        @click="open = false"
        v-bind="$attrs"
        v-tw-merge
      >
        <slot />
      </component>
    </AnimatePresence>
  </Teleport>
</template>
