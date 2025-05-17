<script setup lang="ts">
import { useRipple, useToggleButton } from '@/composables';
import { computed, useTemplateRef } from 'vue';
import { AnimatePresence } from 'motion-v';
import {
  type IconButtonVariants,
  iconButtonVariants,
} from './ui-icon-button.variants';
import {
  MotionComponent,
  type MotionComponentProps,
} from '@/components/utility';
import {
  iconButtonBorderRadius,
  iconButtonBorderRadiusAlt,
  iconButtonIconSize,
} from './ui-icon-button.options';

export type IconButtonProps = Omit<MotionComponentProps, 'asChild'> & {
  size?: IconButtonVariants['size'];
  shape?: IconButtonVariants['shape'];
  variant?: IconButtonVariants['variant'];
  color?: IconButtonVariants['color'];
  width?: IconButtonVariants['width'];
  toggleable?: boolean;
  selected?: boolean;
  iconKey?: string;
};

const {
  size = 'sm',
  shape = 'rounded',
  variant = 'filled',
  color = 'primary',
  width = 'default',
  toggleable,
  selected,
  as = 'button',
  iconKey,
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
</script>

<template>
  <MotionComponent
    ref="icon-button"
    :as
    tabindex="0"
    v-bind="motionProps"
    :initial="{ borderRadius }"
    :animate="{ borderRadius }"
    :class="iconButtonVariants(variants)"
  >
    <AnimatePresence mode="wait">
      <MotionComponent
        as-child
        :key="iconKey"
        :initial="{ width: 0, height: 0 }"
        :animate="{
          width: iconButtonIconSize[size],
          height: iconButtonIconSize[size],
        }"
        :exit="{ width: 0, height: 0 }"
        :class="iconButtonVariants.icon(variants)"
      >
        <slot />
      </MotionComponent>
    </AnimatePresence>
  </MotionComponent>
</template>
