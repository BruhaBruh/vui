<script setup lang="ts">
import { computedVariants, useRipple, useToggleButton } from '@/composables';
import { computed, useTemplateRef } from 'vue';
import { AnimatePresence } from 'motion-v';
import {
  type IconButtonVariants,
  iconButtonVariants,
} from './ui-icon-button.variants';
import {
  Icon,
  type IconProps,
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import {
  iconButtonBorderRadius,
  iconButtonBorderRadiusAlt,
  iconButtonIconSize,
  iconButtonWidth,
} from './ui-icon-button.options';
import { transitionConfig } from '@/config';

export type IconButtonProps = Omit<MotionComponentProps, 'asChild'> & {
  loading?: IconProps['icon'];
  icon?: IconProps['icon'];
  badgeColor?: IconProps['color'];
  badgeValue?: IconProps['value'];
  badgeMaxValue?: IconProps['maxValue'];
  size?: IconButtonVariants['size'];
  shape?: IconButtonVariants['shape'];
  variant?: IconButtonVariants['variant'];
  color?: IconButtonVariants['color'];
  width?: IconButtonVariants['width'];
  toggleable?: boolean;
  selected?: boolean;
};

const {
  loading,
  icon,
  badgeColor,
  badgeValue,
  badgeMaxValue,
  size = 'sm',
  shape = 'rounded',
  variant = 'filled',
  color = 'primary',
  width = 'default',
  toggleable,
  selected,
  as = 'button',
  initial,
  animate,
  exit,
  ...motionProps
} = defineProps<IconButtonProps>();

const emit = defineEmits<{
  select: [];
}>();

const elementRef = useTemplateRef<HTMLElement>('icon-button');

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
  width,
}));

const borderRadius = computed(() => {
  if (toggleable) {
    return selected
      ? iconButtonBorderRadiusAlt[shape][size]
      : iconButtonBorderRadius[shape][size];
  }
  if (shape === 'rounded' && isPressed.value) {
    return iconButtonBorderRadiusAlt[shape][size];
  }
  return iconButtonBorderRadius[shape][size];
});

const buttonWidth = computed(() => {
  return iconButtonWidth[size][width];
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
    ref="icon-button"
    :as
    tabindex="0"
    v-bind="motionProps"
    :initial="{
      width: buttonWidth,
      borderRadius,
      transition: transitionConfig.preset.short.enter.asMotion(),
      ...initialObject,
    }"
    :animate="{
      width: buttonWidth,
      height: iconButtonWidth[size]['default'],
      borderRadius,
      transition: transitionConfig.preset.short.beginEnd.asMotion(),
      ...animateObject,
    }"
    :exit="{
      transition: transitionConfig.preset.short.exit.asMotion(),
      ...exitObject,
    }"
    :class="iconButtonVariants(variants)"
  >
    <AnimatePresence mode="wait" :initial="false">
      <MotionComponent
        as-child
        :key="JSON.stringify(icon)"
        :initial="{
          width: 0,
          height: 0,
          transition: transitionConfig.preset.short.enter.asMotion(),
        }"
        :animate="{
          width: iconButtonIconSize[size],
          height: iconButtonIconSize[size],
          transition: transitionConfig.preset.short.beginEnd.asMotion(),
        }"
        :exit="{
          width: 0,
          height: 0,
          transition: transitionConfig.preset.short.exit.asMotion(),
        }"
        :class="iconButtonVariants.icon(variants)"
      >
        <slot v-if="$slots.default || !(loading ?? icon)" />
        <Icon
          v-else
          :icon="loading ?? icon!"
          :badge="badgeValue !== undefined"
          :color="badgeColor"
          :value="badgeValue"
          :max-value="badgeMaxValue"
          :class="[loading && 'animate-spin']"
        />
      </MotionComponent>
    </AnimatePresence>
  </MotionComponent>
</template>
