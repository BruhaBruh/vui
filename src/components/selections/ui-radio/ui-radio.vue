<script setup lang="ts">
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { useTemplateRef } from 'vue';
import { computedVariants, useInteractions, useRipple } from '@/composables';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing, transitionConfig } from '@/config';
import { radioVariants } from './ui-radio.variants';
import type { RadioVariants } from './ui-radio.variants';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type RadioProps = MotionComponentProps & {
  value: string | number;
  color?: RadioVariants['color'];
  checked?: boolean;
  disabled?: boolean;
};

const {
  value,
  color,
  checked,
  disabled,
  as = 'div',
  initial,
  animate,
  exit,
  ...motionProps
} = defineProps<RadioProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement>('radio');

const emit = defineEmits<{
  change: [];
}>();

const group = defineModel<string | number | undefined>('group', {
  default: undefined,
});

function attrsWithoutClass(attrs: UnknownRecord) {
  const newAttrs = { ...attrs };
  if ('class' in newAttrs) delete newAttrs.class;
  return newAttrs;
}

function update() {
  emit('change');
  if (group.value !== undefined) {
    group.value = value;
  }
}

function onClick() {
  update();
  if (!elementRef.value) return;
  const inputElement = elementRef.value.querySelector('input');
  inputElement?.focus();
}

function onChange() {
  update();
}

useInteractions(elementRef, {
  disabled: false,
});
useRipple(elementRef);

const {
  initial: initialObject,
  animate: animateObject,
  exit: exitObject,
} = computedVariants(() => ({
  initial,
  animate,
  exit,
}));
</script>

<template>
  <MotionComponent
    :as
    ref="radio"
    v-bind="motionProps"
    :initial="{
      transition: transitionConfig.preset.short.enter.asMotion(),
      ...initialObject,
    }"
    :animate="{
      transition: transitionConfig.preset.short.beginEnd.asMotion(),
      ...animateObject,
    }"
    :exit="{
      transition: transitionConfig.preset.short.exit.asMotion(),
      ...exitObject,
    }"
    :class="[radioVariants({ color }), $attrs.class]"
    :data-is-disabled="disabled ? 'true' : undefined"
    @click="onClick"
    v-tw-merge
  >
    <input
      type="radio"
      class="sr-only"
      :disabled
      :checked="group === value || checked"
      :value
      @change="onChange"
      v-bind="attrsWithoutClass($attrs)"
      v-tw-merge
    />
    <span
      aria-hidden
      :class="
        radioVariants.mark({
          color,
          checked: group === value || checked,
        })
      "
      v-tw-merge
    >
      <AnimatePresence mode="wait">
        <motion.span
          v-if="group === value || checked"
          :initial="{ scale: 0, opacity: 0 }"
          :exit="{ scale: 0, opacity: 0 }"
          :animate="{
            scale: 1,
            opacity: 1,
          }"
          :transition="{
            duration: materialDuration.asMotion('short-2'),
            ease: materialEasing.standard,
          }"
          :class="radioVariants.icon({ color })"
          v-tw-merge
        />
      </AnimatePresence>
    </span>
  </MotionComponent>
</template>
