<script setup lang="ts">
import type { TeleportProps } from "vue";
import type { TooltipVariants } from "./ui-tooltip.variants";
import type { MotionComponentProps } from "@/components/utility";
import {
	autoUpdate,
	flip,
	hide,
	offset,
	shift,
	useFloating,
} from "@floating-ui/vue";
import { AnimatePresence, motion } from "motion-v";
import { computed } from "vue";
import {
	MotionComponent,

} from "@/components/utility";
import { computedVariants } from "@/composables";
import { transitionConfig } from "@/config";
import { useTooltipState } from "./ui-tooltip.context";
import {
	floatingPlacementToVariantPlacement,
	variantPlacementToFloatingPlacement,
} from "./ui-tooltip.utility";
import { tooltipVariants } from "./ui-tooltip.variants";

export type TooltipContentProps = Omit<MotionComponentProps, "asChild"> & {
	variant?: TooltipVariants["variant"];
	placement?: TooltipVariants["placement"];
	teleportTo?: TeleportProps["to"];
	teleportDisabled?: TeleportProps["disabled"];
	teleportDefer?: TeleportProps["defer"];
};

defineOptions({
	inheritAttrs: false,
});

const {
	variant,
	placement,
	as = motion.div,
	teleportTo = "body",
	teleportDisabled,
	teleportDefer,
	initial,
	animate,
	exit,
	...motionProps
} = defineProps<TooltipContentProps>();

const { id, trigger, tooltip, open } = useTooltipState();

const { floatingStyles, placement: floatingPlacement } = useFloating(
	trigger,
	tooltip,
	{
		placement: () => variantPlacementToFloatingPlacement(placement),
		middleware: [
			offset(({ rects }) => {
				const padding = 4;
				if (placement === "top-left" || placement === "bottom-left") {
					return {
						mainAxis: padding,
						crossAxis: -rects.floating.width - padding,
					};
				}
				if (placement === "top-right" || placement === "bottom-right") {
					return {
						mainAxis: padding,
						crossAxis: rects.floating.width + padding,
					};
				}
				return padding;
			}),
			flip(),
			hide(),
			shift(),
		],
		whileElementsMounted: autoUpdate,
		transform: false,
	},
);

const finalPlacement = computed(() =>
	floatingPlacementToVariantPlacement(floatingPlacement.value),
);

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
	<Teleport
		:to="teleportTo"
		:disabled="teleportDisabled"
		:defer="teleportDefer"
	>
		<AnimatePresence mode="wait">
			<MotionComponent
				v-if="open"
				:id
				ref="tooltip"
				:as
				role="tooltip"
				v-bind="{ ...motionProps, ...$attrs }"
				:initial="{
					opacity: 0,
					scale: 0,
					transition: transitionConfig.preset.short.enter.asMotion(),
					...initialObject,
				}"
				:animate="{
					opacity: 1,
					scale: 1,
					transition: transitionConfig.preset.short.beginEnd.asMotion(),
					...animateObject,
				}"
				:exit="{
					opacity: 0,
					scale: 0,
					transition: transitionConfig.preset.short.exit.asMotion(),
					...exitObject,
				}"
				:style="floatingStyles"
				:class="tooltipVariants({ variant, placement: finalPlacement })"
			>
				<p
					v-if="variant === 'rich' && $slots.subhead"
					v-tw-merge
					:class="tooltipVariants.subhead()"
				>
					<slot name="subhead" />
				</p>
				<p v-tw-merge :class="tooltipVariants.text({ variant })">
					<slot />
				</p>
				<p
					v-if="variant === 'rich' && $slots.actions"
					v-tw-merge
					:class="tooltipVariants.actions()"
				>
					<slot name="actions" />
				</p>
			</MotionComponent>
		</AnimatePresence>
	</Teleport>
</template>
