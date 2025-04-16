import type { Context } from '@/types';
import { toRef, useEventListener } from '@vueuse/core';
import {
  type InjectionKey,
  type Ref,
  computed,
  inject,
  provide,
  ref,
  useId,
} from 'vue';

type PopoverContext = Context<
  {
    id: Ref<string>;
    open: Ref<boolean>;
    trigger: Ref<HTMLElement | null>;
    popover: Ref<HTMLElement | null>;
  },
  {
    open: boolean;
  }
>;

export type PopoverState = PopoverContext['state'];

export type PopoverStateOptions = PopoverContext['options'];

const popoverStateKey = Symbol() as InjectionKey<PopoverState>;

export function providePopoverState(options: PopoverContext['provideOptions']) {
  const contextId = useId();
  const id = ref(contextId);
  const open = toRef(options.open);
  const trigger = ref<HTMLElement | null>(null);
  const popover = ref<HTMLElement | null>(null);
  const triggerElement = computed<HTMLElement | null>(() => {
    if (trigger.value && '$el' in trigger.value) {
      return trigger.value.$el as HTMLElement | null;
    }
    return trigger.value;
  });
  const popoverElement = computed<HTMLElement | null>(() => {
    if (popover.value && '$el' in popover.value) {
      return popover.value.$el as HTMLElement | null;
    }
    return popover.value;
  });

  useEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    open.value = false;
  });

  useEventListener(trigger, 'click', () => {
    open.value = !open.value;
  });

  useEventListener('click', (e) => {
    if (!open.value) return;
    const target = e.target as HTMLElement;
    const shouldIgnore =
      triggerElement.value?.contains(target) ||
      popoverElement.value?.contains(target);
    if (shouldIgnore) return;
    open.value = false;
  });

  const state: PopoverState = {
    id,
    open,
    trigger,
    popover,
  };

  provide(popoverStateKey, state);

  return state;
}

export function usePopoverState() {
  const state = inject(popoverStateKey);

  if (!state) {
    throw new Error('usePopoverState must be used within a Popover component');
  }

  return state;
}
