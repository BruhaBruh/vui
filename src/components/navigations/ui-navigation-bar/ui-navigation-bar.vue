<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { navigationBarVariants } from "./ui-navigation-bar.variants";

export type NavigationBarProps = PropsPolymorphic & {};

const { as = "div" } = defineProps<NavigationBarProps>();
</script>

<template>
	<component :is="as" v-tw-merge :class="navigationBarVariants()">
		<div v-tw-merge :class="navigationBarVariants.content()">
			<slot />
		</div>
	</component>
</template>
