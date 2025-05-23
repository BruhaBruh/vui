<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverContent,
  type PopoverContentProps,
  PopoverTrigger,
} from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import { materialDuration, materialEasing } from '@/config';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';
import { motion } from 'motion-v';

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] satisfies PopoverContentProps['placement'][];

const code = ref('');

function onChange({ placement }: UnknownRecord) {
  code.value = `
<Popover>
  <PopoverTrigger>
    <Button> Click me </Button>
  </PopoverTrigger>
  <PopoverContent placement="${placement}">
    <div>
      Popover
    </div>
  </PopoverContent>
</Popover>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      placement: {
        type: 'select',
        label: 'Placement',
        description: 'Placement of Popover',
        defaultValue: 'top',
        options: placements,
      },
    }"
  >
    <template #default="{ values }">
      <Popover>
        <PopoverTrigger>
          <Button> Click me </Button>
        </PopoverTrigger>
        <PopoverContent
          v-bind="values"
          class="bg-inverse-surface text-inverse-on-surface typography-label-large px-xs py-2xs rounded-xs"
        >
          <motion.div
            :initial="{ opacity: 0, scale: 0 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0 }"
            :transition="{
              duration: materialDuration.asMotion('medium-1'),
              ease: materialEasing.standard,
            }"
          >
            Popover
          </motion.div>
        </PopoverContent>
      </Popover>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Popover" :code />
  <StorybookStory name="Top placements">
    <Popover v-for="placement in placements.slice(0, 3)" :key="placement">
      <PopoverTrigger>
        <Button>
          {{
            placement
              .split('-')
              .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
              .join(' ')
          }}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        :placement="placement"
        class="bg-inverse-surface text-inverse-on-surface typography-label-large px-xs py-2xs rounded-xs"
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
        >
          Popover
        </motion.div>
      </PopoverContent>
    </Popover>
  </StorybookStory>
  <StorybookStory name="Bottom placements">
    <Popover v-for="placement in placements.slice(3, 6)" :key="placement">
      <PopoverTrigger>
        <Button>
          {{
            placement
              .split('-')
              .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
              .join(' ')
          }}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        :placement="placement"
        class="bg-inverse-surface text-inverse-on-surface typography-label-large px-xs py-2xs rounded-xs"
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
        >
          Popover
        </motion.div>
      </PopoverContent>
    </Popover>
  </StorybookStory>
  <StorybookStory name="Left placements">
    <Popover v-for="placement in placements.slice(6, 9)" :key="placement">
      <PopoverTrigger>
        <Button>
          {{
            placement
              .split('-')
              .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
              .join(' ')
          }}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        :placement="placement"
        class="bg-inverse-surface text-inverse-on-surface typography-label-large px-xs py-2xs rounded-xs"
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
        >
          Popover
        </motion.div>
      </PopoverContent>
    </Popover>
  </StorybookStory>
  <StorybookStory name="Right placements">
    <Popover v-for="placement in placements.slice(9, 12)" :key="placement">
      <PopoverTrigger>
        <Button>
          {{
            placement
              .split('-')
              .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
              .join(' ')
          }}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        :placement="placement"
        class="bg-inverse-surface text-inverse-on-surface typography-label-large px-xs py-2xs rounded-xs"
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
          :transition="{
            duration: materialDuration.asMotion('medium-1'),
            ease: materialEasing.standard,
          }"
        >
          Popover
        </motion.div>
      </PopoverContent>
    </Popover>
  </StorybookStory>
</template>
