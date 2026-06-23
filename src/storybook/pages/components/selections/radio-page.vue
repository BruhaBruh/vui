<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { Radio } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { bool, select } from "@/storybook/shared/controls";
import { colors } from "@/storybook/shared/options";

const group = ref<string>("primary");

const controls = {
	color: select(colors, "primary", { label: "Color" }),
	checked: bool(false, { label: "Checked" }),
	disabled: bool(false, { label: "Disabled" }),
};

const code = ref("");

function onChange({ color, disabled }: UnknownRecord) {
	code.value = `
<Radio
  value="some-value"
  color="${color}"
  :disabled="${disabled}"
/>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template #default="{ values }">
			<Radio value="playground" v-bind="values" @change="values.checked = true" />
		</template>
	</StorybookPlayground>
	<StorybookCode name="Radio" :code />
	<StorybookStory name="States">
		<Radio value="a" aria-label="Unchecked radio" />
		<Radio value="b" checked aria-label="Checked radio" />
		<Radio value="a" disabled aria-label="Unchecked disabled radio" />
		<Radio value="b" disabled checked aria-label="Checked disabled radio" />
	</StorybookStory>
	<StorybookStory name="Colors">
		<Radio
			v-for="color in colors"
			:key="color"
			v-model:group="group"
			:color="color"
			:value="color"
			name="color"
			:aria-label="`${color} radio`"
		/>
	</StorybookStory>
</template>
