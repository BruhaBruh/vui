import {
  useElementHover,
  useFocus,
  useFocusWithin,
  useMousePressed,
  useMutationObserver,
} from '@vueuse/core';
import { type ShallowRef, computed, ref, watchEffect } from 'vue';

export type UseInteractionsOptions = {
  focus?: boolean;
  focusWithin?: boolean;
  focusVisible?: boolean;
  hover?: boolean;
  press?: boolean;
  disabled?: boolean;
};

export function useInteractions(
  elementRef: Readonly<ShallowRef<HTMLElement | null>>,
  {
    focus = true,
    focusWithin = true,
    focusVisible = true,
    hover = true,
    press = true,
    disabled = true,
  }: UseInteractionsOptions = {},
) {
  const element = computed<HTMLElement | null>(() => {
    if (elementRef.value && '$el' in elementRef.value) {
      return elementRef.value.$el as HTMLElement | null;
    }
    return elementRef.value;
  });

  const inFocus = useFocus(elementRef);
  const inFocusWithin = useFocusWithin(elementRef);
  const inFocusVisible = useFocus(elementRef, {
    focusVisible: true,
  });
  const isHovered = useElementHover(elementRef);
  const isPressed = useMousePressed({
    target: elementRef,
  });
  const isDisabledMutation = ref(false);
  const isDisabled = computed(() => {
    if (isDisabledMutation.value) return isDisabledMutation.value;
    if (!element.value) return false;
    return (
      element.value.ariaDisabled !== null ||
      (element.value as HTMLButtonElement).disabled
    );
  });

  useMutationObserver(
    elementRef,
    (mutations) => {
      const mutation = mutations[0];
      if (!mutation || mutation.type !== 'attributes') return;
      if (
        mutation.attributeName !== 'disabled' &&
        mutation.attributeName !== 'aria-disabled'
      )
        return;
      const el = mutation.target as HTMLButtonElement;
      isDisabledMutation.value = el.ariaDisabled !== null || el.disabled;
    },
    {
      attributes: true,
    },
  );

  watchEffect(() => {
    if (!element.value) return;
    if (focus) {
      element.value.dataset.inFocus = `${inFocus.focused.value}`;
    }
    if (focusWithin) {
      element.value.dataset.inFocusWithin = `${inFocusWithin.focused.value}`;
    }
    if (focusVisible) {
      element.value.dataset.inFocusVisible = `${inFocusVisible.focused.value}`;
    }
    if (hover) {
      element.value.dataset.isHovered = `${isHovered.value}`;
    }
    if (press) {
      element.value.dataset.isPressed = `${isPressed.pressed.value}`;
    }
    if (disabled) {
      element.value.dataset.isDisabled = `${isDisabled.value}`;
    }
  });
}
