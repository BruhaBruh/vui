<script setup lang="ts">
import { Checkbox, type CheckboxProps } from '@/components';
import { StorybookPlayground, StorybookStory } from '@/storybook/components';

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies CheckboxProps['color'][];
</script>

<template>
  <StorybookPlayground
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
      <Checkbox v-bind="values" />
    </template>
  </StorybookPlayground>
  <StorybookStory name="States">
    <Checkbox aria-label="Unchecked checkbox" />
    <Checkbox indeterminate aria-label="Indeterminate checkbox" />
    <Checkbox checked aria-label="Checked checkbox" />
    <Checkbox disabled aria-label="Unchecked disabled checkbox" />
    <Checkbox
      disabled
      indeterminate
      aria-label="Indeterminate disabled checkbox"
    />
    <Checkbox disabled checked aria-label="Checked disabled checkbox" />
  </StorybookStory>
  <StorybookStory name="Colors">
    <Checkbox
      v-for="color in colors"
      :key="color"
      :color="color"
      checked
      :aria-label="`${color} checkbox`"
    />
  </StorybookStory>
</template>
