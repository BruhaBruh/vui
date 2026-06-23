<script setup lang="ts">
import type { SwitchVariants } from "./ui-switch.variants";
import type { IconProps, MotionComponentProps } from "@/components/utility";
import { AnimatePresence, motion } from "motion-v";
import { useTemplateRef } from "vue";
import {
	Icon,

	MotionComponent,

} from "@/components/utility";
import { computedVariants, useInteractions } from "@/composables";
import { materialDuration, materialEasing, transitionConfig } from "@/config";
import { switchVariants } from "./ui-switch.variants";

export type SwitchProps = MotionComponentProps & {
	color?: SwitchVariants["color"];
	checkedIcon?: IconProps["icon"];
	uncheckedIcon?: IconProps["icon"];
	checked?: boolean;
	disabled?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const {
	color,
	checkedIcon,
	uncheckedIcon,
	checked,
	disabled,
	as = "div",
	initial,
	animate,
	exit,
	...motionProps
} = defineProps<SwitchProps>();

const emit = defineEmits<{
	change: [checked: boolean];
}>();
const elementRef = useTemplateRef<HTMLElement>("switch");
const inputRef = useTemplateRef<HTMLInputElement>("input");

function attrsWithoutClass(attrs: Record<string, unknown>) {
	const newAttrs = { ...attrs };
	if ("class" in newAttrs)
		delete newAttrs.class;
	return newAttrs;
}

function onClick() {
	emit("change", !checked);
	if (!elementRef.value)
		return;
	inputRef.value?.focus();
}

function onChange(e: Event) {
	const target = e.target as HTMLInputElement | null;
	if (!target)
		return;
	emit("change", Boolean(target.checked));
}

const { isPressed } = useInteractions(elementRef, {
	disabled: false,
});

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
		ref="switch"
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
		:class="[switchVariants({ color, isSelected: checked }), $attrs.class]"
		:data-is-disabled="disabled ? 'true' : undefined"
		@click="onClick"
	>
		<input
			ref="input"
			v-tw-merge
			type="checkbox"
			role="switch"
			class="sr-only"
			:disabled
			:checked
			v-bind="attrsWithoutClass($attrs)"
			@change="onChange"
		>
		<span
			v-tw-merge
			aria-hidden
			:class="switchVariants.thumbWrapper({ color, isSelected: checked })"
		>
			<motion.span
				v-tw-merge
				:animate="{
					width: isPressed
						? 'var(--spacing-7)'
						: checked || uncheckedIcon
							? 'var(--spacing-6)'
							: 'var(--spacing-4)',
					height: isPressed
						? 'var(--spacing-7)'
						: checked || uncheckedIcon
							? 'var(--spacing-6)'
							: 'var(--spacing-4)',
				}"
				:transition="{
					duration: materialDuration.asMotion('medium-1'),
					ease: materialEasing.standard,
				}"
				:class="
					switchVariants.thumb({
						color,
						isSelected: checked,
						size: checked
							? checkedIcon
								? 'icon'
								: 'default'
							: uncheckedIcon
								? 'icon'
								: 'default',
					})
				"
			>
				<AnimatePresence mode="wait" :initial="false">
					<MotionComponent
						v-if="checked && checkedIcon"
						:key="JSON.stringify(checkedIcon)"
						as-child
						:initial="{ width: 0, height: 0 }"
						:exit="{ width: 0, height: 0 }"
						:animate="{
							width: 'var(--spacing-4)',
							height: 'var(--spacing-4)',
						}"
						:transition="{
							duration: materialDuration.asMotion('short-2'),
							ease: materialEasing.standard,
						}"
						:class="switchVariants.icon()"
					>
						<Icon :icon="checkedIcon" />
					</MotionComponent>
					<MotionComponent
						v-else-if="!checked && uncheckedIcon"
						:key="JSON.stringify(uncheckedIcon)"
						as-child
						:initial="{ width: 0, height: 0 }"
						:exit="{ width: 0, height: 0 }"
						:animate="{
							width: 'var(--spacing-4)',
							height: 'var(--spacing-4)',
						}"
						:transition="{
							duration: materialDuration.asMotion('short-2'),
							ease: materialEasing.standard,
						}"
						:class="switchVariants.icon()"
					>
						<Icon :icon="uncheckedIcon" />
					</MotionComponent>
				</AnimatePresence>
			</motion.span>
		</span>
	</MotionComponent>
</template>
