<script setup lang="ts">
import { ExtendedFab, type ExtendedFabVariants } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const icons = ['tabler:square-rounded', 'tabler:circle', 'none'];

const sizes = ['sm', 'md', 'lg'] satisfies ExtendedFabVariants['size'][];

const variants = ['filled', 'tonal'] satisfies ExtendedFabVariants['variant'][];

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies ExtendedFabVariants['color'][];

const code = ref('');

function onChange({ icon, size, variant, color }: UnknownRecord) {
  code.value = `
<ExtendedFab
  ${icon === 'none' ? '' : `icon="${icon}"`}
  size="${size}"
  variant="${variant}"
  color=${color}
>
  ExtendedFab
</ExtendedFab>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      icon: {
        type: 'select',
        label: 'Icon',
        description: 'Icon of ExtendedFab',
        defaultValue: 'none',
        options: icons,
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of ExtendedFab',
        defaultValue: 'sm',
        options: sizes,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of ExtendedFab',
        defaultValue: 'filled',
        options: variants,
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of ExtendedFab',
        defaultValue: 'primary',
        options: colors,
      },
    }"
  >
    <template #default="{ values: { icon, ...values } }">
      <ExtendedFab
        v-bind="values"
        :icon="icon === 'none' ? undefined : (icon as string)"
      >
        ExtendedFab
      </ExtendedFab>
    </template>
  </StorybookPlayground>
  <StorybookCode name="ExtendedFab" :code />
  <StorybookStory name="As link">
    <ExtendedFab :as="RouterLink" to="#" icon="tabler:square-rounded">
      Link
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="Sizes">
    <div class="flex flex-col items-center gap-md">
      <ExtendedFab
        v-for="size in sizes"
        :key="size"
        :size
        icon="tabler:square-rounded"
      >
        ExtendedFab
      </ExtendedFab>
    </div>
  </StorybookStory>
  <StorybookStory name="Variants">
    <ExtendedFab
      v-for="variant in variants"
      :key="variant"
      :variant
      icon="tabler:square-rounded"
    >
      ExtendedFab
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="Colors">
    <div class="flex flex-col gap-md">
      <ExtendedFab
        v-for="color in colors"
        :key="color"
        :color
        icon="tabler:square-rounded"
      >
        ExtendedFab
      </ExtendedFab>
    </div>
  </StorybookStory>
</template>
