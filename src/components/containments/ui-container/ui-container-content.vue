<script setup lang="ts">
import type { ContainerContentVariants } from "./ui-container.variants";
import type { PropsPolymorphic } from "@/types";
import { MotionComponent } from "@/components/utility";
import {

	containerVariants,
} from "./ui-container.variants";

export type ContainerContentProps = PropsPolymorphic & {
	variant?: ContainerContentVariants["variant"];
	padding?: ContainerContentVariants["padding"];
	fluid?: ContainerContentVariants["fluid"];
};

const {
	variant,
	padding,
	fluid,
	as = "div",
} = defineProps<ContainerContentProps>();
</script>

<template>
	<MotionComponent
		v-tw-merge
		:as
		:class="containerVariants.content({ variant, padding, fluid })"
	>
		<slot />
	</MotionComponent>
</template>
