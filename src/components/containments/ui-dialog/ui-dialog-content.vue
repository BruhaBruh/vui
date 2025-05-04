<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { dialogVariants } from './ui-dialog.variants';
import {
  ModalContent,
  ModalUnderlay,
  type ModalUnderlayProps,
} from '../ui-modal';

export type DialogContentProps = PropsPolymorphic &
  Omit<ModalUnderlayProps, 'as'> & {
    underlayAs?: PropsPolymorphic['as'];
  };

const {
  as = motion.div,
  underlayAs,
  ...underlayProps
} = defineProps<DialogContentProps>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <ModalUnderlay :as="underlayAs" v-bind="underlayProps">
    <ModalContent>
      <template #default="{ close }">
        <component
          :is="as"
          :initial="{ opacity: 0, y: '100%', scaleX: 0 }"
          :animate="{ opacity: 1, y: 0, scaleX: 1 }"
          :exit="{ opacity: 0, y: '100%', scaleX: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
          role="dialog"
          :class="dialogVariants()"
          v-bind="$attrs"
          v-tw-merge
        >
          <slot name="icon" :close />
          <slot name="subhead" :close />
          <slot name="text" :close />
          <slot :close />
          <slot name="actions" :close />
        </component>
      </template>
    </ModalContent>
  </ModalUnderlay>
</template>
