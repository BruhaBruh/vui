<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { useCarouselState } from "./ui-carousel.context";
import { carouselVariants } from "./ui-carousel.variants";

export type CarouselViewProps = PropsPolymorphic;

defineOptions({
	inheritAttrs: false,
});

const { as = "div" } = defineProps<CarouselViewProps>();

const { carousel } = useCarouselState();
</script>

<template>
	<slot name="left" />
	<component
		:is="as"
		ref="carousel"
		v-bind="$attrs"
		v-tw-merge
		:class="carouselVariants.view()"
	>
		<div v-tw-merge :class="carouselVariants.viewContainer()">
			<slot />
		</div>
	</component>
	<slot name="right" />
</template>
