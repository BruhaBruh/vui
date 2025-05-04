<script setup lang="ts">
import { Fab, type FabProps } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const colors = [
  'surface',
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies FabProps['color'][];
const sizes = ['sm', 'md', 'lg'] satisfies FabProps['size'][];
const loweredStates = [false, true] satisfies FabProps['lowered'][];
const icons = ['circle', 'square'];

const code = ref('');

function onChange({ color, size, lowered, icon }: UnknownRecord) {
  let displayIcon = '';
  if (icon === 'square') {
    displayIcon = '<IconSquare />';
  } else if (icon === 'circle') {
    displayIcon = '<IconCircle />';
  }
  code.value = `
<Fab
  color="${color}"
  size="${size}"
  :lowered="${lowered}"
>
  ${displayIcon}
</Fab>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of Fab',
        defaultValue: 'md',
        options: sizes,
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Fab',
        defaultValue: 'surface',
        options: colors,
      },
      lowered: {
        type: 'switch',
        label: 'Lowered',
        description: 'Lowered state of Fab',
        defaultValue: false,
      },
      icon: {
        type: 'select',
        label: 'Icon',
        description: 'Icon component of Fab',
        defaultValue: 'square',
        options: icons,
      },
    }"
  >
    <template #default="{ values: { icon, ...values } }">
      <Fab v-bind="values" :icon-key="icon as string">
        <IconSquare v-if="icon === 'square'" />
        <IconCircle v-else-if="icon === 'circle'" />
      </Fab>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Fab" :code />
  <StorybookStory name="As Link">
    <Fab :as="RouterLink" to="#">
      <IconSquare />
    </Fab>
  </StorybookStory>
  <StorybookStory name="Colors">
    <Fab v-for="color in colors" :key="color" :color="color">
      <IconSquare />
    </Fab>
  </StorybookStory>
  <StorybookStory name="Sizes">
    <Fab v-for="size in sizes" :key="size" :size="size">
      <IconSquare />
    </Fab>
  </StorybookStory>
  <StorybookStory name="Lowered">
    <Fab
      v-for="lowered in loweredStates"
      :key="`${lowered}`"
      :lowered="lowered"
    >
      <IconSquare />
    </Fab>
  </StorybookStory>
</template>
