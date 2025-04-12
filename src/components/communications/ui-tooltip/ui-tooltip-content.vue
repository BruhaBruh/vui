<script setup lang="ts">
import { useTooltipState } from './ui-tooltip.context';
import type { PropsPolymorphic } from '@/types';
import { tooltipVariants } from './ui-tooltip.variants';
import type { VariantProps } from 'class-variance-authority';
import {
  type Placement,
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useFloating,
} from '@floating-ui/vue';
import { computed, Teleport, type TeleportProps } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';

type Variants = VariantProps<typeof tooltipVariants>;

export type TooltipContentProps = PropsPolymorphic & {
  variant?: Variants['variant'];
  placement?: Variants['placement'];
  teleportTo?: TeleportProps['to'];
  teleportDisabled?: TeleportProps['disabled'];
  teleportDefer?: TeleportProps['defer'];
};

const {
  variant,
  placement,
  as = motion.section,
} = defineProps<TooltipContentProps>();

defineOptions({
  inheritAttrs: false,
});

const { id, trigger, tooltip, open } = useTooltipState();

const placementForFloating = computed<Placement>(() => {
  if (placement === 'top') return placement;
  if (placement === 'left') return placement;
  if (placement === 'right') return placement;
  if (placement === 'bottom') return placement;
  if (placement === 'top-left') return 'top-start';
  if (placement === 'top-right') return 'top-end';
  if (placement === 'bottom-left') return 'bottom-start';
  if (placement === 'bottom-right') return 'bottom-end';
  return 'top';
});

const { floatingStyles, placement: floatingPlacement } = useFloating(
  trigger,
  tooltip,
  {
    placement: placementForFloating,
    middleware: [
      offset(({ rects }) => {
        const padding = 4;
        if (placement === 'top-left' || placement === 'bottom-left')
          return {
            mainAxis: padding,
            crossAxis: -rects.floating.width - padding,
          };
        if (placement === 'top-right' || placement === 'bottom-right')
          return {
            mainAxis: padding,
            crossAxis: rects.floating.width + padding,
          };
        return padding;
      }),
      flip(),
      hide(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
    transform: false,
  },
);

const finalPlacement = computed<Variants['placement']>(() => {
  if (floatingPlacement.value === 'top') return floatingPlacement.value;
  if (floatingPlacement.value === 'left') return floatingPlacement.value;
  if (floatingPlacement.value === 'right') return floatingPlacement.value;
  if (floatingPlacement.value === 'bottom') return floatingPlacement.value;
  if (floatingPlacement.value === 'top-start') return 'top-left';
  if (floatingPlacement.value === 'top-end') return 'top-right';
  if (floatingPlacement.value === 'bottom-start') return 'bottom-left';
  if (floatingPlacement.value === 'bottom-end') return 'bottom-right';
  return 'top';
});
</script>

<template>
  <Teleport
    :to="teleportTo ?? 'body'"
    :disabled="teleportDisabled"
    :defer="teleportDefer"
  >
    <AnimatePresence mode="wait">
      <component
        :is="as"
        ref="tooltip"
        v-if="open"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :id
        role="tooltip"
        :style="floatingStyles"
        :class="tooltipVariants({ variant, placement: finalPlacement })"
        v-bind="$attrs"
        v-tw-merge
      >
        <p
          v-if="variant === 'rich' && $slots.subhead"
          :class="tooltipVariants.subhead()"
          v-tw-merge
        >
          <slot name="subhead" />
        </p>
        <p :class="tooltipVariants.text({ variant })" v-tw-merge>
          <slot />
        </p>
        <p
          v-if="variant === 'rich' && $slots.actions"
          :class="tooltipVariants.actions()"
          v-tw-merge
        >
          <slot name="actions" />
        </p>
      </component>
    </AnimatePresence>
  </Teleport>
</template>
