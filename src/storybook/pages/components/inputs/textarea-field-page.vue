<script setup lang="ts">
import { TextAreaField, type TextAreaFieldProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';

const sizes = ['sm', 'md', 'lg'] satisfies TextAreaFieldProps['size'][];
const icons = ['none', 'circle', 'square'];

const code = ref('');

function onChange({
  label,
  description,
  error,
  left,
  right,
  placeholder,
  size,
  invalid,
  disabled,
}: UnknownRecord) {
  code.value = `
<TextAreaField
  size="${size}"
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
  ${right === 'none' ? '' : '<template right>'}
    ${right === 'square' ? '<IconSquare />' : ''}
    ${right === 'circle' ? '<IconCircle />' : ''}
  ${right === 'none' ? '' : '</template>'}
  ${(description as string).length > 0 ? '<template #description>' : ''}
    ${description}
  ${(description as string).length > 0 ? '</template>' : ''}
  ${(error as string).length > 0 ? '<template #error>' : ''}
    ${error}
  ${(error as string).length > 0 ? '</template>' : ''}
</TextAreaField>
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
      right: {
        type: 'select',
        label: 'Right',
        description: 'Right component of TextField',
        defaultValue: 'none',
        options: icons,
      },
    }"
  >
    <template
      #default="{
        values: { label, description, error, left, right, ...values },
      }"
    >
      <TextAreaField
        :left-key="left as string"
        :right-key="right as string"
        class="[&_.field--input-field]:max-h-32"
        v-bind="values"
      >
        <template #left v-if="left !== 'none'">
          <IconSquare v-if="left === 'square'" />
          <IconCircle v-else-if="left === 'circle'" />
        </template>
        <template #label v-if="(label as string).length > 0">
          {{ label }}
        </template>
        <template #right v-if="right !== 'none'">
          <IconSquare v-if="right === 'square'" />
          <IconCircle v-else-if="right === 'circle'" />
        </template>
        <template #description v-if="(description as string).length > 0">
          {{ description }}
        </template>
        <template #error v-if="(error as string).length > 0">
          {{ error }}
        </template>
      </TextAreaField>
    </template>
  </StorybookPlayground>
  <StorybookCode name="TextAreaField" :code />
  <StorybookStory name="Sizes">
    <section class="grid grid-cols-3 items-center gap-md w-full">
      <TextAreaField
        v-for="size in ['sm', 'md', 'lg'] as const"
        :key="size"
        :size="size"
      >
        <template #label> Label </template>
      </TextAreaField>
    </section>
  </StorybookStory>
</template>
