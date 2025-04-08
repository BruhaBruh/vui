<script setup lang="ts">
import type { TooltipStateOptions } from './ui-tooltip.context';
import { provideTooltipState } from './ui-tooltip.context';

export type TooltipProps = TooltipStateOptions;

const options = defineProps<TooltipProps>();

const open = defineModel<boolean>('open', { default: false });

provideTooltipState(open, options);
</script>

<template>
  <slot />
</template>
