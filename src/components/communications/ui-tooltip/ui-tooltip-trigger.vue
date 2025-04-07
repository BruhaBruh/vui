<script setup lang="ts">
import { Slot } from '@/components/utility';
import { useTooltipState } from './ui-tooltip.context';

const { trigger } = useTooltipState();
</script>

<template>
  <Slot ref="trigger">
    <slot />
  </Slot>
</template>
