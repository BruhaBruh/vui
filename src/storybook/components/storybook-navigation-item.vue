<script setup lang="ts">
import type { NavigationNode } from "../navigation";
import { AnimatePresence } from "motion-v";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@/components";
import StorybookNavigation from "./storybook-navigation.vue";

const { node } = defineProps<{ node: NavigationNode }>();

const isOpen = ref(true);
</script>

<template>
	<li class="w-full inline-flex flex-col">
		<component
			:is="node.type === 'folder' ? 'button' : RouterLink"
			:to="node.path"
			class="w-full cursor-pointer select-none inline-flex items-center gap-xs py-xs px-sm rounded-md state-on-surface hover:state-hover [&>svg]:size-6"
			@click="isOpen = !isOpen"
		>
			<Icon v-if="node.icon" :icon="node.icon" />
			<Icon v-else-if="node.type === 'folder'" icon="tabler:folder" />
			<Icon v-else icon="tabler:file" />

			<span class="typography-title-large">{{ node.name }}</span>
			<Icon
				v-if="node.type === 'folder'"
				icon="tabler:chevron-down"
				class="ml-auto transition duration-medium-1 easing-standard" :class="[
					{
						'rotate-180': isOpen,
					},
				]"
			/>
		</component>
		<AnimatePresence v-if="node.type === 'folder'">
			<StorybookNavigation
				v-if="isOpen"
				class="pl-xs"
				:navigation="node.children"
			/>
		</AnimatePresence>
	</li>
</template>
