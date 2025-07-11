<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { navigationBarVariants } from './ui-navigation-bar.variants';
import { useTemplateRef } from 'vue';
import { useInteractions } from '@/composables';
import { Icon, type IconProps, MotionComponent } from '@/components/utility';
import { transitionConfig } from '@/config';
import { AnimatePresence } from 'motion-v';

export type NavigationBarItemProps = PropsPolymorphic & {
  icon: IconProps['icon'];
  badgeColor?: IconProps['color'];
  badgeValue?: IconProps['value'];
  badgeMaxValue?: IconProps['maxValue'];
  active?: boolean;
};

const {
  icon,
  badgeColor,
  badgeValue,
  badgeMaxValue,
  active,
  as = 'button',
} = defineProps<NavigationBarItemProps>();

const elementRef = useTemplateRef<HTMLElement>('navigation-bar-item');

useInteractions(elementRef);
</script>

<template>
  <component
    ref="navigation-bar-item"
    :is="as"
    :class="navigationBarVariants.itemContainer({})"
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
        <AnimatePresence mode="wait">
          <MotionComponent
            as-child
            tabindex="-1"
            :key="JSON.stringify(icon)"
            :initial="{
              width: 0,
              height: 0,
              transition: transitionConfig.preset.short.enter.asMotion(),
            }"
            :animate="{
              width: 'var(--spacing-6)',
              height: 'var(--spacing-6)',
              transition: transitionConfig.preset.short.beginEnd.asMotion(),
            }"
            :exit="{
              width: 0,
              height: 0,
              transition: transitionConfig.preset.short.exit.asMotion(),
            }"
            :class="navigationBarVariants.icon()"
          >
            <Icon
              :icon
              :badge="badgeValue !== undefined"
              :color="badgeColor"
              :value="badgeValue"
              :max-value="badgeMaxValue"
            />
          </MotionComponent>
        </AnimatePresence>
      </span>
      <span :class="navigationBarVariants.label()" v-tw-merge>
        <slot />
      </span>
    </span>
  </component>
</template>
