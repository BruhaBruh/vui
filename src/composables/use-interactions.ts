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

  const { focused: inFocus } = useFocus(elementRef);
  const { focused: inFocusWithin } = useFocusWithin(elementRef);
  const { focused: inFocusVisible } = useFocus(elementRef, {
    focusVisible: true,
  });
  const isHovered = useElementHover(elementRef);
  const { pressed: isPressed } = useMousePressed({
    target: elementRef,
  });
  const isDisabledMutation = ref(false);
  const isDisabled = computed(() => {
    if (isDisabledMutation.value) return isDisabledMutation.value;
    if (!element.value) return false;
    const isAriaDisabled = element.value.ariaDisabled?.toLowerCase() === 'true';
    return (
      (isAriaDisabled || (element.value as HTMLButtonElement).disabled) ?? false
    );
  });

  useMutationObserver(
    elementRef,
    (mutations) => {
      const mutation = mutations[0];
      if (!mutation || mutation.type !== 'attributes') return;
      const el = mutation.target as HTMLButtonElement;
      const isAriaDisabled = el.ariaDisabled?.toLowerCase() === 'true';
      isDisabledMutation.value = (isAriaDisabled || el.disabled) ?? false;
    },
    {
      attributes: true,
    },
  );

  const setData = (name: string, value: boolean, isEnabled: boolean) => {
    if (!element.value) return;
    if (value && isEnabled) {
      element.value.setAttribute(`data-${name}`, `${value}`);
    } else {
      element.value.removeAttribute(`data-${name}`);
    }
  };

  watchEffect(() => {
    setData('in-focus', inFocus.value, focus);
    setData('in-focus-within', inFocusWithin.value, focusWithin);
    setData('in-focus-visible', inFocusVisible.value, focusVisible);
    setData('is-hovered', isHovered.value, hover);
    setData('is-pressed', isPressed.value, press);
    setData('is-disabled', isDisabled.value, disabled);
  });
}
