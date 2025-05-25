<script setup lang="ts">
import { Field, type FieldProps } from '../ui-field';
import { computed, useTemplateRef } from 'vue';
import { useFocus } from '@vueuse/core';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { MotionComponent } from '@/components/utility';
import { AnimatePresence } from 'motion-v';
import { transitionConfig } from '@/config';

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
  leadingKey,
  trailingKey,
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
            :placeholder
            v-model="value"
            v-bind="{ ...attrsWithoutClass($attrs), ...props }"
            v-tw-merge
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
