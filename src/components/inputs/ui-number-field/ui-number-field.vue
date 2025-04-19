<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { Field, type FieldProps } from '../ui-field';
import { materialDuration, materialEasing } from '@/config';
import { computed, ref, useTemplateRef, watchEffect } from 'vue';
import { useFocus } from '@vueuse/core';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-vue';
import { numberFieldVariants } from './ui-number-field.variants';

export type NumberFieldProps = FieldProps & {
  min?: number;
  max?: number;
  step?: number;
  stepMultiplier?: number;
  pattern?: RegExp;
  placeholder?: string;
  disabled?: boolean;
};

const {
  pattern = /^\d+(\.)?(\d*)?$/i,
  min,
  max,
  step = 1,
  stepMultiplier = 10,
  placeholder,
  disabled,
  size,
  alwaysShowLabel,
  invalid,
  leftKey,
  rightKey,
  as,
} = defineProps<NumberFieldProps>();

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

const value = defineModel<number>({ default: 0 });
const inputValue = ref('');

const { focused } = useFocus(elementRef);

const isExpanded = computed(() => {
  if (placeholder) return true;
  if (focused.value) return true;
  return inputValue.value.length > 0;
});

watchEffect(() => {
  const numberValue = Number.parseFloat(inputValue.value);
  if (Number.isNaN(numberValue)) return;
  value.value = numberValue;
});

watchEffect(() => {
  if (focused.value) return;
  if (!element.value) return;
  inputValue.value = value.value.toString();
  element.value.value = value.value.toString();
});

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!pattern.test(target.value) && target.value.length > 0) {
    target.value = inputValue.value;
    return;
  }
  inputValue.value = target.value;
}

function attrsWithoutClass(attrs: UnknownRecord) {
  const newAttrs = { ...attrs };
  if ('class' in newAttrs) delete newAttrs.class;
  return newAttrs;
}

function nextStep() {
  value.value += step;
  inputValue.value = value.value.toString();
}

function previousStep() {
  value.value -= step;
  inputValue.value = value.value.toString();
}

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
    inputValue.value = value.value.toString();
  } else if (e.key === 'End') {
    if (max === undefined) return;
    value.value = max;
    inputValue.value = value.value.toString();
  } else if (e.key === 'PageUp') {
    value.value += step * stepMultiplier;
    inputValue.value = value.value.toString();
  } else if (e.key === 'PageDown') {
    value.value -= step * stepMultiplier;
    inputValue.value = value.value.toString();
  } else if (e.key === 'ArrowUp') {
    nextStep();
  } else if (e.key === 'ArrowDown') {
    previousStep();
  }
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
    :class="[numberFieldVariants(), $attrs.class]"
  >
    <template #before="props" v-if="$slots.before">
      <slot name="before" v-bind="props" />
    </template>
    <template #left="props" v-if="$slots.left">
      <slot name="left" v-bind="props" />
    </template>
    <template #right="props">
      <span
        v-bind="props"
        class="inline-flex flex-col items-center justify-center"
        v-tw-merge
      >
        <button
          tabindex="-1"
          aria-label="next"
          @click="nextStep()"
          :class="numberFieldVariants.spinButton()"
          :disabled
        >
          <IconCaretUpFilled class="size-4" />
        </button>
        <button
          tabindex="-1"
          aria-label="previous"
          @click="previousStep()"
          :class="numberFieldVariants.spinButton()"
          :disabled
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
      <AnimatePresence mode="wait">
        <motion.input
          ref="input"
          type="number"
          inputmode="decimal"
          :step
          :min
          :max
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
          :value="inputValue"
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
