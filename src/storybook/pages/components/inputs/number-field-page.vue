<script setup lang="ts">
import { NumberField, type NumberFieldProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';

const sizes = ['sm', 'md', 'lg'] satisfies NumberFieldProps['size'][];
const icons = ['none', 'circle', 'square'];

const code = ref('');

function onChange({
  label,
  description,
  error,
  left,
  placeholder,
  size,
  invalid,
  disabled,
  min,
  max,
  step,
  stepMultiplier,
}: UnknownRecord) {
  code.value = `
<NumberField
  size="${size}"
  :min="${min}"
  :max="${max}"
  :step="${step}"
  :step-multiplier="${stepMultiplier}"
  ${(placeholder as string).length > 0 ? `placeholder="${placeholder}"` : ''}
  :invalid="${invalid}"
  :disabled="${disabled}"
>
  ${left === 'none' ? '' : '<template #left>'}
    ${left === 'square' ? '<IconSquare />' : ''}
    ${left === 'circle' ? '<IconCircle />' : ''}
  ${left === 'none' ? '' : '</template>'}
  ${(label as string).length > 0 ? '<template #label>' : ''}
    ${label}
  ${(label as string).length > 0 ? '</template>' : ''}
  ${(description as string).length > 0 ? '<template #description>' : ''}
    ${description}
  ${(description as string).length > 0 ? '</template>' : ''}
  ${(error as string).length > 0 ? '<template #error>' : ''}
    ${error}
  ${(error as string).length > 0 ? '</template>' : ''}
</NumberField>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      label: {
        type: 'text',
        label: 'Label',
        description: 'Label of TextField',
        defaultValue: 'Label',
      },
      description: {
        type: 'text',
        label: 'Description',
        description: 'Description of TextField',
        defaultValue: '',
      },
      error: {
        type: 'text',
        label: 'Error',
        description: 'Error of TextField',
        defaultValue: '',
      },
      placeholder: {
        type: 'text',
        label: 'Placeholder',
        description: 'Placeholder of TextField',
        defaultValue: '',
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of TextField',
        defaultValue: 'lg',
        options: sizes,
      },
      invalid: {
        type: 'switch',
        label: 'Invalid',
        description: 'Invalid state of TextField',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of TextField',
        defaultValue: false,
      },
      left: {
        type: 'select',
        label: 'Left',
        description: 'Left component of TextField',
        defaultValue: 'none',
        options: icons,
      },
      min: {
        type: 'number',
        label: 'Minimum value',
        description: 'Minimum value of TextField',
        defaultValue: -0b1000_0000_0000_0000_0000_0000_0000_0000,
      },
      max: {
        type: 'number',
        label: 'Maximum value',
        description: 'Maximum value of TextField',
        defaultValue: 0b0111_1111_1111_1111_1111_1111_1111_1111,
      },
      step: {
        type: 'number',
        label: 'Step value',
        description: 'Step value of TextField',
        defaultValue: 1,
      },
      stepMultiplier: {
        type: 'number',
        label: 'Step multiplier for large step',
        description: 'Step multiplier for large step of TextField',
        defaultValue: 10,
      },
    }"
  >
    <template
      #default="{
        values: { label, description, error, left, right, ...values },
      }"
    >
      <NumberField
        :left-key="left as string"
        :right-key="right as string"
        v-bind="values"
      >
        <template #left v-if="left !== 'none'">
          <IconSquare v-if="left === 'square'" />
          <IconCircle v-else-if="left === 'circle'" />
        </template>
        <template #label v-if="(label as string).length > 0">
          {{ label }}
        </template>
        <template #description v-if="(description as string).length > 0">
          {{ description }}
        </template>
        <template #error v-if="(error as string).length > 0">
          {{ error }}
        </template>
      </NumberField>
    </template>
  </StorybookPlayground>
  <StorybookCode name="NumberField" :code />
  <StorybookStory name="Sizes">
    <section class="grid grid-cols-3 items-center gap-md w-full">
      <NumberField
        v-for="size in ['sm', 'md', 'lg'] as const"
        :key="size"
        :size="size"
      >
        <template #label> Label </template>
      </NumberField>
    </section>
  </StorybookStory>
</template>
