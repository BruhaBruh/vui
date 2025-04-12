import { useEventListener } from '@vueuse/core';
import {
  type MaybeRef,
  type Ref,
  type ShallowRef,
  computed,
  toRef,
  watchEffect,
} from 'vue';
import { type UseButtonOptions, useButton } from './use-button';

export type UseToggleButtonOptions = {
  isToggleable: Readonly<MaybeRef<boolean>>;
  isSelected: Readonly<Ref<boolean>>;
  onClick?: () => void;
} & UseButtonOptions;

export function useToggleButton(
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  {
    isToggleable: isToggleableRef,
    isSelected,
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

  const isToggleable = toRef(isToggleableRef);

  useButton(elementRef, options);

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
}
