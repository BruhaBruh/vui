<script setup lang="ts">
import type { ContainerVariants } from "./ui-container.variants";
import type { MotionComponentProps } from "@/components/utility";
import {
	MotionComponent,

} from "@/components/utility";
import { computedVariants } from "@/composables";
import { transitionConfig } from "@/config";
import {

	containerVariants,
} from "./ui-container.variants";

export type ContainerProps = MotionComponentProps & {
	color?: ContainerVariants["color"];
};

const {
	color,
	as = "div",
	initial,
	animate,
	exit,
	...motionProps
} = defineProps<ContainerProps>();

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
		:class="containerVariants({ color })"
	>
		<slot />
	</MotionComponent>
</template>
