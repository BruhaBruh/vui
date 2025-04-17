<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Teleport, type TeleportProps } from 'vue';
import { AnimatePresence } from 'motion-v';
import { useModalState } from './ui-modal.context';
import { modalVariants } from './ui-modal.variants';

export type ModalUnderlayProps = PropsPolymorphic & {
  teleportTo?: TeleportProps['to'];
  teleportDisabled?: TeleportProps['disabled'];
  teleportDefer?: TeleportProps['defer'];
};

const {
  as = 'div',
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
