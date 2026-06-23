<script setup lang="ts">
import type { FieldProps } from "../ui-field";
import { useFocus } from "@vueuse/core";
import { AnimatePresence } from "motion-v";
import { computed, nextTick, ref, useTemplateRef, watchEffect } from "vue";
import { MotionComponent } from "@/components/utility";
import { transitionConfig } from "@/config";
import { Field } from "../ui-field";

export type MaskFieldProps = FieldProps & {
	mask: string;
	maskAliases?: string[];
	placeholder?: string;
	disabled?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const {
	mask,
	maskAliases = [],
	placeholder,
	disabled,
	size,
	alwaysShowLabel,
	invalid,
	leading,
	trailing,
	as,
} = defineProps<MaskFieldProps>();

const elementRef = useTemplateRef<HTMLInputElement | null>("input");
const element = computed<HTMLInputElement | null>(() => {
	if (elementRef.value && "$el" in elementRef.value) {
		return elementRef.value.$el as HTMLInputElement | null;
	}
	return elementRef.value;
});

const value = defineModel<string>("value", { default: "" });
const formattedValue = ref("");

const { focused } = useFocus(elementRef);

const isExpanded = computed(() => {
	if (placeholder)
		return true;
	if (focused.value)
		return true;
	return value.value.length > 0;
});

watchEffect(() => {
	if (formattedValue.value === "") {
		return;
	}
	const val = formatToPlain(formattedValue.value);
	const newValue = format(val);
	value.value = formatToPlain(newValue);
	formattedValue.value = newValue;
	nextTick(() => {
		setCursor(newValue);
	});
});

function format(val: string) {
	const numbers = val.replace(/\D/g, "").split("");
	return mask
		.split("")
		.map((v, i) => {
			if (v === "_") {
				return numbers.shift() || "_";
			}
			const isSimilarInMask = [mask, ...maskAliases].some((p) => {
				const maskChar = p[i];
				if (!maskChar)
					return false;
				if (!/\d/.test(maskChar))
					return false;
				return maskChar === numbers[0];
			});
			if (/\d/.test(v) && isSimilarInMask) {
				numbers.shift();
			}
			return v;
		})
		.join("");
}

function formatToPlain(val: string) {
	return val.replace(/[^+0-9]/g, "").replace(/(\+.*)\+/g, "$1");
}

function setCursor(val: string) {
	if (!element.value)
		return;
	const index = val.indexOf("_");
	if (index === -1)
		return;
	element.value.selectionStart = index;
	element.value.selectionEnd = index;
}

function onKeyDown(e: KeyboardEvent) {
	if (e.key !== "Backspace")
		return;
	if (
		value.value.length
		=== mask.slice(0, mask.indexOf("_")).replace(/[^+\d_]/g, "").length
		|| value.value.length === 0
	) {
		value.value = "";
		formattedValue.value = "";
		return;
	}
	e.preventDefault();
	const input = e.target as HTMLInputElement;
	let val = formatToPlain(input.value);
	if (
		input.selectionStart !== null
		&& input.selectionEnd !== null
		&& input.selectionStart !== input.selectionEnd
	) {
		val = formatToPlain(
			input.value.slice(0, input.selectionStart)
			+ input.value.slice(input.selectionEnd),
		);
	}
	else {
		val = val.slice(0, val.length - 1);
	}
	const newValue = format(val);
	value.value = formatToPlain(newValue);
	formattedValue.value = newValue;
	input.value = newValue;
	setCursor(newValue);
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
		:class="$attrs.class"
	>
		<template v-if="$slots.before" #before="props">
			<slot name="before" v-bind="props" />
		</template>
		<template v-if="$slots.leading" #leading="props">
			<slot name="leading" v-bind="props" />
		</template>
		<template v-if="$slots.trailing" #trailing="props">
			<slot name="trailing" v-bind="props" />
		</template>
		<template v-if="$slots.label" #label="props">
			<label v-tw-merge v-bind="props">
				<slot name="label" />
			</label>
		</template>
		<template #default="props">
			<AnimatePresence mode="wait">
				<MotionComponent
					as-child
					:variants="{
						hidden: { opacity: 0, height: 0 },
						expanded: { opacity: 1, height: 'auto' },
					}"
					:animate="isExpanded ? 'expanded' : 'hidden'"
					:transition="transitionConfig.preset.short.beginEnd.asMotion()"
				>
					<input
						ref="input"
						v-model="formattedValue"
						v-tw-merge
						type="text"
						inputmode="decimal"
						:placeholder
						v-bind="{ ...attrsWithoutClass($attrs), ...props }"
						@keydown="onKeyDown"
					>
				</MotionComponent>
			</AnimatePresence>
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
