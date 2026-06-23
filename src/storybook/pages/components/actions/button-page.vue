<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Button } from "@/components";
import { StorybookPlayground, StorybookStory } from "@/storybook/components";
import { bool, icon, select } from "@/storybook/shared/controls";
import {
	buttonSizes,
	buttonVariants,
	colors,
	shapes,
} from "@/storybook/shared/options";

const controls = {
	leading: icon(undefined, { label: "Leading Icon" }),
	trailing: icon(undefined, { label: "Trailing Icon" }),
	size: select(buttonSizes, "sm", { label: "Size" }),
	shape: select(shapes, "rounded", { label: "Shape" }),
	variant: select(buttonVariants, "filled", { label: "Variant" }),
	color: select(colors, "primary", { label: "Color" }),
	toggleable: bool(false, { label: "Toggleable" }),
	selected: bool(false, { label: "Selected" }),
	disabled: bool(false, { label: "Disabled" }),
};
</script>

<template>
	<StorybookPlayground
		component="Button"
		:controls
		slot-text="Button"
		:events="{ select: `console.log('on select')` }"
	>
		<template #default="{ props, set }">
			<Button v-bind="props" @select="set({ selected: !props.selected })">
				Button
			</Button>
		</template>
	</StorybookPlayground>
	<StorybookStory name="As link">
		<Button
			:as="RouterLink"
			to="#"
			leading="tabler:square-rounded"
			trailing="tabler:square-rounded"
		>
			Link
		</Button>
	</StorybookStory>
	<StorybookStory name="Sizes">
		<div class="flex flex-col items-center gap-md">
			<Button v-for="size in buttonSizes" :key="size" :size>
				Button
			</Button>
		</div>
	</StorybookStory>
	<StorybookStory name="Shapes">
		<Button v-for="shape in shapes" :key="shape" :shape>
			Button
		</Button>
	</StorybookStory>
	<StorybookStory name="Variants">
		<Button v-for="variant in buttonVariants" :key="variant" :variant>
			Button
		</Button>
	</StorybookStory>
	<StorybookStory name="Colors">
		<Button v-for="color in colors" :key="color" :color>
			Button
		</Button>
	</StorybookStory>
	<StorybookStory name="States">
		<div class="flex flex-col items-center gap-md">
			<div class="flex items-center gap-md">
				<Button>Default</Button>
				<Button loading>
					Loading
				</Button>
				<Button loading="tabler:loader-2">
					Custom spinner
				</Button>
			</div>
			<div class="flex items-center gap-md">
				<Button disabled>
					Disabled
				</Button>
				<Button loading disabled>
					Loading + disabled
				</Button>
			</div>
		</div>
	</StorybookStory>
</template>
