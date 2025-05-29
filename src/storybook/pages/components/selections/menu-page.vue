<script setup lang="ts">
import {
  Button,
  Icon,
  Menu,
  MenuContent,
  MenuSection,
  MenuTrigger,
  MenuItem as UiMenuItem,
} from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const singleSelection = ref<string[]>([]);
const multipleSelection = ref<string[]>([]);

const code = ref('');

function onChange({ selectionMode }: UnknownRecord) {
  code.value = `
  <Menu>
    <MenuTrigger>
      <Button> Click me 1</Button>
    </MenuTrigger>
    <MenuContent
      :selectionMode="${selectionMode}"
      v-model:selected
    >
      <MenuSection label="first pair of items">
        <UiMenuItem value="item-1">
          <template #left>
            <Icon icon="tabler:eye" />
          </template>
          Item 1
        </UiMenuItem>
        <UiMenuItem empty-left-icon value="item-2">
          Item 2
          <template #right>
            <kbd className="inline-flex items-center justify-center">
              ⌘V
            </kbd>
          </template>
        </UiMenuItem>
      </MenuSection>
      <MenuSection label="second pair of items">
        <UiMenuItem value="item-3">
          Item 3
          <template #right>
            <Icon icon="tabler:pencil" />
          </template>
        </UiMenuItem>
        <UiMenuItem value="item-4"> Item 4 </UiMenuItem>
      </MenuSection>
    </MenuContent>
  </Menu>
  `;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      selectionMode: {
        type: 'select',
        label: 'Selection mode',
        description: 'Selection mode of Menu',
        defaultValue: 'none',
        options: ['none', 'single', 'multiple'],
      },
      selectedValues: {
        type: 'array',
        label: 'Selected value',
        description: 'Selected value of Menu',
        defaultValue: [],
      },
    }"
  >
    <template #default="{ values }">
      <Menu>
        <MenuTrigger>
          <Button> Click me </Button>
        </MenuTrigger>
        <MenuContent
          v-bind="values"
          :disabled-values="['item-3']"
          @change="(v) => (values.selectedValues = v)"
        >
          <MenuSection label="first pair of items">
            <UiMenuItem value="item-1">
              <template #left>
                <Icon icon="tabler:eye" />
              </template>
              Item 1
            </UiMenuItem>
            <UiMenuItem empty-left-icon value="item-2">
              Item 2
              <template #right>
                <kbd className="inline-flex items-center justify-center">
                  ⌘V
                </kbd>
              </template>
            </UiMenuItem>
          </MenuSection>
          <MenuSection label="second pair of items">
            <UiMenuItem value="item-3">
              Item 3
              <template #right>
                <Icon icon="tabler:pencil" />
              </template>
            </UiMenuItem>
            <UiMenuItem value="item-4"> Item 4 </UiMenuItem>
          </MenuSection>
        </MenuContent>
      </Menu>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Menu" :code />
  <StorybookStory name="Single selection">
    <Menu>
      <MenuTrigger>
        <Button> Click me </Button>
      </MenuTrigger>
      <MenuContent
        :selected-values="singleSelection"
        @change="(v) => (singleSelection = v)"
        selection-mode="single"
        :disabled-values="['item-3']"
      >
        <MenuSection label="first pair of items">
          <UiMenuItem value="item-1">
            <template #left>
              <Icon icon="tabler:eye" />
            </template>
            Item 1
          </UiMenuItem>
          <UiMenuItem empty-left-icon value="item-2">
            Item 2
            <template #right>
              <kbd className="inline-flex items-center justify-center">
                ⌘V
              </kbd>
            </template>
          </UiMenuItem>
        </MenuSection>
        <MenuSection label="second pair of items">
          <UiMenuItem value="item-3">
            Item 3
            <template #right>
              <Icon icon="tabler:pencil" />
            </template>
          </UiMenuItem>
          <UiMenuItem value="item-4"> Item 4 </UiMenuItem>
        </MenuSection>
      </MenuContent>
    </Menu>
  </StorybookStory>
  <StorybookStory name="Multiple selections">
    <Menu>
      <MenuTrigger>
        <Button> Click me </Button>
      </MenuTrigger>
      <MenuContent
        :selected-values="multipleSelection"
        @change="(v) => (multipleSelection = v)"
        selection-mode="multiple"
        :disabled-values="['item-3']"
      >
        <MenuSection label="first pair of items">
          <UiMenuItem value="item-1">
            <template #left>
              <Icon icon="tabler:eye" />
            </template>
            Item 1
          </UiMenuItem>
          <UiMenuItem empty-left-icon value="item-2">
            Item 2
            <template #right>
              <kbd className="inline-flex items-center justify-center">
                ⌘V
              </kbd>
            </template>
          </UiMenuItem>
        </MenuSection>
        <MenuSection label="second pair of items">
          <UiMenuItem value="item-3">
            Item 3
            <template #right>
              <Icon icon="tabler:pencil" />
            </template>
          </UiMenuItem>
          <UiMenuItem value="item-4"> Item 4 </UiMenuItem>
        </MenuSection>
      </MenuContent>
    </Menu>
  </StorybookStory>
</template>
