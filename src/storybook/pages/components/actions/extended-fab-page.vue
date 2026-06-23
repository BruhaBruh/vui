<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ExtendedFab } from "@/components";
import { StorybookPlayground, StorybookStory } from "@/storybook/components";
import { icon, select } from "@/storybook/shared/controls";
import { colors, fabSizes, fabVariants } from "@/storybook/shared/options";

const controls = {
	icon: icon(undefined, { label: "Icon" }),
	size: select(fabSizes, "sm", { label: "Size" }),
	variant: select(fabVariants, "filled", { label: "Variant" }),
	color: select(colors, "primary", { label: "Color" }),
};
</script>

<template>
	<StorybookPlayground
		:is="ExtendedFab"
		component="ExtendedFab"
		:controls
		slot-text="ExtendedFab"
	/>
	<StorybookStory name="As link">
		<ExtendedFab :as="RouterLink" to="#" icon="tabler:square-rounded">
			Link
		</ExtendedFab>
	</StorybookStory>
	<StorybookStory name="Sizes">
		<div class="flex flex-col items-center gap-md">
			<ExtendedFab
				v-for="size in fabSizes"
				:key="size"
				:size
				icon="tabler:square-rounded"
			>
				ExtendedFab
			</ExtendedFab>
		</div>
	</StorybookStory>
	<StorybookStory name="Variants">
		<ExtendedFab
			v-for="variant in fabVariants"
			:key="variant"
			:variant
			icon="tabler:square-rounded"
		>
			ExtendedFab
		</ExtendedFab>
	</StorybookStory>
	<StorybookStory name="Colors">
		<div class="flex flex-col gap-md">
			<ExtendedFab
				v-for="color in colors"
				:key="color"
				:color
				icon="tabler:square-rounded"
			>
				ExtendedFab
			</ExtendedFab>
		</div>
	</StorybookStory>
	<StorybookStory name="States">
		<div class="flex flex-col items-center gap-md">
			<ExtendedFab icon="tabler:square-rounded">
				Default
			</ExtendedFab>
			<ExtendedFab loading icon="tabler:square-rounded">
				Loading
			</ExtendedFab>
			<ExtendedFab loading="tabler:loader-2" icon="tabler:square-rounded">
				Custom spinner
			</ExtendedFab>
		</div>
	</StorybookStory>
</template>
