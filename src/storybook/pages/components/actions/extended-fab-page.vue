<script setup lang="ts">
import { ExtendedFab, type ExtendedFabProps } from '@/components';
import { StorybookPlayground, StorybookStory } from '@/storybook/components';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { RouterLink } from 'vue-router';

const colors = [
  'surface',
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies ExtendedFabProps['color'][];
const loweredStates = [false, true] satisfies ExtendedFabProps['lowered'][];
const icons = ['none', 'circle', 'square'];
</script>

<template>
  <StorybookPlayground
    :arguments="{
      label: {
        type: 'text',
        label: 'Label',
        description: 'Label of ExtendedFab',
        defaultValue: 'ExtendedFab',
      },
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of ExtendedFab',
        defaultValue: 'surface',
        options: colors,
      },
      lowered: {
        type: 'switch',
        label: 'Lowered',
        description: 'Lowered state of ExtendedFab',
        defaultValue: false,
      },
      icon: {
        type: 'select',
        label: 'Icon',
        description: 'icon component of Button',
        defaultValue: 'none',
        options: icons,
      },
    }"
  >
    <template #default="{ values: { label, icon, ...values } }">
      <ExtendedFab
        v-bind="values"
        :icon-key="icon as string"
        :slot-key="label as string"
      >
        <template #icon v-if="icon !== 'none'">
          <IconSquare v-if="icon === 'square'" />
          <IconCircle v-else-if="icon === 'circle'" />
        </template>
        <template #default v-if="label">
          {{ label }}
        </template>
      </ExtendedFab>
    </template>
  </StorybookPlayground>
  <StorybookStory name="As Link">
    <ExtendedFab :as="RouterLink" to="#">
      <template #icon>
        <IconSquare />
      </template>
      ExtendedFab
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="Colors">
    <ExtendedFab v-for="color in colors" :key="color" :color="color">
      <template #icon>
        <IconSquare />
      </template>
      ExtendedFab
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="Variants">
    <ExtendedFab>
      <template #icon>
        <IconSquare />
      </template>
    </ExtendedFab>
    <ExtendedFab>
      <template #icon>
        <IconSquare />
      </template>
      ExtendedFab
    </ExtendedFab>
    <ExtendedFab>ExtendedFab</ExtendedFab>
  </StorybookStory>
  <StorybookStory name="Lowered">
    <ExtendedFab
      v-for="lowered in loweredStates"
      :key="`${lowered}`"
      :lowered="lowered"
    >
      <template #icon>
        <IconSquare />
      </template>
      ExtendedFab
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="All">
    <section class="grid grid-cols-2 place-items-center gap-md">
      <template v-for="variant in ['icon', 'text', 'icon-text']" :key="variant">
        <template v-for="color in colors" :key="color">
          <template v-for="lowered in loweredStates" :key="`${lowered}`">
            <ExtendedFab :color="color" :lowered="lowered">
              <template v-if="variant !== 'text'" #icon>
                <IconSquare />
              </template>
              <template v-if="variant !== 'icon'" #default>
                ExtendedFab
              </template>
            </ExtendedFab>
          </template>
        </template>
      </template>
    </section>
  </StorybookStory>
</template>
