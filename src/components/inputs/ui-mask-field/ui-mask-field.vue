<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { Field, type FieldProps } from '../ui-field';
import { materialDuration, materialEasing } from '@/config';
import { computed, ref, useTemplateRef } from 'vue';
import { useFocus } from '@vueuse/core';
import type { UnknownRecord } from '@bruhabruh/type-safe';

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
  leftKey,
  rightKey,
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

function setCursor(val: string) {
  if (!element.value) return;
  const index = val.indexOf('_');
  if (index === -1) return;
  element.value.selectionStart = index;
  element.value.selectionEnd = index;
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  const val = input.value.replace(/[^+0-9]/g, '').replace(/(\+.*)\+/g, '$1');
  const newValue = format(val);
  value.value = newValue.replace(/[^+0-9]/g, '');
  formattedValue.value = newValue;
  input.value = newValue;
  setCursor(newValue);
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
  const newValue = value.value.slice(0, value.value.length - 1);
  value.value = newValue;
  formattedValue.value = format(newValue);
  setCursor(format(newValue));
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
    :left-key
    :right-key
    :aria-disabled="disabled"
    :class="$attrs.class"
  >
    <template #before="props" v-if="$slots.before">
      <slot name="before" v-bind="props" />
    </template>
    <template #left="props" v-if="$slots.left">
      <slot name="left" v-bind="props" />
    </template>
    <template #right="props" v-if="$slots.right">
      <slot name="right" v-bind="props" />
    </template>
    <template #label="props" v-if="$slots.label">
      <label v-bind="props" v-tw-merge>
        <slot name="label" />
      </label>
    </template>
    <template #default="props">
      <AnimatePresence mode="wait">
        <motion.input
          ref="input"
          type="text"
          :placeholder
          :variants="{
            hidden: { opacity: 0, height: 0 },
            expanded: { opacity: 1, height: 'auto' },
          }"
          :animate="isExpanded ? 'expanded' : 'hidden'"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
          :value="formattedValue"
          @input="onInput"
          @keydown="onKeyDown"
          v-bind="{ ...attrsWithoutClass($attrs), ...props }"
          v-tw-merge
        />
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
