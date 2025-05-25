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
    <div :class="appBarVariants.topContainer(variants)" v-tw-merge>
      <slot name="leading" />
      <Slot :class="appBarVariants.searchBar()">
        <slot v-if="variant === 'search'" name="search-bar" />
      </Slot>
      <div
        v-if="variant === 'small' && $slots.title"
        :class="appBarVariants.titleContainer(variants)"
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
      <slot name="trailing" />
    </div>
    <div
      v-if="variant === 'medium' || variant === 'large'"
      :class="appBarVariants.bottomContainer(variants)"
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
