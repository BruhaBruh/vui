import { useEventListener } from '@vueuse/core';
import { type MaybeRef, type Ref, type ShallowRef, computed, toRef, watchEffect } from 'vue';
import { useButton } from './use-button';
import { type UseInteractionsOptions } from './use-interactions';

export type UseToggleButtonOptions = {
  isSelected?: Ref<boolean>;
  elementType?: 'button' | (string & {});
  interaction?: UseInteractionsOptions;
};

export function useToggleButton(
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  isToggleable: MaybeRef<boolean>,
  { isSelected, ...options }: UseToggleButtonOptions = {},
) {
  const element = computed<HTMLElement | null>(() => {
    if (elementRef.value && '$el' in elementRef.value) {
      return elementRef.value.$el as HTMLElement | null;
    }
    return elementRef.value;
  });

  const selected = toRef(isSelected ?? false);
  const isEnabled = toRef(isToggleable)

  useButton(elementRef, options);

  watchEffect(() => {
    if (!element.value) return;
    if (!isEnabled.value) {
      element.value.removeAttribute('aria-pressed');
      return;
    }
    element.value.setAttribute('aria-pressed', `${selected.value}`);
  });

  useEventListener(elementRef, 'click', () => {
    selected.value = !selected.value;
  });
}
