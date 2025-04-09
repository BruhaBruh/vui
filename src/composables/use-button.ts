import {
  type MaybeRef,
  type ShallowRef,
  computed,
  toRef,
  watchEffect,
} from 'vue';
import {
  type UseInteractionsOptions,
  useInteractions,
} from './use-interactions';

export type UseButtonOptions = {
  elementType?: 'button' | (string & {});
  removeRole?: MaybeRef<boolean>;
  interaction?: UseInteractionsOptions;
};

export function useButton(
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  {
    elementType = 'button',
    removeRole = false,
    interaction,
  }: UseButtonOptions = {},
) {
  const element = computed<HTMLElement | null>(() => {
    if (elementRef.value && '$el' in elementRef.value) {
      return elementRef.value.$el as HTMLElement | null;
    }
    return elementRef.value;
  });

  const removeRoleRef = toRef(removeRole);

  useInteractions(elementRef, interaction);

  watchEffect(() => {
    if (!element.value) return;
    if (elementType !== 'button') {
      if (removeRoleRef.value) {
        element.value.removeAttribute('role');
      } else {
        element.value.setAttribute('role', 'button');
      }
      return;
    }
    if (element.value.getAttribute('type')) return;
    element.value.setAttribute('type', 'button');
  });
}
