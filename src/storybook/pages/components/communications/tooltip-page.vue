<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { TooltipContentProps, TooltipProps } from "@/components";
import { ref } from "vue";
import {
	Button,
	IconButton,
	Tooltip,
	TooltipContent,

	TooltipTrigger,
} from "@/components";
import { materialDuration } from "@/config";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";

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

const code = ref("");

function onChange({
	variant,
	placement,
	showDelay,
	hideDelay,
	trigger,
	subhead,
	text,
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
    ${text}
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
	<StorybookPlayground
		:arguments="{
			variant: {
				type: 'select',
				label: 'Variant',
				description: 'Variant of Tooltip',
				defaultValue: 'plain',
				options: variants,
			},
			placement: {
				type: 'select',
				label: 'Placement',
				description: 'Placement of Tooltip',
				defaultValue: 'top',
				options: [...plainPlacements, ...richPlacements],
			},
			showDelay: {
				type: 'number',
				label: 'Show delay',
				description: 'Show delay of Tooltip',
				defaultValue: materialDuration['short-2'],
			},
			hideDelay: {
				type: 'number',
				label: 'Hide delay',
				description: 'Hide delay of Tooltip',
				defaultValue: materialDuration['long-2'],
			},
			trigger: {
				type: 'select',
				label: 'Trigger',
				description: 'Trigger of Tooltip',
				defaultValue: 'both',
				options: triggers,
			},
			subhead: {
				type: 'text',
				label: 'Subbead',
				description: 'Subbead of Tooltip',
				defaultValue: 'Subhead in Rich Tooltip',
			},
			text: {
				type: 'text',
				label: 'Text',
				description: 'Text of Tooltip',
				defaultValue: 'Tooltip',
			},
			showActions: {
				type: 'switch',
				label: 'Show actions',
				description: 'Show actions in Tooltip',
				defaultValue: false,
			},
		}"
		@change="onChange"
	>
		<template
			#default="{
				values: {
					trigger,
					showDelay,
					hideDelay,
					subhead,
					text,
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
						{{ text }}
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
