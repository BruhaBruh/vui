<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type {
	CheckboxMarkVariants,
	CheckboxVariants,
} from "./ui-checkbox.variants";
import type { MotionComponentProps } from "@/components/utility";
import { AnimatePresence } from "motion-v";
import { computed, useTemplateRef } from "vue";
import {
	Icon,
	MotionComponent,

} from "@/components/utility";
import { computedVariants, useInteractions, useRipple } from "@/composables";
import { materialDuration, materialEasing, transitionConfig } from "@/config";
import { checkboxVariants } from "./ui-checkbox.variants";

export type CheckboxProps = MotionComponentProps & {
	value: string | number;
	color?: CheckboxVariants["color"];
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const {
	value,
	color,
	disabled,
	checked,
	indeterminate,
	as = "div",
	initial,
	animate,
	exit,
	...motionProps
} = defineProps<CheckboxProps>();

const emit = defineEmits<{
	change: [checked: boolean];
}>();
const elementRef = useTemplateRef<HTMLElement>("checkbox");
const inputRef = useTemplateRef<HTMLInputElement>("input");

const group = defineModel<(string | number)[] | undefined>("group", {
	default: undefined,
});

const state = computed<NonNullable<CheckboxMarkVariants["state"]>>(() => {
	if (group.value?.includes(value) || checked)
		return "checked";
	if (indeterminate)
		return "indeterminate";
	return "unchecked";
});

function attrsWithoutClass(attrs: UnknownRecord) {
	const newAttrs = { ...attrs };
	if ("class" in newAttrs)
		delete newAttrs.class;
	return newAttrs;
}

function update(isChecked: boolean) {
	emit("change", isChecked);
	if (!group.value)
		return;
	if (isChecked) {
		group.value = [...group.value.filter(v => v !== value), value];
	}
	else {
		group.value = group.value.filter(v => v !== value);
	}
}

function onClick() {
	update(!(group.value?.includes(value) || checked));
	if (!elementRef.value)
		return;
	inputRef.value?.focus();
}

function onChange(e: Event) {
	const target = e.target as HTMLInputElement | null;
	if (!target)
		return;
	update(Boolean(target.checked));
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
		ref="checkbox"
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
		:data-is-disabled="disabled ? 'true' : undefined"
		:class="[checkboxVariants({ color }), $attrs.class]"
		@click="onClick"
	>
		<input
			ref="input"
			v-tw-merge
			type="checkbox"
			class="sr-only"
			:indeterminate
			:disabled
			:checked="group?.includes(value) || checked"
			:value
			v-bind="attrsWithoutClass($attrs)"
			@change="onChange"
		>
		<span
			v-tw-merge
			aria-hidden
			:class="checkboxVariants.mark({ color, state })"
		>
			<AnimatePresence mode="wait" :initial="false">
				<MotionComponent
					v-if="state !== 'unchecked'"
					:key="state"
					as-child
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
					:class="checkboxVariants.icon()"
				>
					<Icon v-if="state === 'checked'" icon="tabler:check" />
					<Icon v-else-if="state === 'indeterminate'" icon="tabler:minus" />
				</MotionComponent>
			</AnimatePresence>
		</span>
	</MotionComponent>
</template>
