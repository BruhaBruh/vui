<script setup lang="ts">
import { Slot } from '@/components/utility';
import { useModalState } from './ui-modal.context';

const { trigger, open, id } = useModalState();
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
