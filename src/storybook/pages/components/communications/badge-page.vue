<script setup lang="ts">
import {
  Badge,
  type BadgeProps,
  ExtendedFab,
  Fab,
  Icon,
  IconButton,
} from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
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
        <Icon class="inline-flex size-6" icon="tabler:mail" />
      </Badge>
      <Badge placement="icon" :value="1">
        <Icon class="inline-flex size-6" icon="tabler:message-circle" />
      </Badge>
      <Badge placement="icon" :value="500">
        <Icon class="inline-flex size-6" icon="tabler:users" />
      </Badge>
      <Badge placement="icon" :value="1000">
        <Icon class="inline-flex size-6" icon="tabler:video" />
      </Badge>
    </section>
  </StorybookStory>
  <StorybookStory name="On IconButton">
    <section class="flex items-center gap-xl">
      <IconButton icon="tabler:mail" :badge-value="0" variant="tonal" />
      <IconButton
        icon="tabler:message-circle"
        :badge-value="1"
        variant="tonal"
      />
      <IconButton icon="tabler:users" :badge-value="500" variant="tonal" />
      <IconButton icon="tabler:video" :badge-value="1000" variant="tonal" />
    </section>
  </StorybookStory>
  <StorybookStory name="On Fab">
    <Fab icon="tabler:mail" :badge-value="0" variant="tonal" />
    <Fab icon="tabler:message-circle" :badge-value="1" variant="tonal" />
    <Fab icon="tabler:users" :badge-value="500" variant="tonal" />
    <Fab icon="tabler:video" :badge-value="1000" variant="tonal" />
  </StorybookStory>
  <StorybookStory name="On ExtendedFab">
    <ExtendedFab icon="tabler:mail" :badge-value="0" variant="tonal">
      Extended Fab
    </ExtendedFab>
    <ExtendedFab icon="tabler:message-circle" :badge-value="1" variant="tonal">
      Extended Fab
    </ExtendedFab>
    <ExtendedFab icon="tabler:users" :badge-value="500" variant="tonal">
      Extended Fab
    </ExtendedFab>
    <ExtendedFab icon="tabler:video" :badge-value="1000" variant="tonal">
      Extended Fab
    </ExtendedFab>
  </StorybookStory>
</template>
