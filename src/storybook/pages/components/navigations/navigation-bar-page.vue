<script setup lang="ts">
import { ref } from "vue";
import { NavigationBar, NavigationBarItem } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { select } from "@/storybook/shared/controls";

const selected = ref<"first" | "second" | "third" | "fourth">("first");

const controls = {
	type: select(["mobile", "tablet"], "mobile", { label: "Type" }),
};

const code = `
<NavigationBar>
  <NavigationBarItem active icon="tabler:square-rounded">
    Label
  </NavigationBarItem>
  <NavigationBarItem icon="tabler:square-rounded">
    Label
  </NavigationBarItem>
  <NavigationBarItem :badge-value="0" icon="tabler:square-rounded">
    Label
  </NavigationBarItem>
  <NavigationBarItem :badge-value="3" icon="tabler:square-rounded">
    Label
  </NavigationBarItem>
</NavigationBar>
`;
</script>

<template>
	<StorybookPlayground :controls>
		<template #default="{ values: { type } }">
			<NavigationBar :class="[type === 'mobile' && 'w-96']">
				<NavigationBarItem
					icon="tabler:square-rounded"
					:active="selected === 'first'"
					@click="selected = 'first'"
				>
					Label
				</NavigationBarItem>
				<NavigationBarItem
					icon="tabler:square-rounded"
					:active="selected === 'second'"
					@click="selected = 'second'"
				>
					Label
				</NavigationBarItem>
				<NavigationBarItem
					icon="tabler:square-rounded"
					:badge-value="0"
					:active="selected === 'third'"
					@click="selected = 'third'"
				>
					Label
				</NavigationBarItem>
				<NavigationBarItem
					icon="tabler:square-rounded"
					:badge-value="3"
					:active="selected === 'fourth'"
					@click="selected = 'fourth'"
				>
					Label
				</NavigationBarItem>
			</NavigationBar>
		</template>
	</StorybookPlayground>
	<StorybookCode :code name="NavigationBar" />
	<StorybookStory name="Mobile">
		<NavigationBar class="w-96">
			<NavigationBarItem icon="tabler:square-rounded" active>
				Label
			</NavigationBarItem>
			<NavigationBarItem icon="tabler:square-rounded">
				Label
			</NavigationBarItem>
			<NavigationBarItem icon="tabler:square-rounded" :badge-value="0">
				Label
			</NavigationBarItem>
			<NavigationBarItem icon="tabler:square-rounded" :badge-value="3">
				Label
			</NavigationBarItem>
		</NavigationBar>
	</StorybookStory>
	<StorybookStory name="Tablet">
		<NavigationBar>
			<NavigationBarItem icon="tabler:square-rounded" active>
				Label
			</NavigationBarItem>
			<NavigationBarItem icon="tabler:square-rounded">
				Label
			</NavigationBarItem>
			<NavigationBarItem icon="tabler:square-rounded" :badge-value="0">
				Label
			</NavigationBarItem>
			<NavigationBarItem icon="tabler:square-rounded" :badge-value="3">
				Label
			</NavigationBarItem>
		</NavigationBar>
	</StorybookStory>
</template>
