import { type ShallowRef, computed, watchEffect } from 'vue';
import {
  type UseInteractionsOptions,
  useInteractions,
} from './use-interactions';

export type UseButtonOptions = {
  elementType?: 'button' | (string & {});
  interaction?: UseInteractionsOptions;
};

export function useButton(
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  { elementType = 'button', interaction }: UseButtonOptions = {},
) {
  const element = computed<HTMLElement | null>(() => {
    if (elementRef.value && '$el' in elementRef.value) {
      return elementRef.value.$el as HTMLElement | null;
    }
    return elementRef.value;
  });

  useInteractions(elementRef, interaction);

  watchEffect(() => {
    if (!element.value) return;
    if (elementType !== 'button') {
      element.value.setAttribute('role', 'button');
      return;
    }
    if (element.value.getAttribute('type')) return;
    element.value.setAttribute('type', 'button');
  });
}
