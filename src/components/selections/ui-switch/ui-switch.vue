<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { switchVariants } from './ui-switch.variants';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import type { SwitchVariants } from './ui-switch.variants';
import { useTemplateRef } from 'vue';
import { useInteractions } from '@/composables';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';

export type SwitchProps = PropsPolymorphic & {
  color?: SwitchVariants['color'];
  disabled?: boolean;
};

const { color, disabled, as = 'div' } = defineProps<SwitchProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement>('switch');

const checked = defineModel<boolean>('checked', {
  default: false,
});

function attrsWithoutClass(attrs: UnknownRecord) {
  const newAttrs = { ...attrs };
  if ('class' in newAttrs) delete newAttrs.class;
  return newAttrs;
}

const { isPressed } = useInteractions(elementRef, {
  disabled: false,
});
</script>

<template>
  <component
    :is="as"
    ref="switch"
    :class="[switchVariants({ color, isSelected: checked }), $attrs.class]"
    :data-is-disabled="disabled ? 'true' : undefined"
    @click="checked = !checked"
    v-tw-merge
  >
    <input
      type="checkbox"
      role="switch"
      class="sr-only"
      :disabled
      v-model="checked"
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
            : checked || $slots.unchecked
              ? 'var(--spacing-6)'
              : 'var(--spacing-4)',
          height: isPressed
            ? 'var(--spacing-7)'
            : checked || $slots.unchecked
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
              ? $slots.checked
                ? 'icon'
                : 'default'
              : $slots.unchecked
                ? 'icon'
                : 'default',
          })
        "
        v-tw-merge
      >
        <AnimatePresence mode="wait">
          <motion.span
            v-if="checked"
            :key="`checked-${checked}`"
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
            v-tw-merge
          >
            <slot name="checked" />
          </motion.span>
          <motion.span
            v-else
            :key="`unchecked-${checked}`"
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
            v-tw-merge
          >
            <slot name="unchecked" />
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  </component>
</template>
