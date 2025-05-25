<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { dialogVariants } from './ui-dialog.variants';

export type DialogActionsProps = PropsPolymorphic;

const { as = 'div' } = defineProps<DialogActionsProps>();
</script>

<template>
  <component :is="as" :class="dialogVariants.actions()" v-tw-merge>
    <slot />
  </component>
</template>
