<script setup lang="ts">
import type { TeleportProps } from "vue";
import type { PropsPolymorphic } from "@/types";
import { AnimatePresence } from "motion-v";
import { MotionComponent } from "@/components/utility";
import { transitionConfig } from "@/config";
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
		<AnimatePresence>
			<MotionComponent
				v-if="open"
				:as
				ref="modal"
				v-tw-merge
				:class="modalVariants.underlay()"
				:initial="{ opacity: 0 }"
				:animate="{ opacity: 1, transition: transitionConfig.preset.short.enter.asMotion() }"
				:exit="{ opacity: 0, transition: transitionConfig.preset.short.exit.asMotion() }"
				v-bind="$attrs"
				@pointerup="open = false"
			>
				<slot />
			</MotionComponent>
		</AnimatePresence>
	</Teleport>
</template>
