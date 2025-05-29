<script setup lang="ts">
import { Fab, type FabVariants } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const icons = ['tabler:square-rounded', 'tabler:circle'];

const sizes = ['sm', 'md', 'lg'] satisfies FabVariants['size'][];

const variants = ['filled', 'tonal'] satisfies FabVariants['variant'][];

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies FabVariants['color'][];

const code = ref('');

function onChange({ icon, size, variant, color }: UnknownRecord) {
  code.value = `
<Fab
  icon="${icon}"
  size="${size}"
  variant="${variant}"
  color=${color}
/>
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
        description: 'Icon of Fab',
        defaultValue: 'tabler:square-rounded',
        options: icons,
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of Fab',
        defaultValue: 'sm',
        options: sizes,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Fab',
        defaultValue: 'filled',
        options: variants,
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Fab',
        defaultValue: 'primary',
        options: colors,
      },
    }"
  >
    <template #default="{ values: { icon, ...values } }">
      <Fab v-bind="values" :icon="icon as string" />
    </template>
  </StorybookPlayground>
  <StorybookCode name="Fab" :code />
  <StorybookStory name="As link">
    <Fab :as="RouterLink" to="#" icon="tabler:square-rounded" />
  </StorybookStory>
  <StorybookStory name="Sizes">
    <div class="flex flex-col items-center gap-md">
      <Fab
        v-for="size in sizes"
        :key="size"
        :size
        icon="tabler:square-rounded"
      />
    </div>
  </StorybookStory>
  <StorybookStory name="Variants">
    <Fab
      v-for="variant in variants"
      :key="variant"
      :variant
      icon="tabler:square-rounded"
    />
  </StorybookStory>
  <StorybookStory name="Colors">
    <Fab
      v-for="color in colors"
      :key="color"
      :color
      icon="tabler:square-rounded"
    />
  </StorybookStory>
</template>
