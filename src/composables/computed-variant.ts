import type { MotionComponentProps } from '@/components';
import { toRef } from '@vueuse/core';
import type { Variant } from 'motion-v';
import { type MaybeRefOrGetter, computed } from 'vue';

export function computedVariant<
  T extends
    | MotionComponentProps['initial']
    | MotionComponentProps['animate']
    | MotionComponentProps['exit'],
>(valueMaybeRefOrGetter: MaybeRefOrGetter<T>) {
  const value = toRef(valueMaybeRefOrGetter);

  const valueObject = computed<Variant>(() => {
    if (typeof value.value !== 'object') return {};
    if (Array.isArray(value.value)) return {};
    return value.value as Variant;
  });

  return valueObject;
}

export function computedVariants<
  T extends {
    initial: MotionComponentProps['initial'];
    animate: MotionComponentProps['animate'];
    exit: MotionComponentProps['exit'];
  },
>(valueMaybeRefOrGetter: MaybeRefOrGetter<T>) {
  const value = toRef(valueMaybeRefOrGetter);

  const initial = computedVariant(() => value.value.initial);
  const animate = computedVariant(() => value.value.animate);
  const exit = computedVariant(() => value.value.exit);

  return {
    initial,
    animate,
    exit,
  };
}
