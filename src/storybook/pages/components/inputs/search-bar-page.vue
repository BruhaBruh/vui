<script setup lang="ts">
import { SearchBar } from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
  StorybookTest,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import {
  IconCircle,
  IconMenu2,
  IconScreenShare,
  IconSearch,
  IconSquare,
} from '@tabler/icons-vue';
import { ref } from 'vue';

const code = ref('');

function onChange({
  placeholder,
  leading,
  trailing,
  trailingSecond,
}: UnknownRecord) {
  let leadingDisplay = '';
  if (leading !== 'none') {
    leadingDisplay = `
  <template #leading v-if="leading !== 'none'">
    <button tabindex="0" type="button">
      <IconMenu2 />
    </button>
  </template>
`;
  }
  let trailingDisplay = '';
  if (trailing === 'search') {
    trailingDisplay = `
  <template #trailing>
    <IconSearch />
  </template>
`;
  } else if (trailing === 'share') {
    trailingDisplay = `
  <template #trailing>
    <IconScreenShare />
  </template>
`;
  }

  let trailingSecondDisplay = '';
  if (trailingSecond === 'search') {
    trailingSecondDisplay = `
  <template #trailing-second>
    <IconSearch />
  </template>
`;
  } else if (trailingSecond === 'avatar') {
    trailingSecondDisplay = `
  <template #trailing-avatar>
    <img src="https://placehold.co/32/6750A4/white?text=A" />
  </template>
`;
  }

  code.value = `
<SearchBar
  placeholder="${placeholder}"
  v-model:value
${
  leadingDisplay || trailingDisplay || trailingSecondDisplay
    ? `>
  ${leadingDisplay}
  ${trailingDisplay}
  ${trailingSecondDisplay}
</SearchBar>`
    : '/>'
}
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      placeholder: {
        type: 'text',
        label: 'Placeholder',
        description: 'Placeholder of SearchBar',
        defaultValue: 'Hinted search text',
      },
      leading: {
        type: 'select',
        label: 'Leading',
        description: 'Leading component of SearchBar',
        defaultValue: 'none',
        options: ['none', 'menu'],
      },
      trailing: {
        type: 'select',
        label: 'Trailing',
        description: 'Trailing component of SearchBar',
        defaultValue: 'none',
        options: ['none', 'share', 'search'],
      },
      trailingSecond: {
        type: 'select',
        label: 'Trailing second',
        description: 'Trailing second component of SearchBar',
        defaultValue: 'none',
        options: ['none', 'search', 'avatar'],
      },
    }"
  >
    <template
      #default="{ values: { leading, trailing, trailingSecond, ...values } }"
    >
      <SearchBar
        v-bind="values"
        :leading-key="leading as string"
        :trailing-key="trailing as string"
        :trailing-second-key="trailingSecond as string"
        :trailing-avatar-key="trailingSecond as string"
      >
        <template #leading v-if="leading !== 'none'">
          <button tabindex="0" type="button">
            <IconMenu2 />
          </button>
        </template>
        <template #trailing v-if="trailing !== 'none'">
          <IconSearch v-if="trailing === 'search'" />
          <IconScreenShare v-else />
        </template>
        <template #trailing-second v-if="trailingSecond === 'search'">
          <IconSearch />
        </template>
        <template #trailing-avatar v-if="trailingSecond === 'avatar'">
          <img src="https://placehold.co/32/6750A4/white?text=A" />
        </template>
      </SearchBar>
    </template>
  </StorybookPlayground>
  <StorybookCode name="SearchBar" :code />
  <StorybookStory name="Configurations">
    <div class="flex flex-col gap-md">
      <SearchBar placeholder="Hinted search text">
        <template #trailing>
          <IconSearch />
        </template>
      </SearchBar>
      <SearchBar placeholder="Hinted search text">
        <template #leading>
          <button tabindex="0" type="button">
            <IconMenu2 />
          </button>
        </template>
        <template #trailing-avatar>
          <img src="https://placehold.co/32/6750A4/white?text=A" />
        </template>
      </SearchBar>
      <SearchBar placeholder="Hinted search text">
        <template #leading>
          <button tabindex="0" type="button">
            <IconMenu2 />
          </button>
        </template>
        <template #trailing>
          <IconSearch />
        </template>
      </SearchBar>
      <SearchBar placeholder="Hinted search text">
        <template #leading>
          <button tabindex="0" type="button">
            <IconMenu2 />
          </button>
        </template>
        <template #trailing>
          <IconScreenShare />
        </template>
        <template #trailing-second>
          <IconSearch />
        </template>
      </SearchBar>
      <SearchBar placeholder="Hinted search text">
        <template #leading>
          <button tabindex="0" type="button">
            <IconMenu2 />
          </button>
        </template>
        <template #trailing>
          <IconSearch />
        </template>
        <template #trailing-avatar>
          <img src="https://placehold.co/32/6750A4/white?text=A" />
        </template>
      </SearchBar>
    </div>
  </StorybookStory>
</template>
