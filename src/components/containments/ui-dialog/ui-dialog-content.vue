<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { transitionConfig } from '@/config';
import { dialogVariants } from './ui-dialog.variants';
import {
  ModalContent,
  ModalUnderlay,
  type ModalUnderlayProps,
} from '../ui-modal';
import { MotionComponent } from '@/components/utility';

export type DialogContentProps = PropsPolymorphic &
  Omit<ModalUnderlayProps, 'as'> & {
    underlayAs?: PropsPolymorphic['as'];
  };

const {
  as = 'div',
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
        <MotionComponent
          :as
          :initial="{
            opacity: 0,
            y: '25vh',
            transition: transitionConfig.preset.long.enter.asMotion(),
          }"
          :animate="{
            opacity: 1,
            y: 0,
            transition: transitionConfig.preset.long.beginEnd.asMotion(),
          }"
          :exit="{
            opacity: 0,
            y: '25vh',
            transition: transitionConfig.preset.long.exit.asMotion(),
          }"
          role="dialog"
          :class="dialogVariants()"
          v-bind="$attrs"
        >
          <slot name="icon" :close />
          <slot name="subhead" :close />
          <slot name="text" :close />
          <slot :close />
          <slot name="actions" :close />
        </MotionComponent>
      </template>
    </ModalContent>
  </ModalUnderlay>
</template>
