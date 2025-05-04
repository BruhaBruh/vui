import type { Context } from '@/types';
import {
  toRef,
  useDebounceFn,
  useElementHover,
  useEventListener,
  useFocus,
  useThrottleFn
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

type TooltipContext = Context<
  {
    id: string;
    open: Ref<boolean>;
    trigger: Ref<HTMLElement | null>;
    tooltip: Ref<HTMLElement | null>;
  },
  {
    open: boolean;
    trigger: 'both' | 'focus' | 'hover';
    hideDelay: number;
    showDelay: number;
  }
>;

export type TooltipState = TooltipContext['state'];

export type TooltipStateOptions = TooltipContext['options'];

const tooltipStateKey = Symbol() as InjectionKey<TooltipState>;

export function provideTooltipState({
  hideDelay,
  showDelay,
  ...options
}: TooltipContext['provideOptions']) {
  const id = useId();
  const open = toRef(options.open);
  const trigger = ref<HTMLElement | null>(null);
  const tooltip = ref<HTMLElement | null>(null);

  const triggerType = toRef(options.trigger);

  const ignoreHide = ref(false);
  const ignoreShow = ref(false);

  const hide = useDebounceFn(() => {
    if (ignoreHide.value) return;
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

  const closeOnEscape = useThrottleFn(() => {
    open.value = false;
  }, 100);

  watchEffect(() => {
    const isHovered = triggerType.value !== 'focus' && isTriggerHovered.value;
    const isFocused = triggerType.value !== 'hover' && isTriggerFocused.value;
    if (isHovered || isFocused) {
      ignoreShow.value = false;
      show();
      return;
    }
    if (open.value) {
      hide();
      return;
    }
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

  useEventListener('keydown', (e) => {
    if (!open.value) return
    if (e.key !== 'Escape') return;
      closeOnEscape();
  })

  const state: TooltipState = {
    id,
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
