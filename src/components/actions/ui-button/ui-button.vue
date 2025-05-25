<script setup lang="ts">
import { computedVariants, useRipple, useToggleButton } from '@/composables';
import { computed, useTemplateRef } from 'vue';
import { type ButtonVariants, buttonVariants } from './ui-button.variants';
import { AnimatePresence } from 'motion-v';
import {
  buttonBorderRadius,
  buttonBorderRadiusAlt,
  buttonIconMargin,
  buttonIconSize,
} from './ui-button.options';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import { transitionConfig } from '@/config';

export type ButtonProps = Omit<MotionComponentProps, 'asChild'> & {
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
  initial,
  animate,
  exit,
  ...motionProps
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
    ref="button"
    :as
    tabindex="0"
    v-bind="motionProps"
    :initial="{
      borderRadius,
      transition: transitionConfig.preset.short.enter.asMotion(),
      ...initialObject,
    }"
    :animate="{
      borderRadius,
      transition: transitionConfig.preset.short.beginEnd.asMotion(),
      ...animateObject,
    }"
    :exit="{
      transition: transitionConfig.preset.short.exit.asMotion(),
      ...exitObject,
    }"
    :class="buttonVariants(variants)"
  >
    <AnimatePresence mode="wait">
      <MotionComponent
        as-child
        v-if="$slots.leading"
        :key="leadingKey"
        :initial="{
          width: 0,
          height: 0,
          marginRight: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        }"
        :animate="{
          width: buttonIconSize[size],
          height: buttonIconSize[size],
          marginRight: buttonIconMargin[size],
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        }"
        :exit="{
          width: 0,
          height: 0,
          marginRight: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        }"
        :class="buttonVariants.icon({ ...variants, position: 'leading' })"
      >
        <slot name="leading" />
      </MotionComponent>
    </AnimatePresence>
    <span :class="buttonVariants.label(variants)" v-tw-merge>
      <slot />
    </span>
    <AnimatePresence mode="wait">
      <MotionComponent
        as-child
        v-if="$slots.trailing"
        :key="trailingKey"
        :initial="{
          width: 0,
          height: 0,
          marginLeft: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        }"
        :animate="{
          width: buttonIconSize[size],
          height: buttonIconSize[size],
          marginLeft: buttonIconMargin[size],
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        }"
        :exit="{
          width: 0,
          height: 0,
          marginLeft: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        }"
        :class="buttonVariants.icon({ ...variants, position: 'trailing' })"
      >
        <slot name="trailing" />
      </MotionComponent>
    </AnimatePresence>
  </MotionComponent>
</template>
