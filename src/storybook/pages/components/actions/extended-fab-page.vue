<script setup lang="ts">
import { ExtendedFab, type ExtendedFabVariants } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const icons = ['square', 'circle', 'none'];

const sizes = ['sm', 'md', 'lg'] satisfies ExtendedFabVariants['size'][];

const variants = ['filled', 'tonal'] satisfies ExtendedFabVariants['variant'][];

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies ExtendedFabVariants['color'][];

const code = ref('');

function onChange({ icon, size, variant, color }: UnknownRecord) {
  let displayIcon = '';
  if (icon === 'square') {
    displayIcon = '<IconSquare />';
  } else if (icon === 'circle') {
    displayIcon = '<IconCircle />';
  }
  code.value = `
<ExtendedFab
  size="${size}"
  variant="${variant}"
  color=${color}
>
  ${displayIcon}
  ExtendedFab
</ExtendedFab>
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
        description: 'Icon of ExtendedFab',
        defaultValue: 'none',
        options: icons,
      },
      size: {
        type: 'select',
        label: 'Size',
        description: 'Size of ExtendedFab',
        defaultValue: 'sm',
        options: sizes,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of ExtendedFab',
        defaultValue: 'filled',
        options: variants,
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of ExtendedFab',
        defaultValue: 'primary',
        options: colors,
      },
    }"
  >
    <template #default="{ values: { icon, ...values } }">
      <ExtendedFab v-bind="values" :icon-key="icon as string">
        <template v-if="icon !== 'none'" #icon>
          <IconSquare v-if="icon === 'square'" />
          <IconCircle v-else />
        </template>
        A
      </ExtendedFab>
    </template>
  </StorybookPlayground>
  <StorybookCode name="ExtendedFab" :code />
  <StorybookStory name="As link">
    <ExtendedFab :as="RouterLink" to="#">
      <template #icon>
        <IconSquare />
      </template>
      Link
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="Sizes">
    <div class="flex flex-col items-center gap-md">
      <ExtendedFab v-for="size in sizes" :key="size" :size>
        <template #icon>
          <IconSquare />
        </template>
        ExtendedFab
      </ExtendedFab>
    </div>
  </StorybookStory>
  <StorybookStory name="Variants">
    <ExtendedFab v-for="variant in variants" :key="variant" :variant>
      <template #icon>
        <IconSquare />
      </template>
      ExtendedFab
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="Colors">
    <div class="flex flex-col gap-md">
      <ExtendedFab v-for="color in colors" :key="color" :color>
        <template #icon>
          <IconSquare />
        </template>
        ExtendedFab
      </ExtendedFab>
    </div>
  </StorybookStory>
</template>
