<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { computed, useTemplateRef } from 'vue';
import { useInteractions, useRipple } from '@/composables';
import { AnimatePresence, motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import { checkboxVariants } from './ui-checkbox.variants';
import type {
  CheckboxMarkVariants,
  CheckboxVariants,
} from './ui-checkbox.variants';
import { IconCheck, IconMinus } from '@tabler/icons-vue';

export type CheckboxProps = PropsPolymorphic & {
  color?: CheckboxVariants['color'];
  indeterminate?: boolean;
  disabled?: boolean;
};

const {
  color,
  disabled,
  indeterminate,
  as = 'div',
} = defineProps<CheckboxProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement>('checkbox');

const checked = defineModel<boolean>('checked', {
  default: false,
});

const state = computed<NonNullable<CheckboxMarkVariants['state']>>(() => {
  if (checked.value) return 'checked';
  if (indeterminate) return 'indeterminate';
  return 'unchecked';
});

function attrsWithoutClass(attrs: UnknownRecord) {
  const newAttrs = { ...attrs };
  if ('class' in newAttrs) delete newAttrs.class;
  return newAttrs;
}

useInteractions(elementRef, {
  disabled: false,
});
useRipple(elementRef);
</script>

<template>
  <component
    :is="as"
    ref="checkbox"
    :class="[checkboxVariants({ color }), $attrs.class]"
    :data-is-disabled="disabled ? 'true' : undefined"
    @click="checked = !checked"
    v-tw-merge
  >
    <input
      type="checkbox"
      role="switch"
      class="sr-only"
      :indeterminate
      :disabled
      v-model="checked"
      v-bind="attrsWithoutClass($attrs)"
      v-tw-merge
    />
    <span :class="checkboxVariants.mark({ color, state })" v-tw-merge>
      <AnimatePresence mode="wait">
        <motion.span
          :key="state"
          v-if="state !== 'unchecked'"
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
          :class="checkboxVariants.icon()"
          v-tw-merge
        >
          <IconCheck v-if="state === 'checked'" />
          <IconMinus v-else-if="state === 'indeterminate'" />
        </motion.span>
      </AnimatePresence>
    </span>
  </component>
</template>
