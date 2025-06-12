<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { gridVariants } from './ui-grid.variants';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/communications';

export type GridCellProps = PropsPolymorphic & {
  tooltip?: boolean;
  unwrap?: boolean;
};

const { tooltip, unwrap, as = 'div' } = defineProps<GridCellProps>();
</script>

<template>
  <component :is="as" :class="gridVariants.cell()" v-tw-merge>
    <slot name="before" />
    <template v-if="tooltip">
      <Tooltip trigger="hover">
        <TooltipTrigger>
          <template v-if="unwrap">
            <slot />
          </template>
          <span v-else :class="gridVariants.label()" v-tw-merge>
            <slot />
          </span>
        </TooltipTrigger>
        <TooltipContent placement="top">
          <slot name="tooltip-label">
            <slot />
          </slot>
        </TooltipContent>
      </Tooltip>
    </template>
    <template v-else>
      <template v-if="unwrap">
        <slot />
      </template>
      <span v-else :class="gridVariants.label()" v-tw-merge>
        <slot />
      </span>
    </template>
    <slot name="after" />
  </component>
</template>
