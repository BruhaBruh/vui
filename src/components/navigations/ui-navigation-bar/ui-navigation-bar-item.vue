<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { navigationBarVariants } from './ui-navigation-bar.variants';
import { useTemplateRef } from 'vue';
import { useInteractions } from '@/composables';
import { MotionComponent } from '@/components/utility';
import { Badge, type BadgeProps } from '@/components/communications';
import { transitionConfig } from '@/config';
import { AnimatePresence } from 'motion-v';

export type NavigationBarItemProps = PropsPolymorphic & {
  active?: boolean;
  badgeColor?: BadgeProps['color'];
  value?: BadgeProps['value'];
  maxValue?: BadgeProps['maxValue'];
};

const {
  active,
  badgeColor,
  value = -1,
  maxValue,
  as = 'button',
} = defineProps<NavigationBarItemProps>();

const elementRef = useTemplateRef<HTMLElement>('navigation-bar-item');

useInteractions(elementRef);
</script>

<template>
  <component
    ref="navigation-bar-item"
    :is="as"
    :class="navigationBarVariants.itemContainer()"
    v-tw-merge
  >
    <span :class="navigationBarVariants.item({ isSelected: active })">
      <MotionComponent
        as="span"
        aria-hidden
        :animate="
          active
            ? { width: '100%', left: 0, opacity: 1 }
            : { width: '0', left: '50%', opacity: 0.1 }
        "
        :transition="transitionConfig.preset.short.beginEnd.asMotion()"
        :class="navigationBarVariants.itemBackground()"
      />
      <span
        :class="navigationBarVariants.iconContainer({ isSelected: active })"
        v-tw-merge
      >
        <MotionComponent
          as="span"
          aria-hidden
          :animate="
            active
              ? { width: '100%', left: 0, opacity: 1 }
              : { width: '0', left: '50%', opacity: 0.1 }
          "
          :transition="transitionConfig.preset.short.beginEnd.asMotion()"
          :class="navigationBarVariants.iconContainerBackground()"
        />
        <Badge as="span" placement="icon" :color="badgeColor" :value :max-value>
          <AnimatePresence mode="wait">
            <MotionComponent
              as-child
              tabindex="-1"
              :key="
                active && $slots['selected-icon'] ? 'selected' : 'unselected'
              "
              :initial="{
                width: 0,
                height: 0,
                transition: transitionConfig.preset.short.enter.asMotion(),
              }"
              :animate="{
                width: 'var(--spacing-5)',
                height: 'var(--spacing-5)',
                transition: transitionConfig.preset.short.beginEnd.asMotion(),
              }"
              :exit="{
                width: 0,
                height: 0,
                transition: transitionConfig.preset.short.exit.asMotion(),
              }"
              :class="navigationBarVariants.icon()"
            >
              <slot v-if="!active || !$slots['selected-icon']" name="icon" />
              <slot v-else name="selected-icon" />
            </MotionComponent>
          </AnimatePresence>
        </Badge>
      </span>
      <span :class="navigationBarVariants.label()" v-tw-merge>
        <slot />
      </span>
    </span>
  </component>
</template>
