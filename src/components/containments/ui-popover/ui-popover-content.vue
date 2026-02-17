<script setup lang="ts">
import type { TeleportProps } from "vue";
import type { PopoverVariants } from "./ui-popover.variants";
import type { PropsPolymorphic } from "@/types";
import {
	autoUpdate,
	flip,
	offset as floatingOffset,
	hide,
	shift,
	useFloating,
} from "@floating-ui/vue";
import { AnimatePresence, motion } from "motion-v";
import {

	useAttrs,
	watchEffect,
} from "vue";
import { Slot } from "@/components/utility";
import { usePopoverState } from "./ui-popover.context";
import { popoverVariants } from "./ui-popover.variants";

export type PopoverContentProps = PropsPolymorphic & {
	placement?: NonNullable<PopoverVariants["placement"]>;
	offset?: number;
	teleportTo?: TeleportProps["to"];
	teleportDisabled?: TeleportProps["disabled"];
	teleportDefer?: TeleportProps["defer"];
};

defineOptions({
	inheritAttrs: false,
});

const {
	placement = "top",
	offset = 0,
	as = motion.div,
	teleportTo = "body",
	teleportDisabled,
	teleportDefer,
} = defineProps<PopoverContentProps>();

const { id, trigger, popover, open } = usePopoverState();

const { floatingStyles, placement: floatingPlacement } = useFloating(
	trigger,
	popover,
	{
		placement: () => placement,
		middleware: [floatingOffset(offset), flip(), hide(), shift()],
		whileElementsMounted: autoUpdate,
		transform: false,
	},
);

const { id: idAttribute } = useAttrs();

watchEffect(() => {
	if (!idAttribute)
		return;
	id.value = `${idAttribute}`;
});

function close() {
	open.value = false;
}
</script>

<template>
	<Teleport
		:to="teleportTo"
		:disabled="teleportDisabled"
		:defer="teleportDefer"
	>
		<AnimatePresence mode="wait">
			<Slot
				:is="as"
				v-if="open"
				:id
				ref="popover"
				v-tw-merge
				:style="floatingStyles"
				:class="popoverVariants({ placement: floatingPlacement })"
				v-bind="$attrs"
			>
				<slot :close />
			</Slot>
		</AnimatePresence>
	</Teleport>
</template>
