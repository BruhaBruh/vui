<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { dialogVariants } from "./ui-dialog.variants";

export type DialogTextProps = PropsPolymorphic;

const { as = "p" } = defineProps<DialogTextProps>();
</script>

<template>
	<component :is="as" v-tw-merge :class="dialogVariants.text()">
		<slot />
	</component>
</template>
