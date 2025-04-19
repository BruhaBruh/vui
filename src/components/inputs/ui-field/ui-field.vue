<script setup lang="ts">
import { useInteractions } from '@/composables';
import type { PropsPolymorphic } from '@/types';
import { computed, useId, useTemplateRef } from 'vue';
import { type FieldInputVariants, fieldVariants } from './ui-field.variants';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';

export type FieldProps = PropsPolymorphic & {
  size?: FieldInputVariants['size'];
  alwaysShowLabel?: boolean;
  invalid?: boolean;
  leftKey?: string;
  rightKey?: string;
};

const {
  size = 'lg',
  alwaysShowLabel = false,
  invalid = false,
  leftKey,
  rightKey,
  as = 'div',
} = defineProps<FieldProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement | null>('field');

const labelId = useId();
const inputId = useId();
const descriptionId = useId();
const errorId = useId();

function focusInput() {
  const input = elementRef.value?.querySelector(
    `#${inputId}`,
  ) as HTMLElement | null;
  input?.focus();
}

const iconSize = computed(() => {
  if (size === 'sm') return 'var(--spacing-4h)';
  if (size === 'md') return 'var(--spacing-5)';
  return 'var(--spacing-6)';
});

const iconMargin = computed(() => {
  if (size === 'sm') return 'var(--spacing-2xs)';
  if (size === 'md') return 'var(--spacing-xs)';
  return 'var(--spacing-sm)';
});

const { isDisabled } = useInteractions(elementRef, {
  focusVisible: false,
  press: false,
});
</script>

<template>
  <slot name="before" :inputId :labelId />
  <component
    :is="as"
    ref="field"
    :class="fieldVariants()"
    :data-invalid="Boolean($slots.error) || invalid ? true : undefined"
    @click="focusInput()"
    v-bind="$attrs"
    v-tw-merge
  >
    <div :class="fieldVariants.input({ size })" v-tw-merge>
      <AnimatePresence mode="wait">
        <motion.span
          :key="leftKey"
          v-if="$slots.left"
          :initial="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
          :exit="{ width: 0, height: 0, opacity: 0, marginRight: 0 }"
          :animate="{
            width: iconSize,
            height: iconSize,
            opacity: 1,
            marginRight: iconMargin,
          }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
          :class="[
            fieldVariants.icon({ size }),
            'field--left-icon',
            {
              sm: 'mr-2xs',
              md: 'mr-xs',
              lg: 'mr-2xs',
            }[size ?? 'lg'],
          ]"
          v-tw-merge
        >
          <slot name="left" />
        </motion.span>
      </AnimatePresence>
      <div :class="fieldVariants.inputContent()">
        <slot
          v-if="size !== 'sm' || alwaysShowLabel"
          name="label"
          :id="labelId"
          :for="inputId"
          :class="fieldVariants.label()"
        />
        <slot
          :class="fieldVariants.inputField()"
          :disabled="isDisabled"
          :id="inputId"
          tabindex="0"
          :aria-labelledby="$slots.label ? labelId : undefined"
          :aria-describedby="$slots.description ? descriptionId : undefined"
          :aria-invalid="$slots.error ? 'true' : undefined"
          :aria-errormessage="$slots.error ? errorId : undefined"
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          :key="rightKey"
          v-if="$slots.right"
          :initial="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
          :exit="{ width: 0, height: 0, opacity: 0, marginLeft: 0 }"
          :animate="{
            width: iconSize,
            height: iconSize,
            opacity: 1,
            marginLeft: iconMargin,
          }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
          :class="[
            fieldVariants.icon({ size }),
            'field--right-icon',
            {
              sm: 'ml-2xs',
              md: 'ml-xs',
              lg: 'ml-2xs',
            }[size ?? 'lg'],
          ]"
          v-tw-merge
        >
          <slot name="right" />
        </motion.span>
      </AnimatePresence>
    </div>
    <slot
      name="description"
      :id="descriptionId"
      :class="fieldVariants.description({ size })"
    />
    <slot
      name="error"
      :id="errorId"
      role="alert"
      :class="fieldVariants.error({ size })"
    />
  </component>
  <slot name="after" :inputId :labelId />
</template>
