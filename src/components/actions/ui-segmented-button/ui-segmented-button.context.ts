import {
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
  inject,
  provide,
  ref,
  toRef,
} from 'vue';

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
  selected: SegmentedButtonGroupState['selected'],
  mode: MaybeRefOrGetter<SegmentedButtonGroupMode>,
  disabled: MaybeRefOrGetter<boolean> = ref(false),
) {
  const modeRef = toRef(mode);
  const disabledRef = toRef(disabled);
  function select(value: SegmentedButtonSelectedValue) {
    if (selected.value.includes(value)) {
      selected.value = selected.value.filter((v) => v !== value);
      return;
    }
    if (modeRef.value === 'single') {
      selected.value = [value];
    } else {
      selected.value = [...selected.value, value];
    }
  }

  const state: SegmentedButtonGroupState = {
    mode: modeRef,
    selected,
    select,
    disabled: disabledRef,
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
