<script setup lang="ts">
import { NumberField, type NumberFieldProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const icons = ['tabler:square-rounded', 'tabler:circle', 'none'];

const sizes = ['sm', 'md', 'lg'] satisfies NumberFieldProps['size'][];

const code = ref('');

function onChange({
  label,
  description,
  error,
  leading,
  trailing,
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
  ${leading === 'none' ? '' : `leading="${leading}"`}
  ${trailing === 'none' ? '' : `trailing="${trailing}"`}
  size="${size}"
  :min="${min}"
  :max="${max}"
  :step="${step}"
  :step-multiplier="${stepMultiplier}"
  ${(placeholder as string).length > 0 ? `placeholder="${placeholder}"` : ''}
  :invalid="${invalid}"
  :disabled="${disabled}"
>
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
        description: 'Label of NumberField',
        defaultValue: 'Label',
      },
      description: {
        type: 'text',
        label: 'Description',
        description: 'Description of NumberField',
        defaultValue: '',
      },
      error: {
        type: 'text',
        label: 'Error',
        description: 'Error of NumberField',
        defaultValue: '',
      },
      placeholder: {
        type: 'text',
        label: 'Placeholder',
        description: 'Placeholder of NumberField',
        defaultValue: '',
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of NumberField',
        defaultValue: 'lg',
        options: sizes,
      },
      invalid: {
        type: 'switch',
        label: 'Invalid',
        description: 'Invalid state of NumberField',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of NumberField',
        defaultValue: false,
      },
      leading: {
        type: 'select',
        label: 'Leading',
        description: 'Leading component of NumberField',
        defaultValue: 'none',
        options: icons,
      },
      trailing: {
        type: 'select',
        label: 'Trailing',
        description: 'Trailing component of NumberField',
        defaultValue: 'none',
        options: icons,
      },
      min: {
        type: 'number',
        label: 'Minimum value',
        description: 'Minimum value of NumberField',
        defaultValue: -0b1000_0000_0000_0000_0000_0000_0000_0000,
      },
      max: {
        type: 'number',
        label: 'Maximum value',
        description: 'Maximum value of NumberField',
        defaultValue: 0b0111_1111_1111_1111_1111_1111_1111_1111,
      },
      step: {
        type: 'number',
        label: 'Step value',
        description: 'Step value of NumberField',
        defaultValue: 1,
      },
      stepMultiplier: {
        type: 'number',
        label: 'Step multiplier for large step',
        description: 'Step multiplier for large step of NumberField',
        defaultValue: 10,
      },
    }"
  >
    <template
      #default="{
        values: { label, description, error, leading, trailing, ...values },
      }"
    >
      <NumberField
        :leading="leading === 'none' ? undefined : (leading as string)"
        :trailing="trailing === 'none' ? undefined : (trailing as string)"
        v-bind="values"
      >
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
