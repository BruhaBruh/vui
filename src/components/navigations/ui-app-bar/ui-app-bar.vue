<script setup lang="ts">
import type { AppBarVariants } from "./ui-app-bar.variants";
import type { PropsPolymorphic } from "@/types";
import { computed } from "vue";
import { MotionComponent, Slot } from "@/components/utility";
import { appBarVariants } from "./ui-app-bar.variants";

export type AppBarProps = PropsPolymorphic & {
	variant?: AppBarVariants["variant"];
	centered?: boolean;
};

const { variant = "search", centered, as = "div" } = defineProps<AppBarProps>();

const variants = computed(() => ({ variant, centered }));
</script>

<template>
	<MotionComponent :as :class="appBarVariants(variants)">
		<div v-tw-merge :class="appBarVariants.top(variants)">
			<div v-tw-merge :class="appBarVariants.topItem({ position: 'leading' })">
				<slot name="leading" />
			</div>
			<Slot :class="appBarVariants.topItem({ position: 'center' })">
				<slot v-if="variant === 'search'" name="search-bar" />
				<div
					v-if="variant === 'small' && $slots.title"
					v-tw-merge
					:class="appBarVariants.text(variants)"
				>
					<p v-tw-merge :class="appBarVariants.title(variants)">
						<slot name="title" />
					</p>
					<p
						v-if="$slots.subtitle"
						v-tw-merge
						:class="appBarVariants.subtitle(variants)"
					>
						<slot name="subtitle" />
					</p>
				</div>
			</Slot>
			<div v-tw-merge :class="appBarVariants.topItem({ position: 'trailing' })">
				<slot name="trailing" />
			</div>
		</div>
		<div
			v-if="variant === 'medium' || variant === 'large'"
			v-tw-merge
			:class="appBarVariants.text(variants)"
		>
			<p v-tw-merge :class="appBarVariants.title(variants)">
				<slot name="title" />
			</p>
			<p
				v-if="$slots.subtitle"
				v-tw-merge
				:class="appBarVariants.subtitle(variants)"
			>
				<slot name="subtitle" />
			</p>
		</div>
	</MotionComponent>
</template>
