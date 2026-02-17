<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { computed } from "vue";
import { Icon } from "@/components/utility";
import { useBreadcrumbsState } from "./ui-breadcrumbs.context";
import { breadcrumbsVariants } from "./ui-breadcrumbs.variants";

export type BreadcrumbsItemProps = PropsPolymorphic & {
	value: string;
};

defineOptions({
	inheritAttrs: false,
});

const { value, as = "span" } = defineProps<BreadcrumbsItemProps>();

const { active, size, currentVariant } = useBreadcrumbsState();

const isActive = computed(() => active.value === value);
</script>

<template>
	<li>
		<component
			:is="as"
			v-tw-merge
			:aria-current="isActive ? currentVariant : undefined"
			:class="breadcrumbsVariants.item({ isActive, size })"
			v-bind="$attrs"
		>
			<slot />
		</component>
	</li>
	<li aria-hidden class="last:hidden">
		<Icon
			icon="tabler:chevron-right"
			:class="breadcrumbsVariants.icon({ size })"
		/>
	</li>
</template>
