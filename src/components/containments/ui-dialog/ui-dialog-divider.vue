<script setup lang="ts">
import type { DividerProps } from "../ui-divider";
import type { DialogDividerVariants } from "./ui-dialog.variants";
import { Divider } from "../ui-divider";
import {

	dialogVariants,
} from "./ui-dialog.variants";

export type DialogDividerProps = DividerProps & {
	spacing?: DialogDividerVariants["spacing"];
};

const { spacing, as = "p", ...rest } = defineProps<DialogDividerProps>();
</script>

<template>
	<Divider
		:is="as"
		v-tw-merge
		:class="dialogVariants.divider({ spacing })"
		v-bind="rest"
	/>
</template>
