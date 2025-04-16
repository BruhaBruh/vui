<script setup lang="ts">
import { providePopoverState } from './ui-popover.context';

const open = defineModel<boolean>('open', { default: false });

providePopoverState({
  open,
});
</script>

<template>
  <slot />
</template>
