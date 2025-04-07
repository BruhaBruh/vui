<script setup lang="ts">
import type { TooltipStateOptions } from './ui-tooltip.context';
import { provideTooltipState } from './ui-tooltip.context';

const options = defineProps<TooltipStateOptions>();

const open = defineModel<boolean>('open', { default: false });

provideTooltipState(open, options);
</script>

<template>
  <slot />
</template>
