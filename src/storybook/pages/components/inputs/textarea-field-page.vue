<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { TextAreaField } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { bool, icon, select, text } from "@/storybook/shared/controls";
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
}: UnknownRecord) {
	code.value = `
<TextAreaField
  ${leading === "none" ? "" : `leading="${leading}"`}
  ${trailing === "none" ? "" : `trailing="${trailing}"`}
  size="${size}"
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
</TextAreaField>
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
			<TextAreaField
				:leading="leading === 'none' ? undefined : (leading as string)"
				:trailing="trailing === 'none' ? undefined : (trailing as string)"
				class="[&_.field--input-field]:max-h-32"
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
			</TextAreaField>
		</template>
	</StorybookPlayground>
	<StorybookCode name="TextAreaField" :code />
	<StorybookStory name="Sizes">
		<section class="grid grid-cols-3 items-center gap-md w-full">
			<TextAreaField v-for="size in fieldSizes" :key="size" :size="size">
				<template #label>
					Label
				</template>
			</TextAreaField>
		</section>
	</StorybookStory>
</template>
