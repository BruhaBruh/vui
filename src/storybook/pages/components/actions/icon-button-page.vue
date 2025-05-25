<script setup lang="ts">
import { IconButton, type IconButtonVariants } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const icons = ['square', 'circle'];

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
  leading,
  trailing,
  size,
  shape,
  variant,
  color,
  toggleable,
  selected,
  disabled,
}: UnknownRecord) {
  let displayLeadingIcon = '';
  if (leading === 'square') {
    displayLeadingIcon = '<IconSquare />';
  } else if (leading === 'circle') {
    displayLeadingIcon = '<IconCircle />';
  }
  let displayTrailingIcon = '';
  if (trailing === 'square') {
    displayTrailingIcon = '<IconSquare />';
  } else if (leading === 'circle') {
    displayTrailingIcon = '<IconCircle />';
  }
  code.value = `
<Button
  size="${size}"
  shape="${shape}"
  variant="${variant}"
  color="${color}"
  :toggleable="${toggleable}"
  :selected="${selected}"
  :disabled="${disabled}"
  @select="console.log('on select')"
>
  ${displayLeadingIcon}
  Button
  ${displayTrailingIcon}
</Button>
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
        defaultValue: 'square',
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
        :icon-key="icon as string"
        @select="set({ selected: !values.selected })"
      >
        <IconSquare v-if="icon === 'square'" />
        <IconCircle v-else />
      </IconButton>
    </template>
  </StorybookPlayground>
  <StorybookCode name="IconButton" :code />
  <StorybookStory name="As link">
    <IconButton :as="RouterLink" to="#">
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="Sizes">
    <IconButton v-for="size in sizes" :key="size" :size>
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="Widths">
    <IconButton v-for="width in widths" :key="width" :width>
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="Sizes & Widths">
    <div class="flex flex-col items-center gap-md">
      <div
        class="flex items-center gap-md"
        v-for="width in widths"
        :key="width"
      >
        <IconButton v-for="size in sizes" :key="size" :width :size>
          <IconSquare />
        </IconButton>
      </div>
    </div>
  </StorybookStory>
  <StorybookStory name="Shapes">
    <IconButton v-for="shape in shapes" :key="shape" :shape>
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="Variants">
    <IconButton v-for="variant in variants" :key="variant" :variant>
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="Colors">
    <IconButton v-for="color in colors" :key="color" :color>
      <IconSquare />
    </IconButton>
  </StorybookStory>
</template>
