<script setup lang="ts">
import { TextField, type TextFieldProps } from '@/components';
import { StorybookPlayground, StorybookStory } from '@/storybook/components';
import { IconCircle, IconSquare } from '@tabler/icons-vue';

const sizes = ['sm', 'md', 'lg'] satisfies TextFieldProps['size'][];
const icons = ['none', 'circle', 'square'];
</script>

<template>
  <StorybookPlayground
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
      <TextField
        :left-key="left as string"
        :right-key="right as string"
        v-bind="values"
      >
        <template #left v-if="left !== 'none'">
          <IconSquare v-if="left === 'square'" />
          <IconCircle v-else-if="left === 'circle'" />
        </template>
        <template #label="props" v-if="(label as string).length > 0">
          <label v-bind="props" v-tw-merge>{{ label }}</label>
        </template>
        <template #right v-if="right !== 'none'">
          <IconSquare v-if="right === 'square'" />
          <IconCircle v-else-if="right === 'circle'" />
        </template>
        <template
          #description="props"
          v-if="(description as string).length > 0"
        >
          <p v-bind="props" v-tw-merge>{{ description }}</p>
        </template>
        <template #error="props" v-if="(error as string).length > 0">
          <p v-bind="props" v-tw-merge>{{ error }}</p>
        </template>
      </TextField>
    </template>
  </StorybookPlayground>
  <StorybookStory name="Sizes">
    <section class="grid grid-cols-3 items-center gap-md w-full">
      <TextField
        v-for="size in ['sm', 'md', 'lg'] as const"
        :key="size"
        :size="size"
      >
        <template #label="props">
          <label v-bind="props" v-tw-merge>Label</label>
        </template>
      </TextField>
    </section>
  </StorybookStory>
</template>
