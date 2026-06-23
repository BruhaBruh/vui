<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { Button, Card } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { bool, select } from "@/storybook/shared/controls";
import { cardVariants, surfaceColors } from "@/storybook/shared/options";

const controls = {
	color: select(surfaceColors, "standard", { label: "Color" }),
	variant: select(cardVariants, "none", { label: "Variant" }),
	interactable: bool(false, { label: "Interactable" }),
	disabled: bool(false, { label: "Disabled" }),
};

const code = ref("");

function onChange({ color, variant, interactable, disabled }: UnknownRecord) {
	code.value = `
<Card
  variant="${variant}"
  ${interactable ? "as=\"button\"" : ""}
  ${interactable ? `color="${color}"` : ""}
  :interactable="${interactable}"
  ${interactable ? `:disabled="${disabled}"` : ""}
  class="flex items-center justify-center px-md py-sm select-none"
>
  Card
</Card>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template #default="{ values: { interactable, ...values } }">
			<Card
				:key="String(interactable)"
				v-bind="values"
				:interactable="interactable as boolean"
				:as="interactable ? 'button' : undefined"
				class="flex items-center justify-center px-md py-sm select-none"
			>
				Card
			</Card>
		</template>
	</StorybookPlayground>
	<StorybookCode name="Card" :code />
	<StorybookStory name="Colors">
		<Card
			v-for="color in surfaceColors"
			:key="color"
			as="button"
			:color="color"
			variant="elevated"
			interactable
			class="flex items-center justify-center px-md py-sm select-none"
		>
			{{ color.charAt(0).toUpperCase() + color.slice(1) }}
		</Card>
	</StorybookStory>
	<StorybookStory name="Variants">
		<Card
			v-for="variant in cardVariants"
			:key="variant"
			:variant="variant"
			class="flex items-center justify-center px-md py-sm select-none"
		>
			{{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
		</Card>
	</StorybookStory>
	<StorybookStory name="Real-world: content card">
		<Card variant="elevated" class="flex w-full max-w-80 flex-col gap-sm p-lg">
			<h3 class="typography-title-large text-on-surface">
				Card title
			</h3>
			<p class="typography-body-medium text-on-surface-variant">
				Supporting text that describes the card content in a couple of lines so
				the layout looks realistic.
			</p>
			<div class="mt-sm flex justify-end gap-sm">
				<Button variant="text">
					Dismiss
				</Button>
				<Button variant="tonal">
					Confirm
				</Button>
			</div>
		</Card>
	</StorybookStory>
</template>
