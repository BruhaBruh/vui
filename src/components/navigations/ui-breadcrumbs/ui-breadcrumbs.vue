<script setup lang="ts">
import type { BreadcrumbsStateOptions } from "./ui-breadcrumbs.context";
import type { PropsPolymorphic } from "@/types";
import {

	provideBreadcrumbsState,
} from "./ui-breadcrumbs.context";
import { breadcrumbsVariants } from "./ui-breadcrumbs.variants";

export type BreadcrumbsProps = PropsPolymorphic & {
	size?: BreadcrumbsStateOptions["size"];
	active?: BreadcrumbsStateOptions["active"];
	currentVariant?: BreadcrumbsStateOptions["currentVariant"];
};

const {
	size,
	active,
	currentVariant = "page",
	as = "ul",
} = defineProps<BreadcrumbsProps>();

provideBreadcrumbsState({
	size: () => size,
	active: () => active,
	currentVariant: () => currentVariant,
});
</script>

<template>
	<component :is="as" v-tw-merge :class="breadcrumbsVariants({ size })">
		<slot />
	</component>
</template>
