<script setup lang="ts">
import { useTooltipState } from './ui-tooltip.context';
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
import {
  floatingPlacementToVariantPlacement,
  variantPlacementToFloatingPlacement,
} from './ui-tooltip.utility';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type TooltipContentProps = Omit<MotionComponentProps, 'asChild'> & {
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
  teleportTo = 'body',
  teleportDisabled,
  teleportDefer,
  ...motionProps
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
    :to="teleportTo"
    :disabled="teleportDisabled"
    :defer="teleportDefer"
  >
    <AnimatePresence mode="wait">
      <MotionComponent
        v-if="open"
        :as
        ref="tooltip"
        :id
        role="tooltip"
        v-bind="{ ...motionProps, ...$attrs }"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        :style="floatingStyles"
        :class="tooltipVariants({ variant, placement: finalPlacement })"
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
      </MotionComponent>
    </AnimatePresence>
  </Teleport>
</template>
