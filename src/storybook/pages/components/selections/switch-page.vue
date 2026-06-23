<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { Switch } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { bool, select } from "@/storybook/shared/controls";
import { colors } from "@/storybook/shared/options";

const icons = [
	"none",
	"tabler:square-rounded",
	"tabler:circle",
	"tabler:x",
	"tabler:check",
];

const controls = {
	color: select(colors, "primary", { label: "Color" }),
	checked: bool(false, { label: "Checked" }),
	disabled: bool(false, { label: "Disabled" }),
	checkedIcon: select(icons, "none", { label: "Checked icon" }),
	uncheckedIcon: select(icons, "none", { label: "Unchecked icon" }),
};

const code = ref("");

function onChange({ color, disabled, checkedIcon, uncheckedIcon }: UnknownRecord) {
	code.value = `
<Switch
  ${checkedIcon === "none" ? "" : `checked-icon="${checkedIcon}"`}
  ${uncheckedIcon === "none" ? "" : `unchecked-icon="${uncheckedIcon}"`}
  color="${color}"
  :disabled="${disabled}"
/>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template #default="{ values: { checkedIcon, uncheckedIcon, ...values } }">
			<Switch
				v-bind="values"
				:checked-icon="checkedIcon === 'none' ? undefined : (checkedIcon as string)"
				:unchecked-icon="
					uncheckedIcon === 'none' ? undefined : (uncheckedIcon as string)
				"
				@change="(v) => (values.checked = v)"
			/>
		</template>
	</StorybookPlayground>
	<StorybookCode name="Switch" :code />
	<StorybookStory name="States">
		<Switch aria-label="Unchecked switch" />
		<Switch checked aria-label="Checked switch" />
		<Switch disabled aria-label="Disabled unchecked switch" />
		<Switch checked disabled aria-label="Disabled checked switch" />
	</StorybookStory>
	<StorybookStory name="Colors">
		<Switch
			v-for="color in colors"
			:key="color"
			:color="color"
			checked
			:aria-label="`${color} switch`"
		/>
	</StorybookStory>
	<StorybookStory name="Icons">
		<Switch unchecked-icon="tabler:x" />
		<Switch unchecked-icon="tabler:x" checked-icon="tabler:check" />
		<Switch checked-icon="tabler:check" />
	</StorybookStory>
</template>
