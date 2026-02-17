<script setup lang="ts">
import type { IconProps } from "@/components/utility";
import type { PropsPolymorphic } from "@/types";
import { AnimatePresence } from "motion-v";
import { useTemplateRef } from "vue";
import { Icon, MotionComponent } from "@/components/utility";
import { useInteractions } from "@/composables";
import { transitionConfig } from "@/config";
import { navigationBarVariants } from "./ui-navigation-bar.variants";

export type NavigationBarItemProps = PropsPolymorphic & {
	icon: IconProps["icon"];
	badgeColor?: IconProps["color"];
	badgeValue?: IconProps["value"];
	badgeMaxValue?: IconProps["maxValue"];
	active?: boolean;
};

const {
	icon,
	badgeColor,
	badgeValue,
	badgeMaxValue,
	active,
	as = "button",
} = defineProps<NavigationBarItemProps>();

const elementRef = useTemplateRef<HTMLElement>("navigation-bar-item");

useInteractions(elementRef);
</script>

<template>
	<component
		:is="as"
		ref="navigation-bar-item"
		v-tw-merge
		:class="navigationBarVariants.itemContainer({})"
	>
		<span :class="navigationBarVariants.item({ isSelected: active })">
			<MotionComponent
				as="span"
				aria-hidden
				:animate="
					active
						? { width: '100%', left: 0, opacity: 1 }
						: { width: '0', left: '50%', opacity: 0.1 }
				"
				:transition="transitionConfig.preset.short.beginEnd.asMotion()"
				:class="navigationBarVariants.itemBackground()"
			/>
			<span
				v-tw-merge
				:class="navigationBarVariants.iconContainer({ isSelected: active })"
			>
				<MotionComponent
					as="span"
					aria-hidden
					:animate="
						active
							? { width: '100%', left: 0, opacity: 1 }
							: { width: '0', left: '50%', opacity: 0.1 }
					"
					:transition="transitionConfig.preset.short.beginEnd.asMotion()"
					:class="navigationBarVariants.iconContainerBackground()"
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
						:class="navigationBarVariants.icon()"
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
			<span v-tw-merge :class="navigationBarVariants.label()">
				<slot />
			</span>
		</span>
	</component>
</template>
