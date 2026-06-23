<script setup lang="ts">
import type { IconButtonVariants } from "@/components";
import { RouterLink } from "vue-router";
import { IconButton } from "@/components";
import { StorybookPlayground, StorybookStory } from "@/storybook/components";
import { bool, select } from "@/storybook/shared/controls";
import { buttonSizes, colors, shapes } from "@/storybook/shared/options";

const icons = ["tabler:square-rounded", "tabler:circle"] as const;
const variants = [
	"filled",
	"tonal",
	"outlined",
	"standard",
] as const satisfies readonly NonNullable<IconButtonVariants["variant"]>[];
const widths = [
	"default",
	"narrow",
	"wide",
] as const satisfies readonly NonNullable<IconButtonVariants["width"]>[];

const controls = {
	icon: select(icons, "tabler:square-rounded", { label: "Icon" }),
	size: select(buttonSizes, "sm", { label: "Size" }),
	shape: select(shapes, "rounded", { label: "Shape" }),
	variant: select(variants, "filled", { label: "Variant" }),
	color: select(colors, "primary", { label: "Color" }),
	width: select(widths, "default", { label: "Width" }),
	toggleable: bool(false, { label: "Toggleable" }),
	selected: bool(false, { label: "Selected" }),
	disabled: bool(false, { label: "Disabled" }),
};
</script>

<template>
	<StorybookPlayground
		component="IconButton"
		:controls
		:events="{ select: `console.log('on select')` }"
	>
		<template #default="{ props, set }">
			<IconButton v-bind="props" @select="set({ selected: !props.selected })" />
		</template>
	</StorybookPlayground>
	<StorybookStory name="As link">
		<IconButton :as="RouterLink" to="#" icon="tabler:square-rounded" />
	</StorybookStory>
	<StorybookStory name="Sizes">
		<IconButton
			v-for="size in buttonSizes"
			:key="size"
			:size
			icon="tabler:square-rounded"
		/>
	</StorybookStory>
	<StorybookStory name="Widths">
		<IconButton
			v-for="width in widths"
			:key="width"
			:width
			icon="tabler:square-rounded"
		/>
	</StorybookStory>
	<StorybookStory name="Sizes & Widths">
		<div class="flex flex-col items-center gap-md">
			<div
				v-for="width in widths"
				:key="width"
				class="flex items-center gap-md"
			>
				<IconButton
					v-for="size in buttonSizes"
					:key="size"
					:width
					:size
					icon="tabler:square-rounded"
				/>
			</div>
		</div>
	</StorybookStory>
	<StorybookStory name="Shapes">
		<IconButton
			v-for="shape in shapes"
			:key="shape"
			:shape
			icon="tabler:square-rounded"
		/>
	</StorybookStory>
	<StorybookStory name="Variants">
		<IconButton
			v-for="variant in variants"
			:key="variant"
			:variant
			icon="tabler:square-rounded"
		/>
	</StorybookStory>
	<StorybookStory name="Colors">
		<IconButton
			v-for="color in colors"
			:key="color"
			:color
			icon="tabler:square-rounded"
		/>
	</StorybookStory>
	<StorybookStory name="States">
		<IconButton icon="tabler:square-rounded" />
		<IconButton loading icon="tabler:square-rounded" />
		<IconButton loading="tabler:loader-2" icon="tabler:square-rounded" />
		<IconButton disabled icon="tabler:square-rounded" />
		<IconButton loading disabled icon="tabler:square-rounded" />
	</StorybookStory>
</template>
