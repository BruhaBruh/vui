<script setup lang="ts">
import { Switch, type SwitchProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const icons = [
  'tabler:square-rounded',
  'tabler:circle',
  'tabler:x',
  'tabler:check',
  'none',
];

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies SwitchProps['color'][];

const code = ref('');

function onChange({
  color,
  disabled,
  checkedIcon,
  uncheckedIcon,
}: UnknownRecord) {
  code.value = `
<Switch
  ${checkedIcon === 'none' ? '' : `checked-icon="${checkedIcon}"`}
  ${uncheckedIcon === 'none' ? '' : `unchecked-icon="${uncheckedIcon}"`}
  color="${color}"
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
        description: 'Color of Switch',
        defaultValue: 'primary',
        options: colors,
      },
      checked: {
        type: 'switch',
        label: 'Checked',
        description: 'Checked state of Switch',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of Switch',
        defaultValue: false,
      },
      checkedIcon: {
        type: 'select',
        label: 'Checked icon',
        description: 'Checked icon component of Switch',
        defaultValue: 'none',
        options: icons,
      },
      uncheckedIcon: {
        type: 'select',
        label: 'Unchecked icon',
        description: 'Unchecked icon component of Switch',
        defaultValue: 'none',
        options: icons,
      },
    }"
  >
    <template #default="{ values: { checkedIcon, uncheckedIcon, ...values } }">
      <Switch
        v-bind="values"
        :checked-icon="
          checkedIcon === 'none' ? undefined : (checkedIcon as string)
        "
        :unchecked-icon="
          uncheckedIcon === 'none' ? undefined : (uncheckedIcon as string)
        "
        @change="(v) => (values.checked = v)"
      />
    </template>
  </StorybookPlayground>
  <StorybookCode name="Switch" :code />
  <StorybookStory name="States">
    <Switch aria-label="Unchecked switch" />
    <Switch checked aria-label="Checked switch" />
    <Switch disabled aria-label="Disabled unchecked switch" />
    <Switch checked disabled aria-label="Disabled checked switch" />
  </StorybookStory>
  <StorybookStory name="Colors">
    <Switch
      v-for="color in colors"
      :key="color"
      :color="color"
      checked
      :aria-label="`${color} switch`"
    />
  </StorybookStory>
  <StorybookStory name="Icons">
    <Switch unchecked-icon="tabler:x" />
    <Switch unchecked-icon="tabler:x" checked-icon="tabler:check" />
    <Switch checked-icon="tabler:check" />
  </StorybookStory>
</template>
