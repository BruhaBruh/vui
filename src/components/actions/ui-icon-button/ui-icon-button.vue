<script setup lang="ts">
import type { IconButtonVariants } from "./ui-icon-button.variants";
import type { IconProps, MotionComponentProps } from "@/components/utility";
import { AnimatePresence } from "motion-v";
import { computed, useTemplateRef } from "vue";
import {
	Icon,

	MotionComponent,

} from "@/components/utility";
import { computedVariants, useRipple, useToggleButton } from "@/composables";
import { transitionConfig } from "@/config";
import {
	iconButtonBorderRadius,
	iconButtonBorderRadiusAlt,
	iconButtonIconSize,
	iconButtonWidth,
} from "./ui-icon-button.options";
import {

	iconButtonVariants,
} from "./ui-icon-button.variants";

export type IconButtonProps = Omit<MotionComponentProps, "asChild"> & {
	loading?: IconProps["icon"] | boolean;
	icon?: IconProps["icon"];
	badgeColor?: IconProps["color"];
	badgeValue?: IconProps["value"];
	badgeMaxValue?: IconProps["maxValue"];
	size?: IconButtonVariants["size"];
	shape?: IconButtonVariants["shape"];
	variant?: IconButtonVariants["variant"];
	color?: IconButtonVariants["color"];
	width?: IconButtonVariants["width"];
	toggleable?: boolean;
	selected?: boolean;
};

const {
	loading,
	icon,
	badgeColor,
	badgeValue,
	badgeMaxValue,
	size = "sm",
	shape = "rounded",
	variant = "filled",
	color = "primary",
	width = "default",
	toggleable,
	selected,
	as = "button",
	initial,
	animate,
	exit,
	...motionProps
} = defineProps<IconButtonProps>();

const emit = defineEmits<{
	select: [];
}>();

const elementRef = useTemplateRef<HTMLElement>("icon-button");

const { isPressed } = useToggleButton(elementRef, {
	isToggleable: () => toggleable,
	isSelected: () => selected,
	onClick: () => {
		if (!toggleable)
			return;
		emit("select");
	},
	elementType: as === "button" ? "button" : "",
});
useRipple(elementRef);

const variants = computed(() => ({
	size,
	shape,
	variant,
	color,
	width,
}));

const borderRadius = computed(() => {
	if (toggleable) {
		return selected
			? iconButtonBorderRadiusAlt[shape][size]
			: iconButtonBorderRadius[shape][size];
	}
	if (shape === "rounded" && isPressed.value) {
		return iconButtonBorderRadiusAlt[shape][size];
	}
	return iconButtonBorderRadius[shape][size];
});

const buttonWidth = computed(() => {
	return iconButtonWidth[size][width];
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

const finalIcon = computed(() => {
	if (loading || loading === "") {
		if (typeof loading === "boolean" || loading === "") {
			return "tabler:loader-2";
		}
		return loading;
	}
	return icon;
});
</script>

<template>
	<MotionComponent
		ref="icon-button"
		:as
		tabindex="0"
		v-bind="motionProps"
		:initial="{
			width: buttonWidth,
			borderRadius,
			transition: transitionConfig.preset.short.enter.asMotion(),
			...initialObject,
		}"
		:animate="{
			width: buttonWidth,
			height: iconButtonWidth[size].default,
			borderRadius,
			transition: transitionConfig.preset.short.beginEnd.asMotion(),
			...animateObject,
		}"
		:exit="{
			transition: transitionConfig.preset.short.exit.asMotion(),
			...exitObject,
		}"
		:class="iconButtonVariants(variants)"
	>
		<AnimatePresence mode="wait" :initial="false">
			<MotionComponent
				:key="JSON.stringify(finalIcon)"
				as-child
				:initial="{
					width: 0,
					height: 0,
					transition: transitionConfig.preset.short.enter.asMotion(),
				}"
				:animate="{
					width: iconButtonIconSize[size],
					height: iconButtonIconSize[size],
					transition: transitionConfig.preset.short.beginEnd.asMotion(),
				}"
				:exit="{
					width: 0,
					height: 0,
					transition: transitionConfig.preset.short.exit.asMotion(),
				}"
				:class="iconButtonVariants.icon(variants)"
			>
				<slot v-if="$slots.default || !finalIcon" />
				<Icon
					v-else
					:icon="finalIcon"
					:badge="badgeValue !== undefined"
					:color="badgeColor"
					:value="badgeValue"
					:max-value="badgeMaxValue"
					:class="[(loading || loading === '') && 'animate-spin']"
				/>
			</MotionComponent>
		</AnimatePresence>
	</MotionComponent>
</template>
