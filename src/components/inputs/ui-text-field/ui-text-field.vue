<script setup lang="ts">
import type { FieldProps } from "../ui-field";
import { useFocus } from "@vueuse/core";
import { AnimatePresence } from "motion-v";
import { computed, useTemplateRef } from "vue";
import { MotionComponent } from "@/components/utility";
import { transitionConfig } from "@/config";
import { Field } from "../ui-field";

export type TextFieldProps = FieldProps & {
	placeholder?: string;
	disabled?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const {
	placeholder,
	disabled,
	size,
	alwaysShowLabel,
	invalid,
	leading,
	trailing,
	as,
} = defineProps<TextFieldProps>();

const elementRef = useTemplateRef<HTMLInputElement | null>("input");

const value = defineModel<string>("value", { default: "" });

const { focused } = useFocus(elementRef);

const isExpanded = computed(() => {
	if (placeholder)
		return true;
	if (focused.value)
		return true;
	return value.value.length > 0;
});

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
						v-model="value"
						v-tw-merge
						type="text"
						:placeholder
						v-bind="{ ...attrsWithoutClass($attrs), ...props }"
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
