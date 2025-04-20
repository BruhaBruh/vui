<script setup lang="ts">
import { MaskField, type MaskFieldProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';

const sizes = ['sm', 'md', 'lg'] satisfies MaskFieldProps['size'][];
const icons = ['none', 'circle', 'square'];

const code = ref('');

function onChange({
  label,
  description,
  error,
  left,
  right,
  placeholder,
  mask,
  size,
  invalid,
  disabled,
}: UnknownRecord) {
  code.value = `
<MaskField
  mask="${mask}"
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
</MaskField>
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
        description: 'Label of MaskField',
        defaultValue: 'Label',
      },
      description: {
        type: 'text',
        label: 'Description',
        description: 'Description of MaskField',
        defaultValue: '',
      },
      error: {
        type: 'text',
        label: 'Error',
        description: 'Error of MaskField',
        defaultValue: '',
      },
      placeholder: {
        type: 'text',
        label: 'Placeholder',
        description: 'Placeholder of MaskField',
        defaultValue: '',
      },
      mask: {
        type: 'text',
        label: 'Mask',
        description: 'Mask of MaskField',
        defaultValue: '+7 (___) ___-__-__',
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of MaskField',
        defaultValue: 'lg',
        options: sizes,
      },
      invalid: {
        type: 'switch',
        label: 'Invalid',
        description: 'Invalid state of MaskField',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of MaskField',
        defaultValue: false,
      },
      left: {
        type: 'select',
        label: 'Left',
        description: 'Left component of MaskField',
        defaultValue: 'none',
        options: icons,
      },
      right: {
        type: 'select',
        label: 'Right',
        description: 'Right component of MaskField',
        defaultValue: 'none',
        options: icons,
      },
    }"
  >
    <template
      #default="{
        values: { label, description, error, left, right, mask, ...values },
      }"
    >
      <MaskField
        :left-key="left as string"
        :right-key="right as string"
        :mask="mask as string"
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
      </MaskField>
    </template>
  </StorybookPlayground>
  <StorybookCode name="MaskField" :code />
  <StorybookStory name="Masks">
    <section class="grid grid-cols-3 items-center gap-md w-full">
      <MaskField
        mask="+7 (___) ___-__-__"
        placeholder="+7 (___) ___-__-__"
        :mask-aliases="['+8 (___) ___-__-__']"
        inputmode="tel"
      >
        <template #label> Phone </template>
      </MaskField>
      <MaskField mask="__.__.____" placeholder="__.__.____" inputmode="numeric">
        <template #label> Date </template>
      </MaskField>
      <MaskField
        mask="____ ____ ____ ____"
        placeholder="____ ____ ____ ____"
        inputmode="numeric"
      >
        <template #label> Card number </template>
      </MaskField>
    </section>
  </StorybookStory>
  <StorybookStory name="Sizes">
    <section class="grid grid-cols-3 items-center gap-md w-full">
      <MaskField
        v-for="size in ['sm', 'md', 'lg'] as const"
        mask="+7 (___) ___-__-__"
        :key="size"
        :size="size"
      >
        <template #label> Label </template>
      </MaskField>
    </section>
  </StorybookStory>
</template>
