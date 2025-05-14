<script setup lang="ts">
import { useRipple, useToggleButton } from '@/composables';
import type { PropsPolymorphic } from '@/types';
import { computed, useTemplateRef } from 'vue';
import { AnimatePresence, Motion } from 'motion-v';
import { materialDuration, materialEasing } from '@/config';
import {
  type IconButtonVariants,
  iconButtonVariants,
} from './ui-icon-button.variants';
import { Slot } from '@/components/utility';
import {
  iconButtonBorderRadius,
  iconButtonBorderRadiusAlt,
  iconButtonIconSize,
} from './ui-icon-button.options';

export type IconButtonProps = PropsPolymorphic & {
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
      ref="icon-button"
      tabindex="0"
      :class="iconButtonVariants(variants)"
      v-tw-merge
    >
      <AnimatePresence mode="wait">
        <Motion
          as-child
          :key="iconKey"
          :initial="{ width: 0, height: 0, opacity: 0 }"
          :animate="{
            width: iconButtonIconSize[size],
            height: iconButtonIconSize[size],
            opacity: 1,
          }"
          :exit="{ width: 0, height: 0, opacity: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
        >
          <Slot :class="iconButtonVariants.icon(variants)" v-tw-merge>
            <slot />
          </Slot>
        </Motion>
      </AnimatePresence>
    </component>
  </Motion>
</template>
