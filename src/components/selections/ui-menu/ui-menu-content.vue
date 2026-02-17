<script setup lang="ts">
import type { MenuStateOptions } from "./ui-menu.context";
import type { PopoverContentProps } from "@/components/containments";
import type { PropsPolymorphic } from "@/types";
import { motion } from "motion-v";
import { computed, onUnmounted } from "vue";
import {
	PopoverContent,

} from "@/components/containments";
import { materialDuration, materialEasing } from "@/config";
import { provideMenuState } from "./ui-menu.context";
import { menuVariants } from "./ui-menu.variants";

export type MenuContentProps = PropsPolymorphic
	& Omit<PopoverContentProps, "as"> & {
		contentAs?: PropsPolymorphic["as"];
		selectedValues?: MenuStateOptions["selectedValues"];
		selectionMode?: MenuStateOptions["selectionMode"];
		disabledValues?: MenuStateOptions["disabledValues"];
	};

defineOptions({
	inheritAttrs: false,
});

const {
	as = motion.div,
	selectionMode = "none",
	selectedValues = [],
	disabledValues = [],
	contentAs,
	placement = "bottom",
	offset = 4,
	...contentProps
} = defineProps<MenuContentProps>();

const emit = defineEmits<{
	change: [values: MenuStateOptions["selectedValues"]];
}>();

const selectedValuesComputed = computed(() => selectedValues);

const { triggerId, clearCollection } = provideMenuState({
	selectionMode: () => selectionMode,
	disabledValues: () => disabledValues,
	selectedValues: selectedValuesComputed,
	onChange: v => emit("change", v),
});

onUnmounted(clearCollection);
</script>

<template>
	<PopoverContent :as="contentAs" :placement :offset v-bind="contentProps">
		<component
			:is="as"
			v-tw-merge
			:initial="{ opacity: 0, scale: 0 }"
			:animate="{ opacity: 1, scale: 1 }"
			:exit="{ opacity: 0, scale: 0 }"
			:transition="{
				duration: materialDuration.asMotion('medium-1'),
				ease: materialEasing.standard,
			}"
			:class="menuVariants()"
			v-bind="$attrs"
		>
			<ul
				v-tw-merge
				:aria-labelledby="triggerId"
				role="menu"
				tabindex="-1"
				:class="menuVariants.list()"
			>
				<slot />
			</ul>
		</component>
	</PopoverContent>
</template>
