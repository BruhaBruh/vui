<script setup lang="ts">
import type { ModalUnderlayProps } from "../ui-modal";
import type { PropsPolymorphic } from "@/types";
import { MotionComponent } from "@/components/utility";
import { transitionConfig } from "@/config";
import {
	ModalContent,
	ModalUnderlay,
} from "../ui-modal";
import { dialogVariants } from "./ui-dialog.variants";

export type DialogContentProps = PropsPolymorphic
	& Omit<ModalUnderlayProps, "as"> & {
		underlayAs?: PropsPolymorphic["as"];
	};

defineOptions({
	inheritAttrs: false,
});

const {
	as = "div",
	underlayAs,
	...underlayProps
} = defineProps<DialogContentProps>();
</script>

<template>
	<ModalUnderlay :as="underlayAs" v-bind="underlayProps">
		<ModalContent>
			<template #default="{ close }">
				<MotionComponent
					:as :initial="{
						opacity: 0,
						y: '25vh',
						transition: transitionConfig.preset.long.enter.asMotion(),
					}" :animate="{
						opacity: 1,
						y: 0,
						transition: transitionConfig.preset.long.beginEnd.asMotion(),
					}" :exit="{
						opacity: 0,
						y: '25vh',
						transition: transitionConfig.preset.long.exit.asMotion(),
					}" role="dialog" :class="dialogVariants()" v-bind="$attrs"
				>
					<slot name="icon" :close />
					<slot name="subhead" :close />
					<slot name="text" :close />
					<slot :close />
					<slot name="actions" :close />
				</MotionComponent>
			</template>
		</ModalContent>
	</ModalUnderlay>
</template>
