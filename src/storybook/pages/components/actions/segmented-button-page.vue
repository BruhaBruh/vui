<script setup lang="ts">
import {
  Icon,
  SegmentedButton,
  SegmentedButtonGroup,
  type SegmentedButtonGroupProps,
} from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const selectionModes = [
  'single',
  'multiple',
] satisfies SegmentedButtonGroupProps['selectionMode'][];
const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies SegmentedButtonGroupProps['color'][];
const densities = [
  0, -1, -2, -3,
] satisfies SegmentedButtonGroupProps['density'][];

const code = ref('');

const onChange = ({
  density,
  color,
  selectionMode,
  disabled,
}: UnknownRecord) => {
  code.value = `
<SegmentedButtonGroup
  selection-mode="${selectionMode}"
  density="${density}"
  color="${color}"
  :disabled="${disabled}"
  v-model:selected="selected"
>
  <SegmentedButton value="a">A</SegmentedButton>
  <SegmentedButton value="b">B</SegmentedButton>
  <SegmentedButton value="c" disabled>C</SegmentedButton>
</SegmentedButtonGroup>
`;
};
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of SegmentedButton',
        defaultValue: 'primary',
        options: colors,
      },
      density: {
        type: 'select',
        label: 'Density',
        description: 'Density of SegmentedButton',
        defaultValue: '0',
        options: densities.map((v) => v.toString()),
      },
      selectionMode: {
        type: 'select',
        label: 'Selection Mode',
        description: 'Selection Mode of SegmentedButton',
        defaultValue: 'single',
        options: selectionModes,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of SegmentedButton',
        defaultValue: false,
      },
    }"
  >
    <template #default="{ values: { density, ...values } }">
      <SegmentedButtonGroup
        :density="
          Number.parseInt(
            density as string,
            10,
          ) as SegmentedButtonGroupProps['density']
        "
        v-bind="values"
      >
        <SegmentedButton value="a">A</SegmentedButton>
        <SegmentedButton value="b">B</SegmentedButton>
        <SegmentedButton value="c" disabled>C</SegmentedButton>
      </SegmentedButtonGroup>
    </template>
  </StorybookPlayground>
  <StorybookCode name="SegmentedButton" :code />
  <StorybookStory name="Selection Modes">
    <SegmentedButtonGroup
      v-for="selectionMode in selectionModes"
      :key="selectionMode"
      :selectionMode="selectionMode"
    >
      <SegmentedButton value="a">A</SegmentedButton>
      <SegmentedButton value="b">B</SegmentedButton>
      <SegmentedButton value="c" disabled>C</SegmentedButton>
    </SegmentedButtonGroup>
  </StorybookStory>
  <StorybookStory name="Colors">
    <SegmentedButtonGroup
      selectionMode="multiple"
      :selected="[...colors, 'disabled']"
    >
      <SegmentedButton
        v-for="color in colors"
        :key="color"
        :color="color"
        :value="color"
      >
        {{ color.charAt(0).toUpperCase() + color.slice(1) }}
      </SegmentedButton>
      <SegmentedButton value="disabled" disabled> Disabled </SegmentedButton>
    </SegmentedButtonGroup>
  </StorybookStory>
  <StorybookStory name="Icon">
    <SegmentedButtonGroup selectionMode="single" :selected="['first']">
      <SegmentedButton value="first">
        <Icon icon="tabler:coins" />
      </SegmentedButton>
      <SegmentedButton value="second">
        <Icon icon="tabler:coins" />
      </SegmentedButton>
      <SegmentedButton value="third">
        <Icon icon="tabler:coins" />
      </SegmentedButton>
    </SegmentedButtonGroup>
  </StorybookStory>
  <StorybookStory name="Check Icon">
    <SegmentedButtonGroup selectionMode="single" :selected="['a']">
      <SegmentedButton value="a" icon="tabler:square-rounded">
        A
      </SegmentedButton>
      <SegmentedButton value="b" icon="tabler:square-rounded">
        B
      </SegmentedButton>
      <SegmentedButton value="c" icon="tabler:square-rounded">
        C
      </SegmentedButton>
    </SegmentedButtonGroup>
  </StorybookStory>
</template>
