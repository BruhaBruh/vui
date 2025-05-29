<script setup lang="ts">
import { IconButton, type IconButtonVariants } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const icons = ['tabler:square-rounded', 'tabler:circle'];

const sizes = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] satisfies IconButtonVariants['size'][];

const shapes = ['rounded', 'square'] satisfies IconButtonVariants['shape'][];

const variants = [
  'filled',
  'tonal',
  'outlined',
  'standard',
] satisfies IconButtonVariants['variant'][];

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies IconButtonVariants['color'][];

const widths = [
  'default',
  'narrow',
  'wide',
] satisfies IconButtonVariants['width'][];

const code = ref('');

function onChange({
  icon,
  size,
  shape,
  variant,
  color,
  toggleable,
  selected,
  disabled,
}: UnknownRecord) {
  code.value = `
<IconButton
  icon="${icon}"
  size="${size}"
  shape="${shape}"
  variant="${variant}"
  color="${color}"
  :toggleable="${toggleable}"
  :selected="${selected}"
  :disabled="${disabled}"
  @select="console.log('on select')"
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
        description: 'Icon of IconButton',
        defaultValue: 'tabler:square-rounded',
        options: icons,
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of IconButton',
        defaultValue: 'sm',
        options: sizes,
      },
      shape: {
        type: 'select',
        label: 'Shape',
        description: 'Shapes of IconButton',
        defaultValue: 'rounded',
        options: shapes,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of IconButton',
        defaultValue: 'filled',
        options: variants,
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of IconButton',
        defaultValue: 'primary',
        options: colors,
      },
      width: {
        type: 'select',
        label: 'Width',
        description: 'Width of IconButton',
        defaultValue: 'default',
        options: widths,
      },
      toggleable: {
        type: 'switch',
        label: 'Toggleable',
        description: 'Toggleable state of IconButton',
        defaultValue: false,
      },
      selected: {
        type: 'switch',
        label: 'Selected',
        description: 'Selected state of IconButton',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of IconButton',
        defaultValue: false,
      },
    }"
  >
    <template #default="{ values: { icon, ...values }, set }">
      <IconButton
        v-bind="values"
        :icon="icon as string"
        @select="set({ selected: !values.selected })"
      />
    </template>
  </StorybookPlayground>
  <StorybookCode name="IconButton" :code />
  <StorybookStory name="As link">
    <IconButton :as="RouterLink" to="#" icon="tabler:square-rounded" />
  </StorybookStory>
  <StorybookStory name="Sizes">
    <IconButton
      v-for="size in sizes"
      :key="size"
      :size
      icon="tabler:square-rounded"
    />
  </StorybookStory>
  <StorybookStory name="Widths">
    <IconButton
      v-for="width in widths"
      :key="width"
      :width
      icon="tabler:square-rounded"
    />
  </StorybookStory>
  <StorybookStory name="Sizes & Widths">
    <div class="flex flex-col items-center gap-md">
      <div
        class="flex items-center gap-md"
        v-for="width in widths"
        :key="width"
      >
        <IconButton
          v-for="size in sizes"
          :key="size"
          :width
          :size
          icon="tabler:square-rounded"
        />
      </div>
    </div>
  </StorybookStory>
  <StorybookStory name="Shapes">
    <IconButton
      v-for="shape in shapes"
      :key="shape"
      :shape
      icon="tabler:square-rounded"
    />
  </StorybookStory>
  <StorybookStory name="Variants">
    <IconButton
      v-for="variant in variants"
      :key="variant"
      :variant
      icon="tabler:square-rounded"
    />
  </StorybookStory>
  <StorybookStory name="Colors">
    <IconButton
      v-for="color in colors"
      :key="color"
      :color
      icon="tabler:square-rounded"
    />
  </StorybookStory>
</template>
