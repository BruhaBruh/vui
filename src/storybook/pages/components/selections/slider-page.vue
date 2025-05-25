<script setup lang="ts">
import { Slider, type SliderProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const colors = [
  'standard',
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies SliderProps['color'][];

const variants = ['continuous', 'centered'] satisfies SliderProps['variant'][];

const code = ref('');

function onChange({
  value,
  color,
  variant,
  disabled,
  min,
  max,
  step,
  stepMultiplier,
}: UnknownRecord) {
  code.value = `
<Slider
  :value="${JSON.stringify(value)}"
  :color="${color}"
  :variant="${variant}"
  :min="${min}"
  :max="${max}"
  :step="${step}"
  :step-multiplier="${stepMultiplier}"
  :disabled="${disabled}"
/>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      value: {
        type: 'array',
        label: 'Value',
        description: 'Value of Slider',
        defaultValue: [50],
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Slider',
        defaultValue: 'standard',
        options: colors,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Slider',
        defaultValue: 'continuous',
        options: variants,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of Slider',
        defaultValue: false,
      },
      min: {
        type: 'number',
        label: 'Minimum value',
        description: 'Minimum value of Slider',
        defaultValue: 0,
      },
      max: {
        type: 'number',
        label: 'Maximum value',
        description: 'Maximum value of Slider',
        defaultValue: 100,
      },
      step: {
        type: 'number',
        label: 'Step value',
        description: 'Step value of Slider',
        defaultValue: 1,
      },
      stepMultiplier: {
        type: 'number',
        label: 'Step multiplier for large step',
        description: 'Step multiplier for large step of Slider',
        defaultValue: 10,
      },
    }"
  >
    <template #default="{ values }">
      <Slider class="w-64" v-bind="values" />
    </template>
  </StorybookPlayground>
  <StorybookCode name="Slider" :code />
  <StorybookStory name="Colors">
    <section class="flex flex-col gap-md">
      <Slider
        v-for="color in colors"
        :key="color"
        :color
        class="w-64"
        :value="50"
      />
    </section>
  </StorybookStory>
  <StorybookStory name="Currency Format">
    <Slider
      class="w-64"
      :value="500"
      :step="50"
      :min="0"
      :max="1000"
      :format-options="{
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      }"
    />
  </StorybookStory>
  <StorybookStory name="Centered">
    <Slider class="w-64" :value="50" variant="centered" />
  </StorybookStory>
  <StorybookStory name="Multiple">
    <Slider class="w-64" :value="[25, 75]" />
  </StorybookStory>
</template>
