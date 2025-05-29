<script setup lang="ts">
import { switchVariants } from './ui-switch.variants';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import type { SwitchVariants } from './ui-switch.variants';
import { useTemplateRef } from 'vue';
import { computedVariants, useInteractions } from '@/composables';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing, transitionConfig } from '@/config';
import {
  Icon,
  type IconProps,
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';

export type SwitchProps = MotionComponentProps & {
  color?: SwitchVariants['color'];
  checkedIcon?: IconProps['icon'];
  uncheckedIcon?: IconProps['icon'];
  checked?: boolean;
  disabled?: boolean;
};

const {
  color,
  checkedIcon,
  uncheckedIcon,
  checked,
  disabled,
  as = 'div',
  initial,
  animate,
  exit,
  ...motionProps
} = defineProps<SwitchProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement>('switch');
const inputRef = useTemplateRef<HTMLInputElement>('input');

const emit = defineEmits<{
  change: [checked: boolean];
}>();

function attrsWithoutClass(attrs: UnknownRecord) {
  const newAttrs = { ...attrs };
  if ('class' in newAttrs) delete newAttrs.class;
  return newAttrs;
}

function onClick() {
  emit('change', !checked);
  if (!elementRef.value) return;
  inputRef.value?.focus();
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;
  emit('change', Boolean(target.checked));
}

const { isPressed } = useInteractions(elementRef, {
  disabled: false,
});

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
    ref="switch"
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
    :class="[switchVariants({ color, isSelected: checked }), $attrs.class]"
    :data-is-disabled="disabled ? 'true' : undefined"
    @click="onClick"
    v-tw-merge
  >
    <input
      ref="input"
      type="checkbox"
      role="switch"
      class="sr-only"
      :disabled
      :checked
      @change="onChange"
      v-bind="attrsWithoutClass($attrs)"
      v-tw-merge
    />
    <span
      aria-hidden
      :class="switchVariants.thumbWrapper({ color, isSelected: checked })"
      v-tw-merge
    >
      <motion.span
        :animate="{
          width: isPressed
            ? 'var(--spacing-7)'
            : checked || uncheckedIcon
              ? 'var(--spacing-6)'
              : 'var(--spacing-4)',
          height: isPressed
            ? 'var(--spacing-7)'
            : checked || uncheckedIcon
              ? 'var(--spacing-6)'
              : 'var(--spacing-4)',
        }"
        :transition="{
          duration: materialDuration.asMotion('medium-1'),
          ease: materialEasing.standard,
        }"
        :class="
          switchVariants.thumb({
            color,
            isSelected: checked,
            size: checked
              ? checkedIcon
                ? 'icon'
                : 'default'
              : uncheckedIcon
                ? 'icon'
                : 'default',
          })
        "
        v-tw-merge
      >
        <AnimatePresence mode="wait">
          <MotionComponent
            as-child
            v-if="checked && checkedIcon"
            :key="JSON.stringify(checkedIcon)"
            :initial="{ width: 0, height: 0 }"
            :exit="{ width: 0, height: 0 }"
            :animate="{
              width: 'var(--spacing-4)',
              height: 'var(--spacing-4)',
            }"
            :transition="{
              duration: materialDuration.asMotion('short-2'),
              ease: materialEasing.standard,
            }"
            :class="switchVariants.icon()"
          >
            <Icon :icon="checkedIcon" />
          </MotionComponent>
          <MotionComponent
            as-child
            v-else-if="!checked && uncheckedIcon"
            :key="JSON.stringify(uncheckedIcon)"
            :initial="{ width: 0, height: 0 }"
            :exit="{ width: 0, height: 0 }"
            :animate="{
              width: 'var(--spacing-4)',
              height: 'var(--spacing-4)',
            }"
            :transition="{
              duration: materialDuration.asMotion('short-2'),
              ease: materialEasing.standard,
            }"
            :class="switchVariants.icon()"
          >
            <Icon :icon="uncheckedIcon" />
          </MotionComponent>
        </AnimatePresence>
      </motion.span>
    </span>
  </MotionComponent>
</template>
