import { useEventListener } from '@vueuse/core';
import {
  type MaybeRefOrGetter,
  type ShallowRef,
  computed,
  toRef,
  watchEffect,
} from 'vue';
import { type UseButtonOptions, useButton } from './use-button';

export type UseToggleButtonOptions = {
  isToggleable: Readonly<MaybeRefOrGetter<boolean>>;
  isSelected: Readonly<MaybeRefOrGetter<boolean>>;
  onClick?: () => void;
} & UseButtonOptions;

export function useToggleButton(
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  {
    isToggleable: isToggleableMaybeRefOrGetter,
    isSelected: isSelectedMaybeRefOrGetter,
    onClick = () => {},
    ...options
  }: UseToggleButtonOptions,
) {
  const element = computed<HTMLElement | null>(() => {
    if (elementRef.value && '$el' in elementRef.value) {
      return elementRef.value.$el as HTMLElement | null;
    }
    return elementRef.value;
  });

  const isToggleable = toRef(isToggleableMaybeRefOrGetter);
  const isSelected = toRef(isSelectedMaybeRefOrGetter);

  const button = useButton(elementRef, options);

  watchEffect(() => {
    if (!element.value) return;
    if (!isToggleable.value) {
      element.value.removeAttribute('aria-pressed');
      return;
    }
    if (!element.value.hasAttribute('aria-checked'))
      element.value.setAttribute('aria-pressed', `${isSelected.value}`);
  });

  useEventListener(elementRef, 'click', () => {
    onClick();
  });

  return button;
}
