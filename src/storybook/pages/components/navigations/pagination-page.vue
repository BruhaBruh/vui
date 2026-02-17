<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { Pagination } from "@/components";
import { StorybookCode, StorybookPlayground } from "@/storybook/components";

const code = ref("");

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
		@change="onChange"
	>
		<template #default="{ values }">
			<Pagination v-bind="values" />
		</template>
	</StorybookPlayground>
	<StorybookCode name="Pagination" :code />
</template>
