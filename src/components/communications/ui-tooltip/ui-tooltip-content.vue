<script setup lang="ts">
import { useTooltipState } from './ui-tooltip.context';
import type { PropsPolymorphic } from '@/types';
import { type TooltipVariants, tooltipVariants } from './ui-tooltip.variants';
import {
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useFloating,
} from '@floating-ui/vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Teleport, type TeleportProps, computed } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import {
  floatingPlacementToVariantPlacement,
  variantPlacementToFloatingPlacement,
} from './ui-tooltip.utility';

export type TooltipContentProps = PropsPolymorphic & {
  variant?: TooltipVariants['variant'];
  placement?: TooltipVariants['placement'];
  teleportTo?: TeleportProps['to'];
  teleportDisabled?: TeleportProps['disabled'];
  teleportDefer?: TeleportProps['defer'];
};

const {
  variant,
  placement,
  as = motion.div,
  teleportTo,
  teleportDisabled,
  teleportDefer,
} = defineProps<TooltipContentProps>();

defineOptions({
  inheritAttrs: false,
});

const { id, trigger, tooltip, open } = useTooltipState();

const { floatingStyles, placement: floatingPlacement } = useFloating(
  trigger,
  tooltip,
  {
    placement: () => variantPlacementToFloatingPlacement(placement),
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

const finalPlacement = computed(() =>
  floatingPlacementToVariantPlacement(floatingPlacement.value),
);
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
