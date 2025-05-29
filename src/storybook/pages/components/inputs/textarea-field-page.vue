<script setup lang="ts">
import { TextAreaField, type TextAreaFieldProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const icons = ['tabler:square-rounded', 'tabler:circle', 'none'];

const sizes = ['sm', 'md', 'lg'] satisfies TextAreaFieldProps['size'][];

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
}: UnknownRecord) {
  code.value = `
<TextAreaField
  ${leading === 'none' ? '' : `leading="${leading}"`}
  ${trailing === 'none' ? '' : `trailing="${trailing}"`}
  size="${size}"
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
        description: 'Label of TextAreaField',
        defaultValue: 'Label',
      },
      description: {
        type: 'text',
        label: 'Description',
        description: 'Description of TextAreaField',
        defaultValue: '',
      },
      error: {
        type: 'text',
        label: 'Error',
        description: 'Error of TextAreaField',
        defaultValue: '',
      },
      placeholder: {
        type: 'text',
        label: 'Placeholder',
        description: 'Placeholder of TextAreaField',
        defaultValue: '',
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of TextAreaField',
        defaultValue: 'lg',
        options: sizes,
      },
      invalid: {
        type: 'switch',
        label: 'Invalid',
        description: 'Invalid state of TextAreaField',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of TextAreaField',
        defaultValue: false,
      },
      leading: {
        type: 'select',
        label: 'Leading',
        description: 'Leading component of TextAreaField',
        defaultValue: 'none',
        options: icons,
      },
      trailing: {
        type: 'select',
        label: 'Trailing',
        description: 'Trailing component of TextAreaField',
        defaultValue: 'none',
        options: icons,
      },
    }"
  >
    <template
      #default="{
        values: { label, description, error, leading, trailing, ...values },
      }"
    >
      <TextAreaField
        :leading="leading === 'none' ? undefined : (leading as string)"
        :trailing="trailing === 'none' ? undefined : (trailing as string)"
        class="[&_.field--input-field]:max-h-32"
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
