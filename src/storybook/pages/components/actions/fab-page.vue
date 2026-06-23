<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Fab } from "@/components";
import { StorybookPlayground, StorybookStory } from "@/storybook/components";
import { select } from "@/storybook/shared/controls";
import { colors, fabSizes, fabVariants } from "@/storybook/shared/options";

const icons = ["tabler:square-rounded", "tabler:circle"] as const;

const controls = {
	icon: select(icons, "tabler:square-rounded", { label: "Icon" }),
	size: select(fabSizes, "sm", { label: "Size" }),
	variant: select(fabVariants, "filled", { label: "Variant" }),
	color: select(colors, "primary", { label: "Color" }),
};
</script>

<template>
	<StorybookPlayground :is="Fab" component="Fab" :controls />
	<StorybookStory name="As link">
		<Fab :as="RouterLink" to="#" icon="tabler:square-rounded" />
	</StorybookStory>
	<StorybookStory name="Sizes">
		<div class="flex flex-col items-center gap-md">
			<Fab v-for="size in fabSizes" :key="size" :size icon="tabler:square-rounded" />
		</div>
	</StorybookStory>
	<StorybookStory name="Variants">
		<Fab
			v-for="variant in fabVariants"
			:key="variant"
			:variant
			icon="tabler:square-rounded"
		/>
	</StorybookStory>
	<StorybookStory name="Colors">
		<Fab v-for="color in colors" :key="color" :color icon="tabler:square-rounded" />
	</StorybookStory>
	<StorybookStory name="States">
		<Fab icon="tabler:square-rounded" />
		<Fab loading icon="tabler:square-rounded" />
		<Fab loading="tabler:loader-2" icon="tabler:square-rounded" />
	</StorybookStory>
</template>
