<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { RadioVariants } from "./ui-radio.variants";
import type { MotionComponentProps } from "@/components/utility";
import { AnimatePresence, motion } from "motion-v";
import { useTemplateRef } from "vue";
import {
	MotionComponent,

} from "@/components/utility";
import { computedVariants, useInteractions, useRipple } from "@/composables";
import { materialDuration, materialEasing, transitionConfig } from "@/config";
import { radioVariants } from "./ui-radio.variants";

export type RadioProps = MotionComponentProps & {
	value: string | number;
	color?: RadioVariants["color"];
	checked?: boolean;
	disabled?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const {
	value,
	color,
	checked,
	disabled,
	as = "div",
	initial,
	animate,
	exit,
	...motionProps
} = defineProps<RadioProps>();

const emit = defineEmits<{
	change: [];
}>();
const elementRef = useTemplateRef<HTMLElement>("radio");
const inputRef = useTemplateRef<HTMLInputElement>("input");

const group = defineModel<string | number | undefined>("group", {
	default: undefined,
});

function attrsWithoutClass(attrs: UnknownRecord) {
	const newAttrs = { ...attrs };
	if ("class" in newAttrs)
		delete newAttrs.class;
	return newAttrs;
}

function update() {
	emit("change");
	if (group.value !== undefined) {
		group.value = value;
	}
}

function onClick() {
	update();
	if (!elementRef.value)
		return;
	inputRef.value?.focus();
}

function onChange() {
	update();
}

useInteractions(elementRef, {
	disabled: false,
});
useRipple(elementRef);

const {
	initial: initialObject,
	animate: animateObject,
	exit: exitObject,
} = computedVariants(() => ({
	initial,
	animate,
	exit,
}));
</script>

<template>
	<MotionComponent
		ref="radio"
		v-tw-merge
		:as
		v-bind="motionProps"
		:initial="{
			transition: transitionConfig.preset.short.enter.asMotion(),
			...initialObject,
		}"
		:animate="{
			transition: transitionConfig.preset.short.beginEnd.asMotion(),
			...animateObject,
		}"
		:exit="{
			transition: transitionConfig.preset.short.exit.asMotion(),
			...exitObject,
		}"
		:class="[radioVariants({ color }), $attrs.class]"
		:data-is-disabled="disabled ? 'true' : undefined"
		@click="onClick"
	>
		<input
			ref="input"
			v-tw-merge
			type="radio"
			class="sr-only"
			:disabled
			:checked="group === value || checked"
			:value
			v-bind="attrsWithoutClass($attrs)"
			@change="onChange"
		>
		<span
			v-tw-merge
			aria-hidden
			:class="
				radioVariants.mark({
					color,
					checked: group === value || checked,
				})
			"
		>
			<AnimatePresence mode="wait">
				<motion.span
					v-if="group === value || checked"
					v-tw-merge
					:initial="{ scale: 0, opacity: 0 }"
					:exit="{ scale: 0, opacity: 0 }"
					:animate="{
						scale: 1,
						opacity: 1,
					}"
					:transition="{
						duration: materialDuration.asMotion('short-2'),
						ease: materialEasing.standard,
					}"
					:class="radioVariants.icon({ color })"
				/>
			</AnimatePresence>
		</span>
	</MotionComponent>
</template>
