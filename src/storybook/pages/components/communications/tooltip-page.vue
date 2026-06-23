<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { TooltipContentProps, TooltipProps } from "@/components";
import { ref } from "vue";
import { Button, IconButton, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { materialDuration } from "@/config";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { bool, num, select, text } from "@/storybook/shared/controls";

const triggers = ["both", "hover", "focus"] satisfies TooltipProps["trigger"][];
const variants = ["plain", "rich"] satisfies TooltipContentProps["variant"][];
const plainPlacements = [
	"left",
	"top",
	"bottom",
	"right",
] satisfies TooltipContentProps["placement"][];
const richPlacements = [
	"top-left",
	"top-right",
	"bottom-left",
	"bottom-right",
] satisfies TooltipContentProps["placement"][];

const iconByPlacement: Record<
	NonNullable<TooltipContentProps["placement"]>,
	string
> = {
	"top-left": "tabler:chevron-up-left",
	"top": "tabler:chevron-up",
	"top-right": "tabler:chevron-up-right",
	"right": "tabler:chevron-right",
	"bottom-right": "tabler:chevron-down-right",
	"bottom": "tabler:chevron-down",
	"bottom-left": "tabler:chevron-down-left",
	"left": "tabler:chevron-left",
};

const controls = {
	variant: select(variants, "plain", { label: "Variant" }),
	placement: select([...plainPlacements, ...richPlacements], "top", {
		label: "Placement",
	}),
	showDelay: num(materialDuration["short-2"], { label: "Show delay" }),
	hideDelay: num(materialDuration["long-2"], { label: "Hide delay" }),
	trigger: select(triggers, "both", { label: "Trigger" }),
	subhead: text("Subhead in Rich Tooltip", { label: "Subhead" }),
	text: text("Tooltip", { label: "Text" }),
	showActions: bool(false, { label: "Show actions" }),
};

const code = ref("");

function onChange({
	variant,
	placement,
	showDelay,
	hideDelay,
	trigger,
	subhead,
	text: textValue,
	showActions,
}: UnknownRecord) {
	code.value = `
<Tooltip
  trigger="${trigger}"
  :show-delay="${showDelay}"
  :hide-delay="${hideDelay}"
>
  <TooltipTrigger>
    <Button> Hover me </Button>
  </TooltipTrigger>
  <TooltipContent placement="${placement}">
  ${
		subhead && variant === "rich"
			? `
    <template #subhead>
      ${subhead}
    </template>`
			: ""
	}
    ${textValue}
    ${
		showActions && variant === "rich"
			? `
    <template #actions>
      <Button variant="text">Action</Button>
    </template>`
			: ""
	}
  </TooltipContent>
</Tooltip>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template
			#default="{
				values: {
					trigger,
					showDelay,
					hideDelay,
					subhead,
					text: textValue,
					showActions,
					...values
				},
			}"
		>
			<Tooltip
				:trigger="trigger as TooltipProps['trigger']"
				:show-delay="showDelay as number"
				:hide-delay="hideDelay as number"
			>
				<TooltipTrigger>
					<Button> Hover me </Button>
				</TooltipTrigger>
				<TooltipContent v-bind="values">
					<template #subhead>
						{{ subhead }}
					</template>
					<template #default>
						{{ textValue }}
					</template>
					<template v-if="showActions" #actions>
						<Button variant="text">
							Action
						</Button>
					</template>
				</TooltipContent>
			</Tooltip>
		</template>
	</StorybookPlayground>
	<StorybookCode name="Tooltip" :code />
	<StorybookStory name="Plain placements">
		<Tooltip v-for="placement in plainPlacements" :key="placement">
			<TooltipTrigger>
				<IconButton :icon="iconByPlacement[placement]" />
			</TooltipTrigger>
			<TooltipContent :placement="placement">
				Plain tooltip
			</TooltipContent>
		</Tooltip>
	</StorybookStory>
	<StorybookStory name="Rich placements">
		<Tooltip v-for="placement in richPlacements" :key="placement">
			<TooltipTrigger>
				<IconButton :icon="iconByPlacement[placement]" />
			</TooltipTrigger>
			<TooltipContent variant="rich" :placement="placement">
				<template #subhead>
					Rich tooltip
				</template>
				Supporting line text lorem ipsum dolor sit amet, consectetur
				<template #actions>
					<Button variant="text">
						Action
					</Button>
				</template>
			</TooltipContent>
		</Tooltip>
	</StorybookStory>
</template>
