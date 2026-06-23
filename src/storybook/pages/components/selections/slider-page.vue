<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { SliderProps } from "@/components";
import { ref } from "vue";
import { Slider } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { arr, bool, num, select } from "@/storybook/shared/controls";
import { surfaceColors } from "@/storybook/shared/options";

const variants = ["continuous", "centered"] satisfies SliderProps["variant"][];

const controls = {
	value: arr([50], { label: "Value" }),
	color: select(surfaceColors, "standard", { label: "Color" }),
	variant: select(variants, "continuous", { label: "Variant" }),
	disabled: bool(false, { label: "Disabled" }),
	min: num(0, { label: "Minimum value" }),
	max: num(100, { label: "Maximum value" }),
	step: num(1, { label: "Step value" }),
	stepMultiplier: num(10, {
		label: "Step multiplier for large step",
		prop: "step-multiplier",
	}),
};

const code = ref("");

function onChange({
	value,
	color,
	variant,
	disabled,
	min,
	max,
	step,
	stepMultiplier,
}: UnknownRecord) {
	code.value = `
<Slider
  :value="${JSON.stringify(value)}"
  :color="${color}"
  :variant="${variant}"
  :min="${min}"
  :max="${max}"
  :step="${step}"
  :step-multiplier="${stepMultiplier}"
  :disabled="${disabled}"
/>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template #default="{ values }">
			<Slider class="w-64" v-bind="values" />
		</template>
	</StorybookPlayground>
	<StorybookCode name="Slider" :code />
	<StorybookStory name="Colors">
		<section class="flex flex-col gap-md">
			<Slider
				v-for="color in surfaceColors"
				:key="color"
				:color
				class="w-64"
				:value="50"
			/>
		</section>
	</StorybookStory>
	<StorybookStory name="Currency Format">
		<Slider
			class="w-64"
			:value="500"
			:step="50"
			:min="0"
			:max="1000"
			:format-options="{
				style: 'currency',
				currency: 'RUB',
				maximumFractionDigits: 0,
			}"
		/>
	</StorybookStory>
	<StorybookStory name="Centered">
		<Slider class="w-64" :value="50" variant="centered" />
	</StorybookStory>
	<StorybookStory name="Multiple">
		<Slider class="w-64" :value="[25, 75]" />
	</StorybookStory>
</template>
