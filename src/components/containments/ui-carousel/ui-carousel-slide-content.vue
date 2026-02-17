<script setup lang="ts">
import type { PropsPolymorphic } from "@/types";
import { carouselVariants } from "./ui-carousel.variants";

export type CarouselSlideContentProps = PropsPolymorphic;

const { as = "div" } = defineProps<CarouselSlideContentProps>();
</script>

<template>
	<component :is="as" v-tw-merge :class="carouselVariants.slideContent()">
		<slot />
	</component>
</template>
