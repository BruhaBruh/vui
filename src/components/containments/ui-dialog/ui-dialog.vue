<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { dialogVariants } from './ui-dialog.variants';

export type DialogProps = PropsPolymorphic;

const { as = motion.div } = defineProps<DialogProps>();
</script>

<template>
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
    v-tw-merge
  >
    <slot name="icon" />
    <slot name="subhead" />
    <slot name="text" />
    <slot />
    <slot name="actions" />
  </component>
</template>
