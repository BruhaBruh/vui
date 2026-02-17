<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { computed } from "vue";
import { MotionComponent } from "@/components/utility";
import { navigationRailVariants } from "./ui-navigation-rail.variants";

export type NavigationRailSectionProps = PropsPolymorphic & {
	expanded?: boolean;
};

const { expanded, as = "div" } = defineProps<NavigationRailSectionProps>();

const variants = computed(() => ({ expanded }));
</script>

<template>
	<MotionComponent :as :class="navigationRailVariants.section(variants)">
		<p
			v-if="expanded && $slots.header"
			v-tw-merge
			:class="navigationRailVariants.sectionHeader()"
		>
			<slot name="header" />
		</p>
		<slot />
	</MotionComponent>
</template>
