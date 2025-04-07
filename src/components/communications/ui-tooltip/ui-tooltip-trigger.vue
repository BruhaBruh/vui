<script setup lang="ts">
import { Slot } from '@/components/utility';
import { useTooltipState } from './ui-tooltip.context';
import { useElementHover } from '@vueuse/core';
import { watchEffect } from 'vue';

const { trigger, open } = useTooltipState();

const isHovered = useElementHover(trigger);

watchEffect(() => {
  open.value = isHovered.value;
});
</script>

<template>
  <Slot ref="trigger">
    <slot />
  </Slot>
</template>
