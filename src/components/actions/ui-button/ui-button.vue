<script setup lang="ts">
import { useRipple, useToggleButton } from '@/composables';
import type { MotionPropsPolymorphic } from '@/types';
import { computed, useTemplateRef } from 'vue';
import { type ButtonVariants, buttonVariants } from './ui-button.variants';
import { AnimatePresence, Motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import {
  buttonBorderRadius,
  buttonBorderRadiusAlt,
  buttonIconMargin,
  buttonIconSize,
} from './ui-button.options';
import { Slot } from '@/components/utility';

export type ButtonProps = MotionPropsPolymorphic & {
  size?: ButtonVariants['size'];
  shape?: ButtonVariants['shape'];
  variant?: ButtonVariants['variant'];
  color?: ButtonVariants['color'];
  toggleable?: boolean;
  selected?: boolean;
  leadingKey?: string;
  trailingKey?: string;
};

const {
  size = 'sm',
  shape = 'rounded',
  variant = 'filled',
  color = 'primary',
  toggleable,
  selected,
  as = 'button',
  leadingKey,
  trailingKey,
} = defineProps<ButtonProps>();

const emit = defineEmits<{
  select: [];
}>();

const elementRef = useTemplateRef<HTMLElement>('button');

const { isPressed } = useToggleButton(elementRef, {
  isToggleable: () => toggleable,
  isSelected: () => selected,
  onClick: () => {
    if (!toggleable) return;
    emit('select');
  },
  elementType: as === 'button' ? 'button' : '',
});
useRipple(elementRef);

const variants = computed(() => ({
  size,
  shape,
  variant,
  color,
}));

const borderRadius = computed(() => {
  if (toggleable) {
    return selected
      ? buttonBorderRadiusAlt[shape][size]
      : buttonBorderRadius[shape][size];
  }
  if (shape === 'rounded' && isPressed.value) {
    return buttonBorderRadiusAlt[shape][size];
  }
  return buttonBorderRadius[shape][size];
});
</script>

<template>
  <Motion
    as-child
    :initial="{ borderRadius }"
    :animate="{ borderRadius }"
    :transition="{
      duration: materialDuration.asMotion('medium-1'),
      ease: materialEasing.standard,
    }"
  >
    <component
      :is="as"
      ref="button"
      tabindex="0"
      :class="buttonVariants(variants)"
      v-tw-merge
    >
      <AnimatePresence mode="wait">
        <Motion
          as-child
          v-if="$slots.leading"
          :key="leadingKey"
          :initial="{ width: 0, height: 0, marginRight: 0 }"
          :animate="{
            width: buttonIconSize[size],
            height: buttonIconSize[size],
            marginRight: buttonIconMargin[size],
          }"
          :exit="{ width: 0, height: 0, marginRight: 0 }"
        >
          <Slot
            :class="buttonVariants.icon({ ...variants, position: 'leading' })"
            v-tw-merge
          >
            <slot name="leading" />
          </Slot>
        </Motion>
      </AnimatePresence>
      <span :class="buttonVariants.label(variants)" v-tw-merge>
        <slot />
      </span>
      <AnimatePresence mode="wait">
        <Motion
          as-child
          v-if="$slots.trailing"
          :key="trailingKey"
          :initial="{ width: 0, height: 0, marginLeft: 0 }"
          :animate="{
            width: buttonIconSize[size],
            height: buttonIconSize[size],
            marginLeft: buttonIconMargin[size],
          }"
          :exit="{ width: 0, height: 0, marginLeft: 0 }"
        >
          <Slot
            :class="buttonVariants.icon({ ...variants, position: 'trailing' })"
            v-tw-merge
          >
            <slot name="trailing" />
          </Slot>
        </Motion>
      </AnimatePresence>
    </component>
  </Motion>
</template>
