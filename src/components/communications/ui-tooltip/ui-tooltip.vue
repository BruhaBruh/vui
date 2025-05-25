<script setup lang="ts">
import { materialDuration } from '@/config';
import type { TooltipStateOptions } from './ui-tooltip.context';
import { provideTooltipState } from './ui-tooltip.context';

export type TooltipProps = {
  trigger?: TooltipStateOptions['trigger'];
  hideDelay?: TooltipStateOptions['hideDelay'];
  showDelay?: TooltipStateOptions['showDelay'];
};

const {
  trigger = 'both',
  hideDelay = materialDuration['short-2'],
  showDelay = materialDuration['long-2'],
} = defineProps<TooltipProps>();

const open = defineModel<boolean>('open', { default: false });

provideTooltipState({
  open,
  trigger: () => trigger,
  hideDelay: () => hideDelay,
  showDelay: () => showDelay,
});
</script>

<template>
  <slot />
</template>
