<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { MotionComponent } from "@/components/utility";
import { appBarVariants } from "./ui-app-bar.variants";

export type AppBarSlotProps = PropsPolymorphic;

const { as = "div" } = defineProps<AppBarSlotProps>();
</script>

<template>
	<MotionComponent :as :class="appBarVariants.slot()">
		<slot />
	</MotionComponent>
</template>
