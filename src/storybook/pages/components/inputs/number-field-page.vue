<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { NumberField } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { bool, icon, num, select, text } from "@/storybook/shared/controls";
import { fieldSizes } from "@/storybook/shared/options";

const controls = {
	label: text("Label", { label: "Label" }),
	description: text("", { label: "Description" }),
	error: text("", { label: "Error" }),
	placeholder: text("", { label: "Placeholder" }),
	size: select(fieldSizes, "lg", { label: "Size" }),
	invalid: bool(false, { label: "Invalid" }),
	disabled: bool(false, { label: "Disabled" }),
	leading: icon(undefined, { label: "Leading" }),
	trailing: icon(undefined, { label: "Trailing" }),
	min: num(-0b1000_0000_0000_0000_0000_0000_0000_0000, {
		label: "Minimum value",
	}),
	max: num(0b0111_1111_1111_1111_1111_1111_1111_1111, {
		label: "Maximum value",
	}),
	step: num(1, { label: "Step value" }),
	stepMultiplier: num(10, {
		label: "Step multiplier for large step",
		prop: "step-multiplier",
	}),
};

const code = ref("");

function onChange({
	label,
	description,
	error,
	leading,
	trailing,
	placeholder,
	size,
	invalid,
	disabled,
	min,
	max,
	step,
	stepMultiplier,
}: UnknownRecord) {
	code.value = `
<NumberField
  ${leading === "none" ? "" : `leading="${leading}"`}
  ${trailing === "none" ? "" : `trailing="${trailing}"`}
  size="${size}"
  :min="${min}"
  :max="${max}"
  :step="${step}"
  :step-multiplier="${stepMultiplier}"
  ${(placeholder as string).length > 0 ? `placeholder="${placeholder}"` : ""}
  :invalid="${invalid}"
  :disabled="${disabled}"
>
  ${(label as string).length > 0 ? "<template #label>" : ""}
    ${label}
  ${(label as string).length > 0 ? "</template>" : ""}
  ${(description as string).length > 0 ? "<template #description>" : ""}
    ${description}
  ${(description as string).length > 0 ? "</template>" : ""}
  ${(error as string).length > 0 ? "<template #error>" : ""}
    ${error}
  ${(error as string).length > 0 ? "</template>" : ""}
</NumberField>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template
			#default="{
				values: { label, description, error, leading, trailing, ...values },
			}"
		>
			<NumberField
				:leading="leading === 'none' ? undefined : (leading as string)"
				:trailing="trailing === 'none' ? undefined : (trailing as string)"
				v-bind="values"
			>
				<template v-if="(label as string).length > 0" #label>
					{{ label }}
				</template>
				<template v-if="(description as string).length > 0" #description>
					{{ description }}
				</template>
				<template v-if="(error as string).length > 0" #error>
					{{ error }}
				</template>
			</NumberField>
		</template>
	</StorybookPlayground>
	<StorybookCode name="NumberField" :code />
	<StorybookStory name="Sizes">
		<section class="grid grid-cols-3 items-center gap-md w-full">
			<NumberField v-for="size in fieldSizes" :key="size" :size="size">
				<template #label>
					Label
				</template>
			</NumberField>
		</section>
	</StorybookStory>
</template>
