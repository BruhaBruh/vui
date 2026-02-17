<script setup lang="ts">
import type { TeleportProps } from "vue";
import type { PropsPolymorphic } from "@/types";
import { AnimatePresence } from "motion-v";
import { useModalState } from "./ui-modal.context";
import { modalVariants } from "./ui-modal.variants";

export type ModalUnderlayProps = PropsPolymorphic & {
	teleportTo?: TeleportProps["to"];
	teleportDisabled?: TeleportProps["disabled"];
	teleportDefer?: TeleportProps["defer"];
};

defineOptions({
	inheritAttrs: false,
});

const {
	as = "div",
	teleportTo = "body",
	teleportDisabled,
	teleportDefer,
} = defineProps<ModalUnderlayProps>();

const { open, modal } = useModalState();
</script>

<template>
	<Teleport :to="teleportTo" :disabled="teleportDisabled" :defer="teleportDefer">
		<AnimatePresence mode="wait">
			<component
				:is="as" v-if="open" ref="modal" v-tw-merge :class="modalVariants.underlay()" v-bind="$attrs"
				@click="open = false"
			>
				<slot />
			</component>
		</AnimatePresence>
	</Teleport>
</template>
