import { materialDuration } from '@/config';
import { useDebounceFn, useElementHover, useFocus } from '@vueuse/core';
import {
  type InjectionKey,
  type Ref,
  inject,
  provide,
  ref,
  watchEffect,
} from 'vue';

export type TooltipStateOptions = {
  alwaysOpen?: boolean;
  hideDelay?: number;
  showDelay?: number;
};

export type TooltipState = {
  open: Ref<boolean>;
  trigger: Ref<HTMLElement | null>;
  tooltip: Ref<HTMLElement | null>;
};

const tooltipStateKey = Symbol() as InjectionKey<TooltipState>;

export function provideTooltipState(
  open: TooltipState['open'],
  {
    alwaysOpen = false,
    hideDelay = materialDuration['long-2'],
    showDelay = materialDuration['short-2'],
  }: TooltipStateOptions = {},
) {
  const trigger = ref<HTMLElement | null>(null);
  const tooltip = ref<HTMLElement | null>(null);
  const ignoreHide = ref(false);
  const ignoreShow = ref(false);

  const hide = useDebounceFn(() => {
    if (ignoreHide.value || alwaysOpen) return;
    open.value = false;
  }, hideDelay);

  const show = useDebounceFn(() => {
    if (ignoreShow.value) return;
    open.value = true;
  }, showDelay);

  const isTriggerHovered = useElementHover(trigger);
  const { focused: isTriggerFocused } = useFocus(trigger, {
    focusVisible: true,
  });
  const isTooltipHovered = useElementHover(tooltip);

  // eslint-disable-next-line consistent-return
  watchEffect(() => {
    if (isTriggerHovered.value || isTriggerFocused.value) {
      ignoreShow.value = false;
      return show();
    }
    if (open.value) return hide();
    ignoreShow.value = true;
  });

  watchEffect(() => {
    if (!isTooltipHovered.value) {
      ignoreHide.value = false;
      hide();
      return;
    }
    open.value = true;
    ignoreHide.value = true;
  });

  const state: TooltipState = {
    open,
    trigger,
    tooltip,
  };

  provide(tooltipStateKey, state);

  return state;
}

export function useTooltipState() {
  const state = inject(tooltipStateKey);

  if (!state) {
    throw new Error('useTooltipState must be used within a Tooltip component');
  }

  return state;
}
