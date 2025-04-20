<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { Field, type FieldProps } from '../ui-field';
import { materialDuration, materialEasing } from '@/config';
import { computed, ref, useTemplateRef } from 'vue';
import { useFocus } from '@vueuse/core';
import type { UnknownRecord } from '@bruhabruh/type-safe';

export type TextAreaFieldProps = FieldProps & {
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
} = defineProps<TextAreaFieldProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement | null>('input');

const value = defineModel<string>('value', { default: '' });

const height = ref('auto');

const { focused } = useFocus(elementRef);

const isExpanded = computed(() => {
  if (placeholder) return true;
  if (focused.value) return true;
  return value.value.length > 0;
});

async function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  value.value = target.value;
  const currentHeight = target.style.height;
  target.style.height = 'auto';
  height.value = `${target.scrollHeight}px`;
  target.style.height = currentHeight;
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
    <template #default="{ class: className, ...props }">
      <AnimatePresence mode="wait">
        <motion.textarea
          ref="input"
          :placeholder
          :animate="
            isExpanded ? { opacity: 1, height } : { opacity: 0, height: 0 }
          "
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
          :value
          @input="onInput"
          rows="1"
          :class="[className, 'resize-none overflow-y-scroll']"
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
