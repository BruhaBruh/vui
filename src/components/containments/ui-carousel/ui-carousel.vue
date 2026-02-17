<script setup lang="ts">
import type {
	EmblaCarouselApi,
	EmblaOptions,
	EmblaPlugin,
} from "@/composables";
import type { PropsPolymorphic } from "@/types";
import { provideCarouselState } from "./ui-carousel.context";
import { carouselVariants } from "./ui-carousel.variants";

export type CarouselProps = PropsPolymorphic & {
	options?: EmblaOptions;
	plugins?: EmblaPlugin[];
};

const { as = "div", options = {}, plugins = [] } = defineProps<CarouselProps>();

const api = defineModel<EmblaCarouselApi | undefined>("api", {
	default: undefined,
});

provideCarouselState({
	api,
	options: () => options,
	plugins: () => plugins,
});
</script>

<template>
	<component
		:is="as"
		v-tw-merge
		:class="carouselVariants()"
		aria-roledescription="carousel"
	>
		<slot name="before" />
		<div v-tw-merge :class="carouselVariants.container()">
			<slot />
		</div>
		<slot name="after" />
	</component>
</template>
