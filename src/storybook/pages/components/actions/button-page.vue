<script setup lang="ts">
import { Button, type ButtonVariants } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const icons = ['square', 'circle', 'none'];

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] satisfies ButtonVariants['size'][];

const shapes = ['rounded', 'square'] satisfies ButtonVariants['shape'][];

const variants = [
  'elevated',
  'filled',
  'tonal',
  'outlined',
  'text',
] satisfies ButtonVariants['variant'][];

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies ButtonVariants['color'][];

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
      leading: {
        type: 'select',
        label: 'Leading Icon',
        description: 'Leading Icon of Button',
        defaultValue: 'none',
        options: icons,
      },
      trailing: {
        type: 'select',
        label: 'Trailing Icon',
        description: 'Trailing Icon of Button',
        defaultValue: 'none',
        options: icons,
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of Button',
        defaultValue: 'sm',
        options: sizes,
      },
      shape: {
        type: 'select',
        label: 'Shape',
        description: 'Shapes of Button',
        defaultValue: 'rounded',
        options: shapes,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Button',
        defaultValue: 'filled',
        options: variants,
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Button',
        defaultValue: 'primary',
        options: colors,
      },
      toggleable: {
        type: 'switch',
        label: 'Toggleable',
        description: 'Toggleable state of Button',
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
        description: 'Disabled state of Button',
        defaultValue: false,
      },
    }"
  >
    <template #default="{ values: { leading, trailing, ...values }, set }">
      <Button
        v-bind="values"
        :leading-key="leading as string"
        :trailing-key="trailing as string"
        @select="set({ selected: !values.selected })"
      >
        <template v-if="leading !== 'none'" #leading>
          <IconSquare v-if="leading === 'square'" />
          <IconCircle v-else />
        </template>
        Button
        <template v-if="trailing !== 'none'" #trailing>
          <IconSquare v-if="trailing === 'square'" />
          <IconCircle v-else />
        </template>
      </Button>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Button" :code />
  <StorybookStory name="As link">
    <Button :as="RouterLink" to="#">
      <template #leading>
        <IconSquare />
      </template>
      Link
      <template #trailing>
        <IconSquare />
      </template>
    </Button>
  </StorybookStory>
  <StorybookStory name="Sizes">
    <div class="flex flex-col items-center gap-md">
      <Button v-for="size in sizes" :key="size" :size> Button </Button>
    </div>
  </StorybookStory>
  <StorybookStory name="Shapes">
    <Button v-for="shape in shapes" :key="shape" :shape> Button </Button>
  </StorybookStory>
  <StorybookStory name="Variants">
    <Button v-for="variant in variants" :key="variant" :variant>
      Button
    </Button>
  </StorybookStory>
  <StorybookStory name="Colors">
    <Button v-for="color in colors" :key="color" :color> Button </Button>
  </StorybookStory>
</template>
