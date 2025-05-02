<script setup lang="ts">
import { Checkbox, type CheckboxProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies CheckboxProps['color'][];

const group = ref<string[]>([...colors]);

const code = ref('');

function onChange({ color, indeterminate, disabled }: UnknownRecord) {
  code.value = `
<Checkbox
  value="some-value"
  color="${color}"
  :indeterminate="${indeterminate}"
  :disabled="${disabled}"
/>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Checkbox',
        defaultValue: 'primary',
        options: colors,
      },
      checked: {
        type: 'switch',
        label: 'Checked',
        description: 'Checked state of Checkbox',
        defaultValue: false,
      },
      indeterminate: {
        type: 'switch',
        label: 'Indeterminate',
        description: 'Indeterminate state of Checkbox',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of Checkbox',
        defaultValue: false,
      },
    }"
  >
    <template #default="{ values }">
      <Checkbox
        value="playground"
        @change="(v) => (values.checked = v)"
        v-bind="values"
      />
    </template>
  </StorybookPlayground>
  <StorybookCode name="Checkbox" :code />
  <StorybookStory name="States">
    <Checkbox value="a" aria-label="Unchecked checkbox" />
    <Checkbox value="b" indeterminate aria-label="Indeterminate checkbox" />
    <Checkbox value="c" checked aria-label="Checked checkbox" />
    <Checkbox value="a" disabled aria-label="Unchecked disabled checkbox" />
    <Checkbox
      value="b"
      disabled
      indeterminate
      aria-label="Indeterminate disabled checkbox"
    />
    <Checkbox
      value="c"
      disabled
      checked
      aria-label="Checked disabled checkbox"
    />
  </StorybookStory>
  <StorybookStory name="Colors">
    <Checkbox
      v-for="color in colors"
      :key="color"
      :color="color"
      :value="color"
      v-model:group="group"
      :aria-label="`${color} checkbox`"
    />
  </StorybookStory>
</template>
