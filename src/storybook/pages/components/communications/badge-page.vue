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
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { IconMail, IconMessage, IconUsers, IconVideo } from '@tabler/icons-vue';
import { ref } from 'vue';

const colors = [
  'primary',
  'secondary',
  'info',
  'success',
  'caution',
  'critical',
] satisfies BadgeProps['color'][];
const values = [0, 1, 500, 1000];

const code = ref('');

function onChange({ color, value, maxValue }: UnknownRecord) {
  code.value = `
<Badge
  color="${color}"
  :value="${value}"
  :max-value="${maxValue}"
  placement="icon"
>
  <IconMail />
</Badge>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
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
      <IconButton variant="tonal">
        <Badge placement="icon">
          <IconMail />
        </Badge>
      </IconButton>
      <IconButton variant="tonal">
        <Badge placement="icon" :value="1">
          <IconMessage />
        </Badge>
      </IconButton>
      <IconButton variant="tonal">
        <Badge placement="icon" :value="500">
          <IconUsers />
        </Badge>
      </IconButton>
      <IconButton variant="tonal">
        <Badge placement="icon" :value="1000">
          <IconVideo />
        </Badge>
      </IconButton>
    </section>
  </StorybookStory>
  <StorybookStory name="On Fab">
    <Fab variant="tonal">
      <Badge placement="icon">
        <IconMail />
      </Badge>
    </Fab>
    <Fab variant="tonal">
      <Badge placement="icon" :value="1">
        <IconMessage />
      </Badge>
    </Fab>
    <Fab variant="tonal">
      <Badge placement="icon" :value="500">
        <IconUsers />
      </Badge>
    </Fab>
    <Fab variant="tonal">
      <Badge placement="icon" :value="1000">
        <IconVideo />
      </Badge>
    </Fab>
  </StorybookStory>
  <StorybookStory name="On ExtendedFab">
    <ExtendedFab variant="tonal">
      <template #icon>
        <Badge placement="icon">
          <IconMail />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
    <ExtendedFab variant="tonal">
      <template #icon>
        <Badge placement="icon" :value="1">
          <IconMessage />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
    <ExtendedFab variant="tonal">
      <template #icon>
        <Badge placement="icon" :value="500">
          <IconUsers />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
    <ExtendedFab variant="tonal">
      <template #icon>
        <Badge placement="icon" :value="1000">
          <IconVideo />
        </Badge>
      </template>
      Extended Fab
    </ExtendedFab>
  </StorybookStory>
</template>
