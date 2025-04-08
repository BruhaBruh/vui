<script setup lang="ts">
import {
  Button,
  IconButton,
  Tooltip,
  TooltipContent,
  type TooltipContentProps,
  type TooltipProps,
  TooltipTrigger,
} from '@/components';
import { materialDuration } from '@/config';
import { StorybookPlayground, StorybookStory } from '@/storybook/components';
import {
  IconChevronDown,
  IconChevronDownLeft,
  IconChevronDownRight,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronUpLeft,
  IconChevronUpRight,
} from '@tabler/icons-vue';

const triggers = ['both', 'hover', 'focus'] satisfies TooltipProps['trigger'][];
const variants = ['plain', 'rich'] satisfies TooltipContentProps['variant'][];
const plainPlacements = [
  'left',
  'top',
  'bottom',
  'right',
] satisfies TooltipContentProps['placement'][];
const richPlacements = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] satisfies TooltipContentProps['placement'][];
</script>

<template>
  <StorybookPlayground
    :arguments="{
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Tooltip',
        defaultValue: 'plain',
        options: variants,
      },
      placement: {
        type: 'select',
        label: 'Placement',
        description: 'Placement of Tooltip',
        defaultValue: 'top',
        options: [...plainPlacements, ...richPlacements],
      },
      showDelay: {
        type: 'number',
        label: 'Show delay',
        description: 'Show delay of Tooltip',
        defaultValue: materialDuration['short-2'],
      },
      hideDelay: {
        type: 'number',
        label: 'Hide delay',
        description: 'Hide delay of Tooltip',
        defaultValue: materialDuration['long-2'],
      },
      trigger: {
        type: 'select',
        label: 'Trigger',
        description: 'Trigger of Tooltip',
        defaultValue: 'both',
        options: triggers,
      },
      subhead: {
        type: 'text',
        label: 'Subbead',
        description: 'Subbead of Tooltip',
        defaultValue: 'Subhead in Rich Tooltip',
      },
      text: {
        type: 'text',
        label: 'Text',
        description: 'Text of Tooltip',
        defaultValue: 'Tooltip',
      },
      showActions: {
        type: 'switch',
        label: 'Show actions',
        description: 'Show actions in Tooltip',
        defaultValue: false,
      },
    }"
  >
    <template
      #default="{
        values: {
          trigger,
          showDelay,
          hideDelay,
          subhead,
          text,
          showActions,
          ...values
        },
      }"
    >
      <Tooltip
        :key="`${showDelay}-${hideDelay}-${trigger}`"
        :trigger="trigger as TooltipProps['trigger']"
        :showDelay="showDelay as number"
        :hideDelay="hideDelay as number"
      >
        <TooltipTrigger>
          <Button> Hover me </Button>
        </TooltipTrigger>
        <TooltipContent v-bind="values">
          <template #subhead>{{ subhead }}</template>
          <template #default>
            {{ text }}
          </template>
          <template #actions v-if="showActions">
            <Button variant="text">Action</Button>
          </template>
        </TooltipContent>
      </Tooltip>
    </template>
  </StorybookPlayground>
  <StorybookStory name="Plain">
    <Tooltip open always-open>
      <TooltipContent class="!relative">Plain tooltip</TooltipContent>
    </Tooltip>
  </StorybookStory>
  <StorybookStory name="Rich">
    <Tooltip open always-open>
      <TooltipContent variant="rich" class="!relative">
        <template #subhead> Rich tooltip </template>
        Supporting line text lorem ipsum dolor sit amet, consectetur
        <template #actions>
          <Button variant="text">Action</Button>
        </template>
      </TooltipContent>
    </Tooltip>
  </StorybookStory>
  <StorybookStory name="Plain placements">
    <Tooltip v-for="placement in plainPlacements" :key="placement">
      <TooltipTrigger>
        <IconButton>
          <IconChevronUp v-if="placement === 'top'" />
          <IconChevronRight v-else-if="placement === 'right'" />
          <IconChevronLeft v-else-if="placement === 'left'" />
          <IconChevronDown v-else />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent :placement="placement">Plain tooltip</TooltipContent>
    </Tooltip>
  </StorybookStory>
  <StorybookStory name="Rich placements">
    <Tooltip v-for="placement in richPlacements" :key="placement">
      <TooltipTrigger>
        <IconButton>
          <IconChevronUpLeft v-if="placement === 'top-left'" />
          <IconChevronUpRight v-else-if="placement === 'top-right'" />
          <IconChevronDownLeft v-else-if="placement === 'bottom-left'" />
          <IconChevronDownRight v-else />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent variant="rich" :placement="placement">
        <template #subhead> Rich tooltip </template>
        Supporting line text lorem ipsum dolor sit amet, consectetur
        <template #actions>
          <Button variant="text">Action</Button>
        </template>
      </TooltipContent>
    </Tooltip>
  </StorybookStory>
</template>
