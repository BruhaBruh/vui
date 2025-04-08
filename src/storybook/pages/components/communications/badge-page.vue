<script setup lang="ts">
import {
  Badge,
  type BadgeProps,
  ExtendedFab,
  Fab,
  IconButton,
} from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import { IconMail, IconMessage, IconUsers, IconVideo } from '@tabler/icons-vue';

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies BadgeProps['color'][];
const values = [0, 1, 500, 1000];

const code = `
<Badge color="primary" :value="40" placement="icon">
  <IconMail />
</Badge>
`;
</script>

<template>
  <StorybookPlayground
    :arguments="{
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Badge',
        defaultValue: 'primary',
        options: colors,
      },
      value: {
        type: 'number',
        label: 'Value',
        description: 'Value of Badge',
        defaultValue: 0,
      },
      maxValue: {
        type: 'number',
        label: 'Max Value',
        description: 'Max value of Badge',
        defaultValue: 999,
      },
    }"
  >
    <template #default="{ values }">
      <Badge v-bind="values" />
    </template>
  </StorybookPlayground>
  <StorybookCode name="Badge" :code />
  <StorybookStory name="Colors">
    <Badge v-for="color in colors" :key="color" :color="color" />
  </StorybookStory>
  <StorybookStory name="Sizes">
    <Badge v-for="value in values" :key="value" :value="value" />
  </StorybookStory>
  <StorybookStory name="On Icon">
    <section class="flex items-center gap-xl">
      <Badge placement="icon">
        <IconMail />
      </Badge>
      <Badge placement="icon" :value="1">
        <IconMessage />
      </Badge>
      <Badge placement="icon" :value="500">
        <IconUsers />
      </Badge>
      <Badge placement="icon" :value="1000">
        <IconVideo />
      </Badge>
    </section>
  </StorybookStory>
  <StorybookStory name="On IconButton">
    <section class="flex items-center gap-xl">
      <IconButton>
        <Badge placement="icon">
          <IconMail />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge placement="icon" :value="1">
          <IconMessage />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge placement="icon" :value="500">
          <IconUsers />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge placement="icon" :value="1000">
          <IconVideo />
        </Badge>
      </IconButton>
    </section>
  </StorybookStory>
  <StorybookStory name="On Fab">
    <Fab>
      <Badge placement="icon">
        <IconMail />
      </Badge>
    </Fab>
    <Fab>
      <Badge placement="icon" :value="1">
        <IconMessage />
      </Badge>
    </Fab>
    <Fab>
      <Badge placement="icon" :value="500">
        <IconUsers />
      </Badge>
    </Fab>
    <Fab>
      <Badge placement="icon" :value="1000">
        <IconVideo />
      </Badge>
    </Fab>
  </StorybookStory>
  <StorybookStory name="On ExtendedFab">
    <ExtendedFab>
      <template #icon>
        <Badge placement="icon">
          <IconMail />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
    <ExtendedFab>
      <template #icon>
        <Badge placement="icon" :value="1">
          <IconMessage />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
    <ExtendedFab>
      <template #icon>
        <Badge placement="icon" :value="500">
          <IconUsers />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
    <ExtendedFab>
      <template #icon>
        <Badge placement="icon" :value="1000">
          <IconVideo />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
  </StorybookStory>
  <StorybookStory name="All">
    <section class="grid grid-cols-4 gap-md">
      <template v-for="color in colors" :key="color">
        <Badge
          v-for="value in values"
          :key="value"
          :color="color"
          :value="value"
        />
      </template>
    </section>
  </StorybookStory>
</template>
