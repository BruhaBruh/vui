<script setup lang="ts">
import {
  AppBar,
  type AppBarProps,
  AppBarSlot,
  IconButton,
  SearchBar,
} from '@/components';
import { StorybookCode, StorybookStory } from '@/storybook/components';
import { IconMenu2, IconSearch } from '@tabler/icons-vue';

const variants = [
  'search',
  'small',
  'medium',
  'large',
] satisfies AppBarProps['variant'][];

const centeredArr = [false, true] satisfies AppBarProps['centered'][];

const mobileArr = [true, false];

function capitalize(...val: string[]) {
  return val.map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');
}

function generateCode(variant: AppBarProps['variant'], centered: boolean) {
  return `
<AppBar
  variant="${variant}"
  ${centered ? 'centered' : ''}
>
  <template #leading>
    <AppBarSlot>
      <IconButton variant="standard">
        <IconMenu2 />
      </IconButton>
    </AppBarSlot>
  </template>
  ${
    variant === 'search'
      ? `<template #search-bar>
    <SearchBar placeholder="Search" />
  </template>`
      : `<template #title> Title </template>
  <template #subtitle> Subtitle </template>`
  }
  <template #trailing>
    ${
      variant === 'search'
        ? ''
        : `<AppBarSlot>
      <IconButton variant="standard">
        <IconSearch />
      </IconButton>
    </AppBarSlot>`
    }
    <AppBarSlot>
      <div
        class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
      >
        A
      </div>
    </AppBarSlot>
  </template>
</AppBar>`;
}
</script>

<template>
  <template v-for="variant in variants" :key="variant">
    <template v-for="centered in centeredArr" :key="`${centered}`">
      <StorybookStory
        :name="capitalize(variant, centered ? 'centered' : 'fluid')"
      >
        <div class="flex flex-col items-center gap-md w-full">
          <AppBar
            v-for="mobile in mobileArr"
            :key="`${mobile}`"
            :variant
            :centered
            :class="[mobile && 'w-80', 'elevation-2']"
          >
            <template #leading>
              <AppBarSlot>
                <IconButton variant="standard">
                  <IconMenu2 />
                </IconButton>
              </AppBarSlot>
            </template>
            <template #search-bar>
              <SearchBar placeholder="Search" :class="[centered && 'w-96']" />
            </template>
            <template #title> Title </template>
            <template #subtitle> Subtitle </template>
            <template #trailing>
              <AppBarSlot v-if="variant !== 'search'">
                <IconButton variant="standard">
                  <IconSearch />
                </IconButton>
              </AppBarSlot>
              <AppBarSlot>
                <div
                  class="size-8 rounded-full bg-primary text-on-primary inline-flex items-center justify-center"
                >
                  A
                </div>
              </AppBarSlot>
            </template>
          </AppBar>
        </div>
      </StorybookStory>
      <StorybookCode
        :code="generateCode(variant, centered)"
        :name="capitalize(variant, centered ? 'centered' : 'fluid')"
      />
    </template>
  </template>
</template>
