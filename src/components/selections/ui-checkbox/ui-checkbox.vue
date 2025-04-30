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
  value: string | number;
  color?: CheckboxVariants['color'];
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
};

const {
  value,
  color,
  disabled,
  checked,
  indeterminate,
  as = 'div',
} = defineProps<CheckboxProps>();

defineOptions({
  inheritAttrs: false,
});

const elementRef = useTemplateRef<HTMLElement>('checkbox');

const emit = defineEmits<{
  change: [checked: boolean];
}>();

const group = defineModel<(string | number)[] | undefined>('group', {
  default: undefined,
});

const state = computed<NonNullable<CheckboxMarkVariants['state']>>(() => {
  if (group.value?.includes(value) || checked) return 'checked';
  if (indeterminate) return 'indeterminate';
  return 'unchecked';
});

function attrsWithoutClass(attrs: UnknownRecord) {
  const newAttrs = { ...attrs };
  if ('class' in newAttrs) delete newAttrs.class;
  return newAttrs;
}

function update(isChecked: boolean) {
  emit('change', isChecked);
  if (!group.value) return;
  if (isChecked) {
    group.value = [...group.value.filter((v) => v !== value), value];
  } else {
    group.value = group.value.filter((v) => v !== value);
  }
}

function onClick() {
  update(!(group.value?.includes(value) || checked));
  if (!elementRef.value) return;
  const inputElement = elementRef.value.querySelector('input');
  inputElement?.focus();
}

function onChange(e: Event) {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;
  update(Boolean(target.checked));
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
    @click="onClick"
    v-tw-merge
  >
    <input
      type="checkbox"
      class="sr-only"
      :indeterminate
      :disabled
      :checked="group?.includes(value) || checked"
      :value
      @change="onChange"
      v-bind="attrsWithoutClass($attrs)"
      v-tw-merge
    />
    <span
      aria-hidden
      :class="checkboxVariants.mark({ color, state })"
      v-tw-merge
    >
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
