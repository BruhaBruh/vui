<script setup lang="ts">
import type { IconProps } from "@/components/utility";
import type { PropsPolymorphic } from "@/types";
import { AnimatePresence } from "motion-v";
import { computed, useTemplateRef } from "vue";
import { Icon, MotionComponent } from "@/components/utility";
import { useInteractions } from "@/composables";
import { transitionConfig } from "@/config";
import { navigationRailVariants } from "./ui-navigation-rail.variants";

export type NavigationRailItemProps = PropsPolymorphic & {
	expanded?: boolean;
	icon: IconProps["icon"];
	badgeColor?: IconProps["color"];
	badgeValue?: IconProps["value"];
	badgeMaxValue?: IconProps["maxValue"];
	active?: boolean;
};

const {
	expanded,
	icon,
	badgeColor,
	badgeValue,
	badgeMaxValue,
	active,
	as = "button",
} = defineProps<NavigationRailItemProps>();

const variants = computed(() => ({ expanded, isSelected: active }));

const elementRef = useTemplateRef<HTMLElement>("navigation-rail-item");

useInteractions(elementRef);
</script>

<template>
	<MotionComponent
		ref="navigation-rail-item"
		:as
		:class="navigationRailVariants.itemContainer()"
	>
		<span :class="navigationRailVariants.item(variants)">
			<MotionComponent
				as="span"
				aria-hidden
				:animate="
					active
						? { width: '100%', left: 0, opacity: 1 }
						: { width: '0', left: '50%', opacity: 0.1 }
				"
				:transition="transitionConfig.preset.short.beginEnd.asMotion()"
				:class="navigationRailVariants.itemBackground(variants)"
			/>
			<span v-tw-merge :class="navigationRailVariants.iconContainer(variants)">
				<MotionComponent
					as="span"
					aria-hidden
					:animate="
						active
							? { width: '100%', left: 0, opacity: 1 }
							: { width: '0', left: '50%', opacity: 0.1 }
					"
					:transition="transitionConfig.preset.short.beginEnd.asMotion()"
					:class="navigationRailVariants.iconContainerBackground(variants)"
				/>
				<AnimatePresence mode="wait" :initial="false">
					<MotionComponent
						:key="JSON.stringify(icon)"
						as-child
						tabindex="-1"
						:initial="{
							width: 0,
							height: 0,
							transition: transitionConfig.preset.short.enter.asMotion(),
						}"
						:animate="{
							width: 'var(--spacing-6)',
							height: 'var(--spacing-6)',
							transition: transitionConfig.preset.short.beginEnd.asMotion(),
						}"
						:exit="{
							width: 0,
							height: 0,
							transition: transitionConfig.preset.short.exit.asMotion(),
						}"
						:class="navigationRailVariants.icon()"
					>
						<Icon
							:icon
							:badge="badgeValue !== undefined"
							:color="badgeColor"
							:value="badgeValue"
							:max-value="badgeMaxValue"
						/>
					</MotionComponent>
				</AnimatePresence>
			</span>
			<span v-tw-merge :class="navigationRailVariants.label(variants)">
				<slot />
			</span>
		</span>
	</MotionComponent>
</template>
