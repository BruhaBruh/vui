<script setup lang="ts">
import { Card, type CardProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const variants = [
  'none',
  'elevated',
  'filled',
  'outlined',
] satisfies CardProps['variant'][];
const colors = [
  'standard',
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies CardProps['color'][];

const code = ref('');

const onChange = ({
  color,
  variant,
  interactable,
  disabled,
}: UnknownRecord) => {
  code.value = `
<Card
  variant="${variant}"
  ${interactable ? 'as="button"' : ''}
  ${interactable ? `color="${color}"` : ''}
  :interactable="${interactable}"
  ${interactable ? `:disabled="${disabled}"` : ''}
  class="flex items-center justify-center px-md py-sm select-none"
>
  Card
</Card>
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
        description: 'Color of Card',
        defaultValue: 'standard',
        options: colors,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Card',
        defaultValue: 'none',
        options: variants,
      },
      interactable: {
        type: 'switch',
        label: 'Interactable',
        description: 'Interactable state of Card',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of Card',
        defaultValue: false,
      },
    }"
  >
    <template #default="{ values: { interactable, ...values } }">
      <Card
        v-bind="values"
        :interactable="interactable as boolean"
        :as="interactable ? 'button' : undefined"
        class="flex items-center justify-center px-md py-sm select-none"
      >
        Card
      </Card>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Card" :code />
  <StorybookStory name="Colors">
    <Card
      v-for="color in colors"
      :key="color"
      as="button"
      :color="color"
      variant="elevated"
      interactable
      class="flex items-center justify-center px-md py-sm select-none"
    >
      {{ color.charAt(0).toUpperCase() + color.slice(1) }}
    </Card>
  </StorybookStory>
  <StorybookStory name="Variants">
    <Card
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      class="flex items-center justify-center px-md py-sm select-none"
    >
      {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
    </Card>
  </StorybookStory>
  <StorybookStory name="All">
    <section class="grid grid-cols-8 gap-md">
      <Card
        v-for="variant in variants"
        :key="variant"
        :variant="variant"
        class="flex items-center justify-center px-md py-sm select-none col-span-2"
      >
        Card
      </Card>
      <template v-for="color in colors" :key="color">
        <Card
          v-for="variant in variants"
          :key="variant"
          as="button"
          :variant="variant"
          :color="color"
          interactable
          class="flex items-center justify-center px-md py-sm select-none"
        >
          Card
        </Card>
        <Card
          v-for="variant in variants"
          :key="variant"
          as="button"
          :variant="variant"
          :color="color"
          disabled
          interactable
          class="flex items-center justify-center px-md py-sm select-none"
        >
          Card
        </Card>
      </template>
    </section>
  </StorybookStory>
</template>
