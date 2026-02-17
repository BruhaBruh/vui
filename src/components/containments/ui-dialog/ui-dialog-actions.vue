<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { dialogVariants } from "./ui-dialog.variants";

export type DialogActionsProps = PropsPolymorphic;

const { as = "div" } = defineProps<DialogActionsProps>();
</script>

<template>
	<component :is="as" v-tw-merge :class="dialogVariants.actions()">
		<slot />
	</component>
</template>
