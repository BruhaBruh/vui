<script setup lang="ts">
import { Slot } from '@/components/utility';
import { useTooltipState } from './ui-tooltip.context';

const { trigger, open, id } = useTooltipState();
</script>

<template>
  <Slot ref="trigger" :aria-describedby="open ? id : undefined">
    <slot />
  </Slot>
</template>
