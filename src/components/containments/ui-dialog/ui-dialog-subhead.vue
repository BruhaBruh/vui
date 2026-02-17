<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { dialogVariants } from "./ui-dialog.variants";

export type DialogSubheadProps = PropsPolymorphic;

const { as = "p" } = defineProps<DialogSubheadProps>();
</script>

<template>
	<component :is="as" v-tw-merge :class="dialogVariants.subhead()">
		<slot />
	</component>
</template>
