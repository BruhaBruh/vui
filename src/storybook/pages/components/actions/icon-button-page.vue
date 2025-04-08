<script setup lang="ts">
import { IconButton } from '@/components';
import type { IconButtonProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { RouterLink } from 'vue-router';

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies IconButtonProps['color'][];
const variants = [
  'standard',
  'filled',
  'tonal',
  'outlined',
] satisfies IconButtonProps['variant'][];
const icons = ['circle', 'square'];

const isToggleable = true;
const isSelected = true;
const isNotSelected = !isSelected;

const code = `
<IconButton
  color="primary"
  variant="standard"
  :toggleable="true"
  v-model:selected
>
  <IconSquare />
</IconButton>
`;
</script>

<template>
  <StorybookPlayground
    :arguments="{
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of IconButton',
        defaultValue: 'primary',
        options: colors,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of IconButton',
        defaultValue: 'standard',
        options: variants,
      },
      toggleable: {
        type: 'switch',
        label: 'Toggleable',
        description: 'Toggleable state of IconButton',
        defaultValue: false,
      },
      selected: {
        type: 'switch',
        label: 'Selected',
        description: 'Selected state of IconButton',
        defaultValue: false,
      },
      disabled: {
        type: 'switch',
        label: 'Disabled',
        description: 'Disabled state of IconButton',
        defaultValue: false,
      },
      icon: {
        type: 'select',
        label: 'Icon',
        description: 'Icon component of Button',
        defaultValue: 'square',
        options: icons,
      },
    }"
  >
    <template #default="{ values: { icon, selected, ...values } }">
      <IconButton
        v-bind="values"
        v-model:selected="selected as boolean"
        :icon-key="icon as string"
      >
        <IconSquare v-if="icon === 'square'" />
        <IconCircle v-else-if="icon === 'circle'" />
      </IconButton>
    </template>
  </StorybookPlayground>
  <StorybookCode name="IconButton" :code />
  <StorybookStory name="As Link">
    <IconButton :as="RouterLink" to="#">
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="Colors">
    <IconButton v-for="color in colors" :key="color" :color="color">
      <IconSquare />
    </IconButton>
    <IconButton disabled>
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="Variants">
    <IconButton v-for="variant in variants" :key="variant" :variant="variant">
      <IconSquare />
    </IconButton>
  </StorybookStory>
  <StorybookStory name="All">
    <section class="grid gap-md">
      <section
        v-for="color in colors"
        :key="color"
        class="grid grid-cols-12 place-items-center gap-md"
      >
        <template v-for="variant in variants" :key="variant">
          <IconButton :variant :color="color">
            <IconSquare />
          </IconButton>
          <IconButton
            v-model:toggleable="isToggleable"
            v-model:selected="isNotSelected"
            :variant
            :color="color"
          >
            <IconSquare />
          </IconButton>
          <IconButton
            v-model:toggleable="isToggleable"
            v-model:selected="isSelected"
            :variant
            :color="color"
          >
            <IconSquare />
          </IconButton>
        </template>
      </section>
    </section>
  </StorybookStory>
</template>
