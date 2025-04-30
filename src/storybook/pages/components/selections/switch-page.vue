<script setup lang="ts">
import { Switch, type SwitchProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCheck, IconCircle, IconSquare, IconX } from '@tabler/icons-vue';
import { ref } from 'vue';

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies SwitchProps['color'][];

const icons = ['check', 'x', 'square', 'circle', 'none'];

const code = ref('');

function onChange({
  color,
  disabled,
  checkedIcon,
  uncheckedIcon,
}: UnknownRecord) {
  let displayCheckedIcon = '';
  if (checkedIcon === 'square') {
    displayCheckedIcon = '<IconSquare />';
  } else if (checkedIcon === 'circle') {
    displayCheckedIcon = '<IconCircle />';
  } else if (checkedIcon === 'x') {
    displayCheckedIcon = '<IconX />';
  } else if (checkedIcon === 'check') {
    displayCheckedIcon = '<IconCheck />';
  }
  let displayUncheckedIcon = '';
  if (uncheckedIcon === 'square') {
    displayUncheckedIcon = '<IconSquare />';
  } else if (uncheckedIcon === 'circle') {
    displayUncheckedIcon = '<IconCircle />';
  } else if (uncheckedIcon === 'x') {
    displayUncheckedIcon = '<IconX />';
  } else if (uncheckedIcon === 'check') {
    displayUncheckedIcon = '<IconCheck />';
  }
  code.value = `
<Switch
  color="${color}"
  ${disabled ? ':disabled="true"' : ''}
${displayCheckedIcon || displayUncheckedIcon ? '' : '/'}>
  ${
    displayCheckedIcon
      ? `
  <template #checked>
    ${displayCheckedIcon}
  </template>`
      : ''
  }
  ${
    displayUncheckedIcon
      ? `
  <template #unchecked>
    ${displayUncheckedIcon}
  </template>`
      : ''
  }
${displayCheckedIcon || displayUncheckedIcon ? '</Switch>' : ''}
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
    <template #default="{ values }">
      <Switch v-bind="values" @change="(v) => (values.checked = v)">
        <template #unchecked v-if="values.uncheckedIcon !== 'none'">
          <IconSquare v-if="values.uncheckedIcon === 'square'" />
          <IconCircle v-else-if="values.uncheckedIcon === 'circle'" />
          <IconCheck v-else-if="values.uncheckedIcon === 'check'" />
          <IconX v-else-if="values.uncheckedIcon === 'x'" />
        </template>
        <template #checked v-if="values.checkedIcon !== 'none'">
          <IconSquare v-if="values.checkedIcon === 'square'" />
          <IconCircle v-else-if="values.checkedIcon === 'circle'" />
          <IconCheck v-else-if="values.checkedIcon === 'check'" />
          <IconX v-else-if="values.checkedIcon === 'x'" />
        </template>
      </Switch>
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
    <Switch>
      <template #unchecked>
        <IconX />
      </template>
    </Switch>
    <Switch>
      <template #unchecked>
        <IconX />
      </template>
      <template #checked>
        <IconCheck />
      </template>
    </Switch>
    <Switch>
      <template #checked>
        <IconCheck />
      </template>
    </Switch>
  </StorybookStory>
</template>
