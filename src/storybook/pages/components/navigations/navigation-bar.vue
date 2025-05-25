<script setup lang="ts">
import { NavigationBar, NavigationBarItem } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import { IconCircle, IconSquare } from '@tabler/icons-vue';
import { ref } from 'vue';

const selected = ref<'first' | 'second' | 'third' | 'fourth'>('first');

const code = `
<NavigationBar>
  <NavigationBarItem active>
    <template #icon>
      <IconSquare />
    </template>
    Label
  </NavigationBarItem>
  <NavigationBarItem>
    <template #icon>
      <IconSquare />
    </template>
    Label
  </NavigationBarItem>
  <NavigationBarItem :value="0">
    <template #icon>
      <IconSquare />
    </template>
    Label
  </NavigationBarItem>
  <NavigationBarItem :value="3">
    <template #icon>
      <IconSquare />
    </template>
    Label
  </NavigationBarItem>
</NavigationBar>
`;
</script>

<template>
  <StorybookPlayground
    :arguments="{
      type: {
        type: 'select',
        label: 'Type',
        description: 'Type NavigationBar',
        defaultValue: 'mobile',
        options: ['mobile', 'tablet'],
      },
    }"
  >
    <template #default="{ values: { type } }">
      <NavigationBar :class="[type === 'mobile' && 'w-96']">
        <NavigationBarItem
          :active="selected === 'first'"
          @click="selected = 'first'"
        >
          <template #icon>
            <IconSquare />
          </template>
          Label
        </NavigationBarItem>
        <NavigationBarItem
          :active="selected === 'second'"
          @click="selected = 'second'"
        >
          <template #icon>
            <IconSquare />
          </template>
          Label
        </NavigationBarItem>
        <NavigationBarItem
          :value="0"
          :active="selected === 'third'"
          @click="selected = 'third'"
        >
          <template #icon>
            <IconSquare />
          </template>
          Label
        </NavigationBarItem>
        <NavigationBarItem
          :value="3"
          :active="selected === 'fourth'"
          @click="selected = 'fourth'"
        >
          <template #icon>
            <IconSquare />
          </template>
          Label
        </NavigationBarItem>
      </NavigationBar>
    </template>
  </StorybookPlayground>
  <StorybookCode :code name="NavigationBar" />
  <StorybookStory name="Mobile">
    <NavigationBar class="w-96">
      <NavigationBarItem active>
        <template #icon>
          <IconSquare />
        </template>
        <template #selected-icon>
          <IconCircle />
        </template>
        Label
      </NavigationBarItem>
      <NavigationBarItem>
        <template #icon>
          <IconSquare />
        </template>
        Label
      </NavigationBarItem>
      <NavigationBarItem :value="0">
        <template #icon>
          <IconSquare />
        </template>
        Label
      </NavigationBarItem>
      <NavigationBarItem :value="3">
        <template #icon>
          <IconSquare />
        </template>
        Label
      </NavigationBarItem>
    </NavigationBar>
  </StorybookStory>
  <StorybookStory name="Tablet">
    <NavigationBar>
      <NavigationBarItem active>
        <template #icon>
          <IconSquare />
        </template>
        <template #selected-icon>
          <IconCircle />
        </template>
        Label
      </NavigationBarItem>
      <NavigationBarItem>
        <template #icon>
          <IconSquare />
        </template>
        Label
      </NavigationBarItem>
      <NavigationBarItem :value="0">
        <template #icon>
          <IconSquare />
        </template>
        Label
      </NavigationBarItem>
      <NavigationBarItem :value="3">
        <template #icon>
          <IconSquare />
        </template>
        Label
      </NavigationBarItem>
    </NavigationBar>
  </StorybookStory>
</template>
