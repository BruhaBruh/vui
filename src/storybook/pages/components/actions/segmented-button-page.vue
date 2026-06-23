<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { SegmentedButtonGroupProps } from "@/components";
import { ref } from "vue";
import { Icon, SegmentedButton, SegmentedButtonGroup } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { select } from "@/storybook/shared/controls";
import { colors } from "@/storybook/shared/options";

const selectionModes = [
	"single",
	"multiple",
] satisfies SegmentedButtonGroupProps["selectionMode"][];
const densities = [0, -1, -2, -3] satisfies SegmentedButtonGroupProps["density"][];

const controls = {
	color: select(colors, "primary", { label: "Color" }),
	density: select(densities.map(String), "0", { label: "Density" }),
	selectionMode: select(selectionModes, "single", { label: "Selection Mode" }),
};

const code = ref("");

function onChange({ density, color, selectionMode, disabled }: UnknownRecord) {
	code.value = `
<SegmentedButtonGroup
  selection-mode="${selectionMode}"
  density="${density}"
  color="${color}"
  :disabled="${disabled}"
  v-model:selected="selected"
>
  <SegmentedButton value="a">A</SegmentedButton>
  <SegmentedButton value="b">B</SegmentedButton>
  <SegmentedButton value="c" disabled>C</SegmentedButton>
</SegmentedButtonGroup>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template #default="{ values }">
			<SegmentedButtonGroup
				:selection-mode="values.selectionMode as SegmentedButtonGroupProps['selectionMode']"
				:color="values.color as SegmentedButtonGroupProps['color']"
				:density="
					Number.parseInt(
						values.density as string,
						10,
					) as SegmentedButtonGroupProps['density']
				"
			>
				<SegmentedButton value="a">
					A
				</SegmentedButton>
				<SegmentedButton value="b">
					B
				</SegmentedButton>
				<SegmentedButton value="c" disabled>
					C
				</SegmentedButton>
			</SegmentedButtonGroup>
		</template>
	</StorybookPlayground>
	<StorybookCode name="SegmentedButton" :code />
	<StorybookStory name="Selection Modes">
		<SegmentedButtonGroup
			v-for="selectionMode in selectionModes"
			:key="selectionMode"
			:selection-mode="selectionMode"
		>
			<SegmentedButton value="a">
				A
			</SegmentedButton>
			<SegmentedButton value="b">
				B
			</SegmentedButton>
			<SegmentedButton value="c" disabled>
				C
			</SegmentedButton>
		</SegmentedButtonGroup>
	</StorybookStory>
	<StorybookStory name="Colors">
		<SegmentedButtonGroup
			selection-mode="multiple"
			:selected="[...colors, 'disabled']"
		>
			<SegmentedButton
				v-for="color in colors"
				:key="color"
				:color="color"
				:value="color"
			>
				{{ color.charAt(0).toUpperCase() + color.slice(1) }}
			</SegmentedButton>
			<SegmentedButton value="disabled" disabled>
				Disabled
			</SegmentedButton>
		</SegmentedButtonGroup>
	</StorybookStory>
	<StorybookStory name="Icon">
		<SegmentedButtonGroup selection-mode="single" :selected="['first']">
			<SegmentedButton value="first">
				<Icon icon="tabler:coins" />
			</SegmentedButton>
			<SegmentedButton value="second">
				<Icon icon="tabler:coins" />
			</SegmentedButton>
			<SegmentedButton value="third">
				<Icon icon="tabler:coins" />
			</SegmentedButton>
		</SegmentedButtonGroup>
	</StorybookStory>
	<StorybookStory name="Check Icon">
		<SegmentedButtonGroup selection-mode="single" :selected="['a']">
			<SegmentedButton value="a" icon="tabler:square-rounded">
				A
			</SegmentedButton>
			<SegmentedButton value="b" icon="tabler:square-rounded">
				B
			</SegmentedButton>
			<SegmentedButton value="c" icon="tabler:square-rounded">
				C
			</SegmentedButton>
		</SegmentedButtonGroup>
	</StorybookStory>
</template>
