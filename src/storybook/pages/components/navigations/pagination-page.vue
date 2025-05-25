<script setup lang="ts">
import { Pagination } from '@/components';
import { StorybookCode, StorybookPlayground } from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const code = ref('');

function onChange({ pageAmount, pagesToView }: UnknownRecord) {
  code.value = `
<Pagination
  v-model:page="page"
  :page-amount="${pageAmount}"
  :pages-to-view="${pagesToView}"
/>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      pageAmount: {
        type: 'number',
        label: 'Page amount',
        description: 'Page amount of Pagination',
        defaultValue: 15,
      },
      pagesToView: {
        type: 'number',
        label: 'Pages to view',
        description: 'Page to view of Pagination',
        defaultValue: 5,
      },
    }"
  >
    <template #default="{ values }">
      <Pagination v-bind="values" />
    </template>
  </StorybookPlayground>
  <StorybookCode name="Pagination" :code />
</template>
