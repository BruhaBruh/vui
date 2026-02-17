<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { useCarouselState } from "./ui-carousel.context";
import { carouselVariants } from "./ui-carousel.variants";

export type CarouselSlideProps = PropsPolymorphic & {
	index: number;
};

const { index, as = "div" } = defineProps<CarouselSlideProps>();

const { id } = useCarouselState();
</script>

<template>
	<component
		:is="as"
		:id="`${id}-slide-${index}`"
		v-tw-merge
		:class="carouselVariants.slide()"
		role="group"
		aria-roledescription="slide"
	>
		<slot />
	</component>
</template>
