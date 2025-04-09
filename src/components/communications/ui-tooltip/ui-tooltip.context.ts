import { materialDuration } from '@/config';
import {
  useDebounceFn,
  useElementHover,
  useEventListener,
  useFocus,
  useThrottleFn,
} from '@vueuse/core';
import {
  type InjectionKey,
  type Ref,
  inject,
  provide,
  ref,
  useId,
  watchEffect,
} from 'vue';

export type TooltipStateOptions = {
  alwaysOpen?: boolean;
  trigger?: 'both' | 'focus' | 'hover';
  hideDelay?: number;
  showDelay?: number;
};

export type TooltipState = {
  open: Ref<boolean>;
  id: string;
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
    trigger: triggerType = 'both',
  }: TooltipStateOptions = {},
) {
  const trigger = ref<HTMLElement | null>(null);
  const tooltip = ref<HTMLElement | null>(null);
  const id = useId();
  const ignoreHide = ref(false);
  const ignoreShow = ref(false);

  const hide = useDebounceFn(() => {
    if (ignoreHide.value || alwaysOpen) return;
    // open.value = false;
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

  const closeOnEscape = useThrottleFn(() => {
    open.value = false;
  }, 100);

  useEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || alwaysOpen) return;
    closeOnEscape();
  });

  // eslint-disable-next-line consistent-return
  watchEffect(() => {
    const isHovered = triggerType !== 'focus' && isTriggerHovered.value;
    const isFocused = triggerType !== 'hover' && isTriggerFocused.value;
    if (isHovered || isFocused) {
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
    id,
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
