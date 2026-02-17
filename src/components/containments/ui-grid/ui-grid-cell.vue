<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/communications";
import { gridVariants } from "./ui-grid.variants";

export type GridCellProps = PropsPolymorphic & {
	tooltip?: boolean;
	unwrap?: boolean;
};

const { tooltip, unwrap, as = "div" } = defineProps<GridCellProps>();
</script>

<template>
	<component :is="as" v-tw-merge :class="gridVariants.cell()">
		<slot name="before" />
		<template v-if="tooltip">
			<Tooltip trigger="hover">
				<TooltipTrigger>
					<template v-if="unwrap">
						<slot />
					</template>
					<span v-else v-tw-merge :class="gridVariants.label()">
						<slot />
					</span>
				</TooltipTrigger>
				<TooltipContent placement="top">
					<slot name="tooltip-label">
						<slot />
					</slot>
				</TooltipContent>
			</Tooltip>
		</template>
		<template v-else>
			<template v-if="unwrap">
				<slot />
			</template>
			<span v-else v-tw-merge :class="gridVariants.label()">
				<slot />
			</span>
		</template>
		<slot name="after" />
	</component>
</template>
