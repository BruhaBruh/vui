<script setup lang="ts">
import { Radio, type RadioProps } from '@/components';
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
] satisfies RadioProps['color'][];

const group = ref<string>('primary');

const code = ref('');

function onChange({ color, disabled }: UnknownRecord) {
  code.value = `
<Radio
  value="some-value"
  color="${color}"
  ${disabled ? 'disabled' : ''}
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
        description: 'Color of Radio',
        defaultValue: 'primary',
        options: colors,
      },
      checked: {
        type: 'switch',
        label: 'Checked',
        description: 'Checked state of Radio',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of Radio',
        defaultValue: false,
      },
    }"
  >
    <template #default="{ values }">
      <Radio
        value="playground"
        @change="values.checked = true"
        v-bind="values"
      />
    </template>
  </StorybookPlayground>
  <StorybookCode name="Radio" :code />
  <StorybookStory name="States">
    <Radio value="a" aria-label="Unchecked radio" />
    <Radio value="b" checked aria-label="Checked radio" />
    <Radio value="a" disabled aria-label="Unchecked disabled radio" />
    <Radio value="b" disabled checked aria-label="Checked disabled radio" />
  </StorybookStory>
  <StorybookStory name="Colors">
    <Radio
      v-for="color in colors"
      :key="color"
      :color="color"
      :value="color"
      v-model:group="group"
      name="color"
      :aria-label="`${color} radio`"
    />
  </StorybookStory>
</template>
