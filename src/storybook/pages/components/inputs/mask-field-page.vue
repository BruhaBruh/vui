<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { MaskField } from "@/components";
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
	mask: text("+7 (___) ___-__-__", { label: "Mask" }),
	size: select(fieldSizes, "lg", { label: "Size" }),
	invalid: bool(false, { label: "Invalid" }),
	disabled: bool(false, { label: "Disabled" }),
	leading: icon(undefined, { label: "Leading" }),
	trailing: icon(undefined, { label: "Trailing" }),
};

const code = ref("");
const filledValue = ref("+79991234567");

function onChange({
	label,
	description,
	error,
	leading,
	trailing,
	placeholder,
	mask,
	size,
	invalid,
	disabled,
}: UnknownRecord) {
	code.value = `
<MaskField
  ${leading === "none" ? "" : `leading="${leading}"`}
  ${trailing === "none" ? "" : `trailing="${trailing}"`}
  mask="${mask}"
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
</MaskField>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template
			#default="{
				values: {
					label,
					description,
					error,
					leading,
					trailing,
					mask,
					...values
				},
			}"
		>
			<MaskField
				:leading="leading === 'none' ? undefined : (leading as string)"
				:trailing="trailing === 'none' ? undefined : (trailing as string)"
				:mask="mask as string"
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
			</MaskField>
		</template>
	</StorybookPlayground>
	<StorybookCode name="MaskField" :code />
	<StorybookStory name="Masks">
		<section class="grid grid-cols-3 items-center gap-md w-full">
			<MaskField
				mask="+7 (___) ___-__-__"
				placeholder="+7 (___) ___-__-__"
				:mask-aliases="['+8 (___) ___-__-__']"
				inputmode="tel"
			>
				<template #label>
					Phone
				</template>
			</MaskField>
			<MaskField mask="__.__.____" placeholder="__.__.____" inputmode="numeric">
				<template #label>
					Date
				</template>
			</MaskField>
			<MaskField
				mask="____ ____ ____ ____"
				placeholder="____ ____ ____ ____"
				inputmode="numeric"
			>
				<template #label>
					Card number
				</template>
			</MaskField>
		</section>
	</StorybookStory>
	<StorybookStory name="Filled value">
		<section class="grid grid-cols-2 items-center gap-md w-full">
			<MaskField
				v-model:value="filledValue"
				mask="+7 (___) ___-__-__"
				:mask-aliases="['+8 (___) ___-__-__']"
				inputmode="tel"
			>
				<template #label>
					Phone
				</template>
			</MaskField>
			<p>value: {{ filledValue }}</p>
		</section>
	</StorybookStory>
	<StorybookStory name="Sizes">
		<section class="grid grid-cols-3 items-center gap-md w-full">
			<MaskField
				v-for="size in fieldSizes"
				:key="size"
				mask="+7 (___) ___-__-__"
				:size="size"
			>
				<template #label>
					Label
				</template>
			</MaskField>
		</section>
	</StorybookStory>
</template>
