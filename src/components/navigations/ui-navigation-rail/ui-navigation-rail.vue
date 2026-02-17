<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { computed } from "vue";
import { MotionComponent } from "@/components/utility";
import { navigationRailVariants } from "./ui-navigation-rail.variants";

export type NavigationRailProps = PropsPolymorphic & {
	modal?: boolean;
	expanded?: boolean;
};

const { modal, expanded, as = "div" } = defineProps<NavigationRailProps>();

const variants = computed(() => ({ modal, expanded }));
</script>

<template>
	<MotionComponent :as :class="navigationRailVariants(variants)">
		<div
			v-if="$slots.menu || $slots.fab"
			v-tw-merge
			:class="navigationRailVariants.menuFab()"
		>
			<slot name="menu" />
			<slot name="fab" />
		</div>
		<div v-tw-merge :class="navigationRailVariants.items(variants)">
			<slot :expanded />
		</div>
	</MotionComponent>
</template>
