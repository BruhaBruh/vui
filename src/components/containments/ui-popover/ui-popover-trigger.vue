<script setup lang="ts">
import { useAttrs, watchEffect } from 'vue';
import { usePopoverState } from './ui-popover.context';
import { Slot } from '@/components/utility';

const { trigger, open, id } = usePopoverState();
</script>

<template>
  <Slot
    ref="trigger"
    :aria-expanded="open"
    :aria-controls="open ? id : undefined"
  >
    <slot />
  </Slot>
</template>
