<script setup lang="ts">
import { AnimatePresence } from 'motion-v';
import { Field, type FieldProps } from '../ui-field';
import { computed, nextTick, ref, useTemplateRef, watchEffect } from 'vue';
import { useFocus } from '@vueuse/core';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { MotionComponent } from '@/components/utility';
import { transitionConfig } from '@/config';

export type MaskFieldProps = FieldProps & {
  mask: string;
  maskAliases?: string[];
  placeholder?: string;
  disabled?: boolean;
};

const {
  mask,
  maskAliases = [],
  placeholder,
  disabled,
  size,
  alwaysShowLabel,
  invalid,
  leadingKey,
  trailingKey,
  as,
} = defineProps<MaskFieldProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLInputElement | null>('input');
const element = computed<HTMLInputElement | null>(() => {
  if (elementRef.value && '$el' in elementRef.value) {
    return elementRef.value.$el as HTMLInputElement | null;
  }
  return elementRef.value;
});

const value = defineModel<string>('value', { default: '' });
const formattedValue = ref('');

const { focused } = useFocus(elementRef);

const isExpanded = computed(() => {
  if (placeholder) return true;
  if (focused.value) return true;
  return value.value.length > 0;
});

watchEffect(() => {
  if (formattedValue.value === '') {
    return;
  }
  const val = formatToPlain(formattedValue.value);
  const newValue = format(val);
  value.value = formatToPlain(newValue);
  formattedValue.value = newValue;
  nextTick(() => {
    setCursor(newValue);
  });
});

function format(val: string) {
  const numbers = val.replace(/[^0-9]/g, '').split('');
  return mask
    .split('')
    .map((v, i) => {
      if (v === '_') {
        return numbers.shift() || '_';
      }
      const isSimilarInMask = [mask, ...maskAliases].some((p) => {
        const maskChar = p[i];
        if (!maskChar) return false;
        if (!/\d/.test(maskChar)) return false;
        return maskChar === numbers[0];
      });
      if (/\d/.test(v) && isSimilarInMask) {
        numbers.shift();
      }
      return v;
    })
    .join('');
}

function formatToPlain(val: string) {
  return val.replace(/[^+0-9]/g, '').replace(/(\+.*)\+/g, '$1');
}

function setCursor(val: string) {
  if (!element.value) return;
  const index = val.indexOf('_');
  if (index === -1) return;
  element.value.selectionStart = index;
  element.value.selectionEnd = index;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key !== 'Backspace') return;
  if (
    value.value.length ===
      mask.slice(0, mask.indexOf('_')).replace(/[^+\d_]/g, '').length ||
    value.value.length === 0
  ) {
    value.value = '';
    formattedValue.value = '';
    return;
  }
  e.preventDefault();
  const input = e.target as HTMLInputElement;
  let val = formatToPlain(input.value);
  if (
    input.selectionStart !== null &&
    input.selectionEnd !== null &&
    input.selectionStart !== input.selectionEnd
  ) {
    val = formatToPlain(
      input.value.slice(0, input.selectionStart) +
        input.value.slice(input.selectionEnd),
    );
  } else {
    val = val.slice(0, val.length - 1);
  }
  const newValue = format(val);
  value.value = formatToPlain(newValue);
  formattedValue.value = newValue;
  input.value = newValue;
  setCursor(newValue);
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
    :class="$attrs.class"
  >
    <template #before="props" v-if="$slots.before">
      <slot name="before" v-bind="props" />
    </template>
    <template #leading="props" v-if="$slots.leading">
      <slot name="leading" v-bind="props" />
    </template>
    <template #trailing="props" v-if="$slots.trailing">
      <slot name="trailing" v-bind="props" />
    </template>
    <template #label="props" v-if="$slots.label">
      <label v-bind="props" v-tw-merge>
        <slot name="label" />
      </label>
    </template>
    <template #default="props">
      <AnimatePresence mode="wait">
        <MotionComponent
          as-child
          :variants="{
            hidden: { opacity: 0, height: 0 },
            expanded: { opacity: 1, height: 'auto' },
          }"
          :animate="isExpanded ? 'expanded' : 'hidden'"
          :transition="transitionConfig.preset.short.beginEnd.asMotion()"
        >
          <input
            ref="input"
            type="text"
            inputmode="decimal"
            :placeholder
            v-model="formattedValue"
            v-bind="{ ...attrsWithoutClass($attrs), ...props }"
            v-tw-merge
            @keydown="onKeyDown"
          />
        </MotionComponent>
      </AnimatePresence>
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
