<script setup lang="ts">
import { provideTooltipState } from './ui-tooltip.context';

const open = defineModel<boolean>('open', { default: false });

provideTooltipState(open);
</script>

<template>
  <slot />
</template>
