<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { Button, TextField } from "@/components";
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
<TextField
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
</TextField>
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
			<TextField
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
			</TextField>
		</template>
	</StorybookPlayground>
	<StorybookCode name="TextField" :code />
	<StorybookStory name="Sizes">
		<section class="grid grid-cols-3 items-center gap-md w-full">
			<TextField v-for="size in fieldSizes" :key="size" :size="size">
				<template #label>
					Label
				</template>
			</TextField>
		</section>
	</StorybookStory>
	<StorybookStory name="States">
		<section class="grid grid-cols-2 items-start gap-md w-full">
			<TextField placeholder="Enabled">
				<template #label>
					Default
				</template>
			</TextField>
			<TextField invalid placeholder="Invalid">
				<template #label>
					Invalid
				</template>
				<template #error>
					This field is required
				</template>
			</TextField>
			<TextField disabled placeholder="Disabled">
				<template #label>
					Disabled
				</template>
			</TextField>
			<TextField invalid disabled placeholder="Invalid + disabled">
				<template #label>
					Invalid + disabled
				</template>
				<template #error>
					This field is required
				</template>
			</TextField>
		</section>
	</StorybookStory>
	<StorybookStory name="Real-world: sign in form">
		<form class="flex w-full max-w-80 flex-col gap-md" @submit.prevent>
			<TextField type="email" placeholder="you@example.com" leading="tabler:mail">
				<template #label>
					Email
				</template>
			</TextField>
			<TextField type="password" placeholder="••••••••" leading="tabler:lock">
				<template #label>
					Password
				</template>
				<template #description>
					At least 8 characters
				</template>
			</TextField>
			<div class="mt-sm flex justify-end gap-sm">
				<Button variant="text" type="button">
					Cancel
				</Button>
				<Button type="submit">
					Sign in
				</Button>
			</div>
		</form>
	</StorybookStory>
</template>
