<script setup lang="ts">
import { Field, type FieldProps } from '../ui-field';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-vue';
import { numberFieldVariants } from './ui-number-field.variants';

export type NumberFieldProps = FieldProps & {
  min?: number;
  max?: number;
  step?: number;
  stepMultiplier?: number;
  placeholder?: string;
  disabled?: boolean;
};

const {
  min,
  max,
  step = 1,
  stepMultiplier = 10,
  placeholder,
  disabled,
  size = 'lg',
  alwaysShowLabel,
  invalid,
  leadingKey,
  trailingKey,
  as,
} = defineProps<NumberFieldProps>();

defineOptions({
  inheritAttrs: false,
});

const value = defineModel<number>('value', { default: 0 });

function onKeyDown(e: KeyboardEvent) {
  const isControlKey = [
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'ArrowUp',
    'ArrowDown',
  ].includes(e.key);
  if (!isControlKey) return;
  e.preventDefault();

  if (e.key === 'Home') {
    if (min === undefined) return;
    value.value = min;
  } else if (e.key === 'End') {
    if (max === undefined) return;
    value.value = max;
  } else if (e.key === 'PageUp') {
    value.value = value.value + step * stepMultiplier;
  } else if (e.key === 'PageDown') {
    value.value = value.value - step * stepMultiplier;
  } else if (e.key === 'ArrowUp') {
    value.value = value.value + step;
  } else if (e.key === 'ArrowDown') {
    value.value = value.value - step;
  }
}

function onBlur(e: FocusEvent) {
  if (!e.target) return;
  if (min !== undefined && value.value < min) {
    value.value = min;
  }
  if (max !== undefined && value.value > max) {
    value.value = max;
  }
  (e.target as HTMLInputElement).value = value.value.toString();
}

function attrsWithoutClass(attrs: UnknownRecord) {
  const newAttrs = { ...attrs };
  if ('class' in newAttrs) delete newAttrs.class;
  return newAttrs;
}
</script>

<template>
  <Field
    :as
    :size
    :always-show-label
    :invalid
    :leading-key
    :trailing-key
    :aria-disabled="disabled"
    :class="[numberFieldVariants(), $attrs.class]"
  >
    <template #before="props" v-if="$slots.before">
      <slot name="before" v-bind="props" />
    </template>
    <template #leading="props" v-if="$slots.leading">
      <slot name="leading" v-bind="props" />
    </template>
    <template #trailing="props">
      <span
        v-bind="props"
        class="inline-flex flex-col items-center justify-center"
        v-tw-merge
      >
        <button
          tabindex="-1"
          aria-label="next"
          :class="numberFieldVariants.spinButton({ size })"
          :disabled
          @click="value = value + step"
        >
          <IconCaretUpFilled class="size-4" />
        </button>
        <button
          tabindex="-1"
          aria-label="previous"
          :class="numberFieldVariants.spinButton({ size })"
          :disabled
          @click="value = value - step"
        >
          <IconCaretDownFilled />
        </button>
      </span>
    </template>
    <template #label="props" v-if="$slots.label">
      <label v-bind="props" v-tw-merge>
        <slot name="label" />
      </label>
    </template>
    <template #default="props">
      <input
        type="text"
        inputmode="decimal"
        :step
        :min
        :max
        :placeholder
        v-model.number="value"
        v-bind="{ ...attrsWithoutClass($attrs), ...props }"
        v-tw-merge
        @keydown="onKeyDown"
        @blur="onBlur"
      />
    </template>
    <template #description="props" v-if="$slots.description">
      <p v-bind="props" v-tw-merge>
        <slot name="description" />
      </p>
    </template>
    <template #error="props" v-if="$slots.error">
      <p v-bind="props" v-tw-merge>
        <slot name="error" />
      </p>
    </template>
    <template #after="props" v-if="$slots.after">
      <slot name="after" v-bind="props" />
    </template>
  </Field>
</template>
