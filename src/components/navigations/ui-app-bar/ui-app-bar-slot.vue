<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { appBarVariants } from './ui-app-bar.variants';
import { MotionComponent } from '@/components/utility';

export type AppBarSlotProps = PropsPolymorphic;

const { as = 'div' } = defineProps<AppBarSlotProps>();
</script>

<template>
  <MotionComponent :as :class="appBarVariants.slot()">
    <slot />
  </MotionComponent>
</template>
