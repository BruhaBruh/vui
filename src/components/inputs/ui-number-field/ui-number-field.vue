<script setup lang="ts">
import type { FieldProps } from "../ui-field";
import { Icon } from "@/components/utility";
import { Field } from "../ui-field";
import { numberFieldVariants } from "./ui-number-field.variants";

export type NumberFieldProps = FieldProps & {
	min?: number;
	max?: number;
	step?: number;
	stepMultiplier?: number;
	placeholder?: string;
	disabled?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const {
	min,
	max,
	step = 1,
	stepMultiplier = 10,
	placeholder,
	disabled,
	size = "lg",
	alwaysShowLabel,
	invalid,
	leading,
	trailing,
	as,
} = defineProps<NumberFieldProps>();

const value = defineModel<number>("value", { default: 0 });

function onKeyDown(e: KeyboardEvent) {
	const isControlKey = [
		"Home",
		"End",
		"PageUp",
		"PageDown",
		"ArrowUp",
		"ArrowDown",
	].includes(e.key);
	if (!isControlKey)
		return;
	e.preventDefault();

	if (e.key === "Home") {
		if (min === undefined)
			return;
		value.value = min;
	}
	else if (e.key === "End") {
		if (max === undefined)
			return;
		value.value = max;
	}
	else if (e.key === "PageUp") {
		value.value = value.value + step * stepMultiplier;
	}
	else if (e.key === "PageDown") {
		value.value = value.value - step * stepMultiplier;
	}
	else if (e.key === "ArrowUp") {
		value.value = value.value + step;
	}
	else if (e.key === "ArrowDown") {
		value.value = value.value - step;
	}
}

function onBlur(e: FocusEvent) {
	if (!e.target)
		return;
	if (min !== undefined && value.value < min) {
		value.value = min;
	}
	if (max !== undefined && value.value > max) {
		value.value = max;
	}
	(e.target as HTMLInputElement).value = value.value.toString();
}

function attrsWithoutClass(attrs: Record<string, unknown>) {
	const newAttrs = { ...attrs };
	if ("class" in newAttrs)
		delete newAttrs.class;
	return newAttrs;
}
</script>

<template>
	<Field
		:as
		:size
		:always-show-label
		:invalid
		:leading
		:trailing
		:aria-disabled="disabled"
		:class="[numberFieldVariants(), $attrs.class]"
	>
		<template v-if="$slots.before" #before="props">
			<slot name="before" v-bind="props" />
		</template>
		<template v-if="$slots.leading" #leading="props">
			<slot name="leading" v-bind="props" />
		</template>
		<template #trailing="props">
			<span
				v-tw-merge
				v-bind="props"
				class="inline-flex flex-col items-center justify-center"
			>
				<button
					tabindex="-1"
					aria-label="next"
					:class="numberFieldVariants.spinButton({ size })"
					:disabled
					@click="value = value + step"
				>
					<Icon icon="tabler:caret-up-filled" class="size-4" />
				</button>
				<button
					tabindex="-1"
					aria-label="previous"
					:class="numberFieldVariants.spinButton({ size })"
					:disabled
					@click="value = value - step"
				>
					<Icon icon="tabler:caret-down-filled" class="size-4" />
				</button>
			</span>
		</template>
		<template v-if="$slots.label" #label="props">
			<label v-tw-merge v-bind="props">
				<slot name="label" />
			</label>
		</template>
		<template #default="props">
			<input
				v-model.number="value"
				v-tw-merge
				type="text"
				inputmode="decimal"
				:step
				:min
				:max
				:placeholder
				v-bind="{ ...attrsWithoutClass($attrs), ...props }"
				@keydown="onKeyDown"
				@blur="onBlur"
			>
		</template>
		<template v-if="$slots.description" #description="props">
			<p v-tw-merge v-bind="props">
				<slot name="description" />
			</p>
		</template>
		<template v-if="$slots.error" #error="props">
			<p v-tw-merge v-bind="props">
				<slot name="error" />
			</p>
		</template>
		<template v-if="$slots.after" #after="props">
			<slot name="after" v-bind="props" />
		</template>
	</Field>
</template>
