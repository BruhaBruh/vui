<script setup lang="ts">
import type { SliderThumbVariants } from "./ui-slider.variants";
import {
	autoUpdate,
	flip,
	hide,
	offset,
	shift,
	useFloating,
} from "@floating-ui/vue";
import { useEventListener, useFocus } from "@vueuse/core";
import { AnimatePresence, motion } from "motion-v";
import { computed, useTemplateRef } from "vue";
import { materialDuration, materialEasing, transitionConfig } from "@/config";
import { sliderVariants } from "./ui-slider.variants";

defineOptions({
	inheritAttrs: false,
});

const {
	color,
	id,
	value,
	minValue,
	maxValue,
	percent,
	formatOptions = { style: "decimal" },
	disabled,
	dragging,
} = defineProps<{
	color?: SliderThumbVariants["color"];
	id: string;
	value: number;
	minValue: number;
	maxValue: number;
	percent: number;
	disabled: boolean;
	dragging: boolean;
	formatOptions?: Intl.NumberFormatOptions;
}>();

const emit = defineEmits<{
	change: [
    changeType: "inc" | "dec" | "inc-large" | "dec-large" | "min" | "max",
	];
}>();

const elementRef = useTemplateRef<HTMLElement>("slider-thumb");
const tooltip = useTemplateRef<HTMLElement>("slider-thumb-tooltip");

const {
	floatingStyles,
	update,
	placement: floatingPlacement,
} = useFloating(elementRef, tooltip, {
	placement: "top",
	middleware: [offset(4), flip(), hide(), shift()],
	whileElementsMounted: autoUpdate,
	transform: false,
});

const placement = computed(() => {
	if (floatingPlacement.value.includes("bottom"))
		return "bottom";
	if (floatingPlacement.value.includes("left"))
		return "left";
	if (floatingPlacement.value.includes("right"))
		return "right";
	return "top";
});

const formattedValue = computed(() => {
	const formatted = new Intl.NumberFormat("ru-RU", formatOptions);
	return formatted.format(value);
});

const { focused: inFocus } = useFocus(elementRef);

useEventListener("keydown", (e) => {
	if (disabled)
		return;
	if (!inFocus.value)
		return;
	const isControlKey = [
		"Home",
		"End",
		"PageUp",
		"PageDown",
		"ArrowUp",
		"ArrowRight",
		"ArrowDown",
		"ArrowLeft",
	].includes(e.key);
	if (!isControlKey)
		return;
	e.preventDefault();

	if (e.key === "Home") {
		emit("change", "min");
	}
	else if (e.key === "End") {
		emit("change", "max");
	}
	else if (e.key === "PageUp") {
		emit("change", "inc-large");
	}
	else if (e.key === "PageDown") {
		emit("change", "dec-large");
	}
	else if (e.key === "ArrowUp" || e.key === "ArrowRight") {
		emit("change", "inc");
	}
	else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
		emit("change", "dec");
	}
});
</script>

<template>
	<motion.div
		:id
		ref="slider-thumb"
		v-tw-merge
		role="slider"
		tabindex="0"
		:aria-disabled="disabled"
		:aria-valuemin="minValue"
		:aria-valuenow="value"
		:aria-valuemax="maxValue"
		:animate="{
			left: `${percent}%`,
			width: dragging && !disabled ? 'var(--spacing-0h)' : 'var(--spacing-1)',
			transition: {
				...transitionConfig.preset.short.beginEnd.asMotion(),
				duration: materialDuration.asMotion('short-2'),
			},
		}"
		:class="sliderVariants.thumb({ color })"
		v-bind="$attrs"
		@animationiteration="update()"
		@animation-complete="update()"
	/>
	<Teleport to="body">
		<AnimatePresence>
			<motion.div
				v-if="(dragging || inFocus) && !disabled"
				:id
				ref="slider-thumb-tooltip"
				v-tw-merge
				:initial="{
					opacity: 0,
					scale: 0,
					transition: transitionConfig.preset.short.enter.asMotion(),
				}"
				:animate="{
					opacity: 1,
					scale: 1,
					transition: transitionConfig.preset.short.beginEnd.asMotion(),
				}"
				:exit="{
					opacity: 0,
					scale: 0,
					transition: transitionConfig.preset.short.exit.asMotion(),
				}"
				:transition="{
					duration: materialDuration.asMotion('short-2'),
					ease: materialEasing['emphasized-decelerate'],
				}"
				role="tooltip"
				:style="floatingStyles"
				:class="sliderVariants.tooltip({ placement })"
			>
				{{ formattedValue }}
			</motion.div>
		</AnimatePresence>
	</Teleport>
</template>
