import { type InjectionKey, type Ref, inject, provide, ref } from 'vue';

export type TooltipState = {
  open: Ref<boolean>;
  trigger: Ref<HTMLElement | null>;
  tooltip: Ref<HTMLElement | null>;
};

const tooltipStateKey = Symbol() as InjectionKey<TooltipState>;

export function provideTooltipState(open: TooltipState['open']) {
  const trigger = ref<HTMLElement | null>(null);
  const tooltip = ref<HTMLElement | null>(null);

  const state = {
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
