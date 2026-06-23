<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { Checkbox } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { bool, select } from "@/storybook/shared/controls";
import { colors } from "@/storybook/shared/options";

const group = ref<string[]>([...colors]);

const controls = {
	color: select(colors, "primary", { label: "Color" }),
	checked: bool(false, { label: "Checked" }),
	indeterminate: bool(false, { label: "Indeterminate" }),
	disabled: bool(false, { label: "Disabled" }),
};

const code = ref("");

function onChange({ color, indeterminate, disabled }: UnknownRecord) {
	code.value = `
<Checkbox
  value="some-value"
  color="${color}"
  :indeterminate="${indeterminate}"
  :disabled="${disabled}"
/>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template #default="{ values }">
			<Checkbox
				value="playground"
				v-bind="values"
				@change="(v) => (values.checked = v)"
			/>
		</template>
	</StorybookPlayground>
	<StorybookCode name="Checkbox" :code />
	<StorybookStory name="States">
		<Checkbox value="a" aria-label="Unchecked checkbox" />
		<Checkbox value="b" indeterminate aria-label="Indeterminate checkbox" />
		<Checkbox value="c" checked aria-label="Checked checkbox" />
		<Checkbox value="a" disabled aria-label="Unchecked disabled checkbox" />
		<Checkbox
			value="b"
			disabled
			indeterminate
			aria-label="Indeterminate disabled checkbox"
		/>
		<Checkbox
			value="c"
			disabled
			checked
			aria-label="Checked disabled checkbox"
		/>
	</StorybookStory>
	<StorybookStory name="Colors">
		<Checkbox
			v-for="color in colors"
			:key="color"
			v-model:group="group"
			:color="color"
			:value="color"
			:aria-label="`${color} checkbox`"
		/>
	</StorybookStory>
</template>
