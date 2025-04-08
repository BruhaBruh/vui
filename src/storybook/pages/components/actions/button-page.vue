<script setup lang="ts">
import { Button } from '@/components';
import type { ButtonProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies ButtonProps['color'][];
const variants = [
  'elevated',
  'filled',
  'tonal',
  'outlined',
  'text',
] satisfies ButtonProps['variant'][];
const icons = ['none', 'circle', 'square'];

const code = ref('');

const onChange = ({
  label,
  color,
  variant,
  disabled,
  left,
  right,
}: UnknownRecord) => {
  let leftIcon = '';
  if (left === 'square') {
    leftIcon = '<IconSquare />';
  } else if (left === 'circle') {
    leftIcon = '<IconCircle />';
  }
  let rightIcon = '';
  if (right === 'square') {
    rightIcon = '<IconSquare />';
  } else if (right === 'circle') {
    rightIcon = '<IconCircle />';
  }
  code.value = `
<Button
  color="${color}"
  variant="${variant}"
  :disabled="${disabled}"
>
  ${
    leftIcon
      ? `
  <template #left>
    ${leftIcon}
  </template>`
      : ''
  }
  ${label}
  ${
    rightIcon
      ? `
  <template #right>
    ${rightIcon}
  </template>`
      : ''
  }
</Button>
`;
};
</script>

<template>
  <StorybookPlayground
    @change="(e) => onChange(e)"
    :arguments="{
      label: {
        type: 'text',
        label: 'Label',
        description: 'Label of Button',
        defaultValue: 'Button',
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Button',
        defaultValue: 'primary',
        options: colors,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Button',
        defaultValue: 'elevated',
        options: variants,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of Button',
        defaultValue: false,
      },
      left: {
        type: 'select',
        label: 'Left',
        description: 'Left component of Button',
        defaultValue: 'none',
        options: icons,
      },
      right: {
        type: 'select',
        label: 'Right',
        description: 'Right component of Button',
        defaultValue: 'none',
        options: icons,
      },
    }"
  >
    <template #default="{ values: { label, left, right, ...values } }">
      <Button
        v-bind="values"
        :left-key="left as string"
        :right-key="right as string"
      >
        <template #left v-if="left !== 'none'">
          <IconSquare v-if="left === 'square'" />
          <IconCircle v-else-if="left === 'circle'" />
        </template>
        {{ label }}
        <template #right v-if="right !== 'none'">
          <IconSquare v-if="right === 'square'" />
          <IconCircle v-else-if="right === 'circle'" />
        </template>
      </Button>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Button" :code />
  <StorybookStory name="As Link">
    <Button :as="RouterLink" to="#">Button</Button>
  </StorybookStory>
  <StorybookStory name="Colors">
    <Button v-for="color in colors" :key="color" :color="color">
      Button
    </Button>
    <Button disabled>Button</Button>
  </StorybookStory>
  <StorybookStory name="Variants">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      Button
    </Button>
  </StorybookStory>
  <StorybookStory name="Icons">
    <section
      v-for="variant in ['left', 'both', 'right'] as const"
      :key="variant"
      class="flex flex-col items-center gap-md"
    >
      <Button>
        <template v-if="['left', 'both'].includes(variant)" #left>
          <IconSquare />
        </template>
        Button
        <template v-if="['right', 'both'].includes(variant)" #right>
          <IconSquare />
        </template>
      </Button>
      <Button class="w-64">
        <template v-if="['left', 'both'].includes(variant)" #left>
          <IconSquare />
        </template>
        Button
        <template v-if="['right', 'both'].includes(variant)" #right>
          <IconSquare />
        </template>
      </Button>
    </section>
  </StorybookStory>
  <StorybookStory name="All">
    <section class="grid grid-cols-6 gap-md">
      <template v-for="variant in variants" :key="variant">
        <Button
          v-for="color in colors"
          :key="color"
          :color="color"
          :variant="variant"
        >
          Button
        </Button>
      </template>
    </section>
  </StorybookStory>
</template>
