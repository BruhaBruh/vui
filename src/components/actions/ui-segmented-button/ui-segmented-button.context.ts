import type { Context } from '@/types';
import { toRef } from '@vueuse/core';
import { type InjectionKey, type Ref, inject, provide } from 'vue';
import type { SegmentedButtonVariants } from './ui-segmented-button.variants';

type SegmentedButtonContext = Context<
  {
    mode: Readonly<Ref<'single' | 'multiple'>>;
    selected: Ref<SegmentedButtonSelectedValue[]>;
    disabled: Readonly<Ref<boolean>>;
    color: Ref<SegmentedButtonVariants['color']>;
    select: (value: SegmentedButtonSelectedValue) => void;
  },
  {
    mode: 'single' | 'multiple';
    selected: SegmentedButtonSelectedValue[];
    disabled: boolean;
    color: SegmentedButtonVariants['color'];
  }
>;

export type SegmentedButtonSelectedValue = string | number;

export type SegmentedButtonGroupState = SegmentedButtonContext['state'];

export type SegmentedButtonGroupStateOptions =
  SegmentedButtonContext['options'];

const segmentedButtonStateKey =
  Symbol() as InjectionKey<SegmentedButtonGroupState>;

export function provideSegmentedButtonState(
  options: SegmentedButtonContext['provideOptions'],
) {
  const mode = toRef(options.mode);
  const selected = toRef(options.selected);
  const disabled = toRef(options.disabled);
  const color = toRef(options.color);

  if (mode.value === 'single') {
    selected.value = selected.value.slice(0, 1);
  }

  function select(value: SegmentedButtonSelectedValue) {
    if (selected.value.includes(value)) {
      selected.value = selected.value.filter((v) => v !== value);
      return;
    }
    if (mode.value === 'single') {
      selected.value = [value];
    } else {
      selected.value = [...selected.value, value];
    }
  }

  const state: SegmentedButtonGroupState = {
    mode,
    selected,
    disabled,
    color,
    select,
  };

  provide(segmentedButtonStateKey, state);

  return state;
}

export function useSegmentedButtonState() {
  const state = inject(segmentedButtonStateKey);

  if (!state) {
    throw new Error(
      'useSegmentedButtonState must be used within a SegmentedButtonGroup component',
    );
  }

  return state;
}
