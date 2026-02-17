<script setup lang="ts">
import { useAttrs, watchEffect } from "vue";
import { Slot } from "@/components/utility";
import { useModalState } from "./ui-modal.context";
import { modalVariants } from "./ui-modal.variants";

const { id, open } = useModalState();

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
	<Slot :id v-tw-merge :class="modalVariants()" @click.stop>
		<slot :close />
	</Slot>
</template>
