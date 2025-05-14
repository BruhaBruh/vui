<script setup lang="ts">
import { Fab, type FabVariants } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const icons = ['square', 'circle'];

const sizes = ['sm', 'md', 'lg'] satisfies FabVariants['size'][];

const variants = ['filled', 'tonal'] satisfies FabVariants['variant'][];

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies FabVariants['color'][];

const code = ref('');

function onChange({ icon, size, variant, color }: UnknownRecord) {
  let displayIcon = '';
  if (icon === 'square') {
    displayIcon = '<IconSquare />';
  } else if (icon === 'circle') {
    displayIcon = '<IconCircle />';
  }
  code.value = `
<Fab
  size="${size}"
  variant="${variant}"
  color=${color}
>
  ${displayIcon}
  Fab
</Fab>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      icon: {
        type: 'select',
        label: 'Icon',
        description: 'Icon of Fab',
        defaultValue: 'square',
        options: icons,
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of Fab',
        defaultValue: 'sm',
        options: sizes,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Fab',
        defaultValue: 'filled',
        options: variants,
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Fab',
        defaultValue: 'primary',
        options: colors,
      },
    }"
  >
    <template #default="{ values: { icon, ...values } }">
      <Fab v-bind="values" :icon-key="icon as string">
        <IconSquare v-if="icon === 'square'" />
        <IconCircle v-else />
      </Fab>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Fab" :code />
  <StorybookStory name="As link">
    <Fab :as="RouterLink" to="#">
      <IconSquare />
    </Fab>
  </StorybookStory>
  <StorybookStory name="Sizes">
    <div class="flex flex-col items-center gap-md">
      <Fab v-for="size in sizes" :key="size" :size>
        <IconSquare />
      </Fab>
    </div>
  </StorybookStory>
  <StorybookStory name="Variants">
    <Fab v-for="variant in variants" :key="variant" :variant>
      <IconSquare />
    </Fab>
  </StorybookStory>
  <StorybookStory name="Colors">
    <Fab v-for="color in colors" :key="color" :color>
      <IconSquare />
    </Fab>
  </StorybookStory>
</template>
