<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { Field, type FieldProps } from '../ui-field';
import { materialDuration, materialEasing } from '@/config';
import { computed, useTemplateRef } from 'vue';
import { useFocus } from '@vueuse/core';
import type { UnknownRecord } from '@bruhabruh/type-safe';

export type TextFieldProps = FieldProps & {
  placeholder?: string;
  disabled?: boolean;
};

const {
  placeholder,
  disabled,
  size,
  alwaysShowLabel,
  invalid,
  leftKey,
  rightKey,
  as,
} = defineProps<TextFieldProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLInputElement | null>('input');

const value = defineModel<string>('value', { default: '' });

const { focused } = useFocus(elementRef);

const isExpanded = computed(() => {
  if (placeholder) return true;
  if (focused.value) return true;
  return value.value.length > 0;
});

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  value.value = target.value;
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
          :value
          @input="onInput"
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
