<script setup lang="ts">
import type { AsTag, MotionProps } from "motion-v";
import { Motion } from "motion-v";
import { transitionConfig } from "@/config";
import { Slot } from "./slot";

export type MotionComponentProps = MotionProps<AsTag>;

const {
	as = "div",
	asChild,
	transition = transitionConfig.preset.short.beginEnd.asMotion(),
	...props
} = defineProps<MotionComponentProps>();
</script>

<template>
	<Motion v-tw-merge as-child :transition v-bind="props">
		<Slot>
			<slot v-if="asChild" />
			<component :is="as" v-else>
				<slot />
			</component>
		</Slot>
	</Motion>
</template>
