<script setup lang="ts">
import type { PropsPolymorphic } from '@/types';
import { type AppBarVariants, appBarVariants } from './ui-app-bar.variants';
import { computed } from 'vue';
import { MotionComponent, Slot } from '@/components/utility';

export type AppBarProps = PropsPolymorphic & {
  variant?: AppBarVariants['variant'];
  centered?: boolean;
};

const { variant = 'search', centered, as = 'div' } = defineProps<AppBarProps>();

const variants = computed(() => ({ variant, centered }));
</script>

<template>
  <MotionComponent :as :class="appBarVariants(variants)">
    <div :class="appBarVariants.top(variants)" v-tw-merge>
      <div :class="appBarVariants.topItem({ position: 'leading' })" v-tw-merge>
        <slot name="leading" />
      </div>
      <Slot :class="appBarVariants.topItem({ position: 'center' })">
        <slot v-if="variant === 'search'" name="search-bar" />
        <div
          v-if="variant === 'small' && $slots.title"
          :class="appBarVariants.text(variants)"
          v-tw-merge
        >
          <p :class="appBarVariants.title(variants)" v-tw-merge>
            <slot name="title" />
          </p>
          <p
            v-if="$slots.subtitle"
            :class="appBarVariants.subtitle(variants)"
            v-tw-merge
          >
            <slot name="subtitle" />
          </p>
        </div>
      </Slot>
      <div :class="appBarVariants.topItem({ position: 'trailing' })" v-tw-merge>
        <slot name="trailing" />
      </div>
    </div>
    <div
      v-if="variant === 'medium' || variant === 'large'"
      :class="appBarVariants.text(variants)"
      v-tw-merge
    >
      <p :class="appBarVariants.title(variants)" v-tw-merge>
        <slot name="title" />
      </p>
      <p
        v-if="$slots.subtitle"
        :class="appBarVariants.subtitle(variants)"
        v-tw-merge
      >
        <slot name="subtitle" />
      </p>
    </div>
  </MotionComponent>
</template>
