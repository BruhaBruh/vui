<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import {
  autoUpdate,
  flip,
  offset as floatingOffset,
  hide,
  shift,
  useFloating,
} from '@floating-ui/vue';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Teleport,
  type TeleportProps,
  useAttrs,
  watchEffect,
} from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { usePopoverState } from './ui-popover.context';
import { type PopoverVariants, popoverVariants } from './ui-popover.variants';
import { Slot } from '@/components/utility';

export type PopoverContentProps = PropsPolymorphic & {
  placement?: NonNullable<PopoverVariants['placement']>;
  offset?: number;
  teleportTo?: TeleportProps['to'];
  teleportDisabled?: TeleportProps['disabled'];
  teleportDefer?: TeleportProps['defer'];
};

const {
  placement = 'top',
  offset = 0,
  as = motion.div,
  teleportTo = 'body',
  teleportDisabled,
  teleportDefer,
} = defineProps<PopoverContentProps>();

defineOptions({
  inheritAttrs: false,
});

const { id, trigger, popover, open } = usePopoverState();

const { floatingStyles, placement: floatingPlacement } = useFloating(
  trigger,
  popover,
  {
    placement: () => placement,
    middleware: [floatingOffset(offset), flip(), hide(), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
  },
);

const { id: idAttribute } = useAttrs();

watchEffect(() => {
  if (!idAttribute) return;
  id.value = `${idAttribute}`;
});

function close() {
  open.value = false;
}
</script>

<template>
  <Teleport
    :to="teleportTo"
    :disabled="teleportDisabled"
    :defer="teleportDefer"
  >
    <AnimatePresence mode="wait">
      <Slot
        :is="as"
        ref="popover"
        v-if="open"
        :id
        :style="floatingStyles"
        :class="popoverVariants({ placement: floatingPlacement })"
        v-bind="$attrs"
        v-tw-merge
      >
        <slot :close />
      </Slot>
    </AnimatePresence>
  </Teleport>
</template>
