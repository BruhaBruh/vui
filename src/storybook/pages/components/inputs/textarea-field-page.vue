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
  leading,
  trailing,
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
  ${leading === 'none' ? '' : '<template #leading>'}
    ${leading === 'square' ? '<IconSquare />' : ''}
    ${leading === 'circle' ? '<IconCircle />' : ''}
  ${leading === 'none' ? '' : '</template>'}
  ${(label as string).length > 0 ? '<template #label>' : ''}
    ${label}
  ${(label as string).length > 0 ? '</template>' : ''}
  ${trailing === 'none' ? '' : '<template trailing>'}
    ${trailing === 'square' ? '<IconSquare />' : ''}
    ${trailing === 'circle' ? '<IconCircle />' : ''}
  ${trailing === 'none' ? '' : '</template>'}
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
      leading: {
        type: 'select',
        label: 'Leading',
        description: 'Leading component of TextField',
        defaultValue: 'none',
        options: icons,
      },
      trailing: {
        type: 'select',
        label: 'Trailing',
        description: 'Trailing component of TextField',
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
        :leading-key="leading as string"
        :trailing-key="trailing as string"
        class="[&_.field--input-field]:max-h-32"
        v-bind="values"
      >
        <template #leading v-if="leading !== 'none'">
          <IconSquare v-if="leading === 'square'" />
          <IconCircle v-else-if="leading === 'circle'" />
        </template>
        <template #label v-if="(label as string).length > 0">
          {{ label }}
        </template>
        <template #trailing v-if="trailing !== 'none'">
          <IconSquare v-if="trailing === 'square'" />
          <IconCircle v-else-if="trailing === 'circle'" />
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
