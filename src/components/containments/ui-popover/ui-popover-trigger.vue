<script setup lang="ts">
import { useId } from "vue";
import { Slot } from "@/components/utility";
import { usePopoverState } from "./ui-popover.context";

const { trigger, open, id } = usePopoverState();

const triggerId = useId();
</script>

<template>
	<Slot
		:id="triggerId"
		ref="trigger"
		:aria-expanded="open"
		:aria-controls="open ? id : undefined"
	>
		<slot />
	</Slot>
</template>
