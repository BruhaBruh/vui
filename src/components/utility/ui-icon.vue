<script setup lang="ts">
import type { IconProps as IconifyIconProps } from "@iconify/vue";
import type { BadgeProps } from "../communications";
import {
	Icon as IconifyIcon,

} from "@iconify/vue";
import { Badge } from "../communications";

export type IconProps = IconifyIconProps & {
	badge?: boolean;
} & Pick<BadgeProps, "color" | "value" | "maxValue">;

defineOptions({ inheritAttrs: false });

const { badge, color, value, maxValue, ...props } = defineProps<IconProps>();
</script>

<template>
	<Badge v-if="badge" placement="icon" :color :value :max-value>
		<IconifyIcon
			v-tw-merge
			v-bind="{ ...$attrs, ...props }"
			width="auto"
			height="auto"
			tabindex="-1"
		/>
	</Badge>
	<IconifyIcon
		v-else
		v-tw-merge
		v-bind="{ ...$attrs, ...props }"
		width="auto"
		height="auto"
		tabindex="-1"
	/>
</template>
