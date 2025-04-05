import { type InjectionKey, type Ref, inject, provide, ref } from 'vue';

export type SegmentedButtonSelectedValue = string | number;

export type SegmentedButtonGroupMode = 'single' | 'multiple';

export type SegmentedButtonGroupState = {
  mode: Readonly<Ref<SegmentedButtonGroupMode>>;
  disabled: Readonly<Ref<boolean>>;
  selected: Ref<SegmentedButtonSelectedValue[]>;
  select: (value: SegmentedButtonSelectedValue) => void;
};

const segmentedButtonStateKey =
  Symbol() as InjectionKey<SegmentedButtonGroupState>;

export function provideSegmentedButtonState(
  mode: SegmentedButtonGroupState['mode'],
  selected: Ref<SegmentedButtonSelectedValue[]>,
  disabled = ref(false),
) {
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
    select,
    disabled,
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
