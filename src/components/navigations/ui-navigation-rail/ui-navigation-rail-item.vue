<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { Icon, type IconProps, MotionComponent } from '@/components/utility';
import { navigationRailVariants } from './ui-navigation-rail.variants';
import { computed, useTemplateRef } from 'vue';
import { transitionConfig } from '@/config';
import { useInteractions } from '@/composables';
import { AnimatePresence } from 'motion-v';

export type NavigationRailItemProps = PropsPolymorphic & {
  expanded?: boolean;
  icon: IconProps['icon'];
  badgeColor?: IconProps['color'];
  badgeValue?: IconProps['value'];
  badgeMaxValue?: IconProps['maxValue'];
  active?: boolean;
};

const {
  expanded,
  icon,
  badgeColor,
  badgeValue,
  badgeMaxValue,
  active,
  as = 'button',
} = defineProps<NavigationRailItemProps>();

const variants = computed(() => ({ expanded, isSelected: active }));

const elementRef = useTemplateRef<HTMLElement>('navigation-rail-item');

useInteractions(elementRef);
</script>

<template>
  <MotionComponent
    ref="navigation-rail-item"
    :as
    :class="navigationRailVariants.itemContainer()"
  >
    <span :class="navigationRailVariants.item(variants)">
      <MotionComponent
        as="span"
        aria-hidden
        :animate="
          active
            ? { width: '100%', left: 0, opacity: 1 }
            : { width: '0', left: '50%', opacity: 0.1 }
        "
        :transition="transitionConfig.preset.short.beginEnd.asMotion()"
        :class="navigationRailVariants.itemBackground(variants)"
      />
      <span :class="navigationRailVariants.iconContainer(variants)" v-tw-merge>
        <MotionComponent
          as="span"
          aria-hidden
          :animate="
            active
              ? { width: '100%', left: 0, opacity: 1 }
              : { width: '0', left: '50%', opacity: 0.1 }
          "
          :transition="transitionConfig.preset.short.beginEnd.asMotion()"
          :class="navigationRailVariants.iconContainerBackground(variants)"
        />
        <AnimatePresence mode="wait" :initial="false">
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
            :class="navigationRailVariants.icon()"
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
      <span :class="navigationRailVariants.label(variants)" v-tw-merge>
        <slot />
      </span>
    </span>
  </MotionComponent>
</template>
