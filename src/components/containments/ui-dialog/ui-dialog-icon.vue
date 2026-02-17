<script setup lang="ts">
import type { IconProps } from "@/components/utility";
import { AnimatePresence } from "motion-v";
import { Icon, MotionComponent } from "@/components/utility";
import { transitionConfig } from "@/config";
import { dialogVariants } from "./ui-dialog.variants";

export type DialogIconProps = {
	icon: IconProps["icon"];
};

defineOptions({
	inheritAttrs: false,
});

const { icon } = defineProps<DialogIconProps>();
</script>

<template>
	<AnimatePresence>
		<MotionComponent
			:key="JSON.stringify(icon)"
			as-child
			:initial="{
				width: 0,
				height: 0,
				opacity: 0,
				transition: transitionConfig.preset.short.enter.asMotion(),
			}"
			:animate="{
				width: 'var(--spacing-6)',
				height: 'var(--spacing-6)',
				opacity: 1,
				transition: transitionConfig.preset.short.beginEnd.asMotion(),
			}"
			:exit="{
				width: 0,
				height: 0,
				opacity: 0,
				transition: transitionConfig.preset.short.exit.asMotion(),
			}"
			v-bind="$attrs"
			:class="dialogVariants.icon()"
		>
			<Icon :icon />
		</MotionComponent>
	</AnimatePresence>
</template>
