<script setup lang="ts">
import { computed, onUnmounted, useId } from "vue";
import { Divider } from "@/components/containments";
import { useMenuState } from "./ui-menu.context";
import { menuVariants } from "./ui-menu.variants";

export type MenuSectionProps = {
	label?: string;
};

defineOptions({
	inheritAttrs: false,
});

const { label } = defineProps<MenuSectionProps>();

const { collection, addToCollection, removeFromCollection } = useMenuState();

const id = useId();

const sectionId = `${id}-section`;

const showDivider = computed(() => collection.value[0] !== sectionId);

addToCollection(sectionId);

onUnmounted(() => {
	removeFromCollection(sectionId);
});
</script>

<template>
	<Divider v-if="showDivider" :class="menuVariants.divider()" />
	<li role="presentation" v-bind="$attrs">
		<ul
			v-tw-merge
			:aria-label="label"
			:class="menuVariants.list({ withScroll: true })"
		>
			<slot />
		</ul>
	</li>
</template>
