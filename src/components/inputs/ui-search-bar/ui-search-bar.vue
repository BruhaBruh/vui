<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { MotionComponentProps } from "@/components/utility";
import { AnimatePresence } from "motion-v";
import { useTemplateRef } from "vue";
import {
	MotionComponent,

} from "@/components/utility";
import { computedVariants, useInteractions } from "@/composables";
import { transitionConfig } from "@/config";
import { searchBarVariants } from "./ui-search-bar.variants";

export type SearchBarProps = Omit<MotionComponentProps, "asChild"> & {
	leadingKey?: string;
	trailingKey?: string;
	trailingSecondKey?: string;
	trailingAvatarKey?: string;
};

defineOptions({
	inheritAttrs: false,
});

const {
	as = "div",
	leadingKey,
	trailingKey,
	trailingSecondKey,
	trailingAvatarKey,
	initial,
	animate,
	exit,
	...motionProps
} = defineProps<SearchBarProps>();

const value = defineModel<string>("value", {
	default: "",
});

const elementRef = useTemplateRef<HTMLInputElement | null>("field");
const inputElementRef = useTemplateRef<HTMLInputElement | null>("input");

useInteractions(elementRef);

function attrsWithoutClass(attrs: UnknownRecord) {
	const newAttrs = { ...attrs };
	if ("class" in newAttrs)
		delete newAttrs.class;
	return newAttrs;
}

const {
	initial: initialObject,
	animate: animateObject,
	exit: exitObject,
} = computedVariants(() => ({
	initial,
	animate,
	exit,
}));
</script>

<template>
	<MotionComponent
		ref="field"
		:as
		v-bind="motionProps"
		:initial="{
			transition: transitionConfig.preset.short.enter.asMotion(),
			...initialObject,
		}"
		:animate="{
			transition: transitionConfig.preset.short.beginEnd.asMotion(),
			...animateObject,
		}"
		:exit="{
			transition: transitionConfig.preset.short.exit.asMotion(),
			...exitObject,
		}"
		:class="[searchBarVariants(), $attrs.class]"
		@click="inputElementRef?.focus()"
	>
		<AnimatePresence mode="wait" :initial="false">
			<MotionComponent
				v-if="$slots.leading"
				:key="leadingKey"
				as-child
				:initial="{
					width: 0,
					height: 0,
					marginRight: 0,
					transition: transitionConfig.preset.short.enter.asMotion(),
				}"
				:animate="{
					width: 'var(--spacing-6)',
					height: 'var(--spacing-6)',
					marginRight: 'var(--spacing-4)',
					transition: transitionConfig.preset.short.beginEnd.asMotion(),
				}"
				:exit="{
					width: 0,
					height: 0,
					marginRight: 0,
					transition: transitionConfig.preset.short.exit.asMotion(),
				}"
				:class="searchBarVariants.icon({ position: 'leading' })"
				@click.stop
			>
				<slot name="leading" />
			</MotionComponent>
		</AnimatePresence>
		<input
			ref="input"
			v-model="value"
			type="search"
			v-bind="attrsWithoutClass($attrs)"
			:class="searchBarVariants.input()"
		>
		<AnimatePresence mode="wait" :initial="false">
			<MotionComponent
				v-if="$slots.trailing"
				:key="trailingKey"
				as-child
				:initial="{
					width: 0,
					height: 0,
					marginLeft: 0,
					transition: transitionConfig.preset.short.enter.asMotion(),
				}"
				:animate="{
					width: 'var(--spacing-6)',
					height: 'var(--spacing-6)',
					marginLeft: 'var(--spacing-4)',
					transition: transitionConfig.preset.short.beginEnd.asMotion(),
				}"
				:exit="{
					width: 0,
					height: 0,
					marginLeft: 0,
					transition: transitionConfig.preset.short.exit.asMotion(),
				}"
				:class="searchBarVariants.icon({ position: 'trailing' })"
			>
				<slot name="trailing" />
			</MotionComponent>
		</AnimatePresence>
		<AnimatePresence mode="wait" :initial="false">
			<MotionComponent
				v-if="$slots['trailing-second'] && !$slots['trailing-avatar']"
				:key="`icon-${trailingSecondKey}`"
				as-child
				:initial="{
					width: 0,
					height: 0,
					marginLeft: 0,
					transition: transitionConfig.preset.short.enter.asMotion(),
				}"
				:animate="{
					width: 'var(--spacing-6)',
					height: 'var(--spacing-6)',
					marginLeft: 'var(--spacing-4)',
					transition: transitionConfig.preset.short.beginEnd.asMotion(),
				}"
				:exit="{
					width: 0,
					height: 0,
					marginLeft: 0,
					transition: transitionConfig.preset.short.exit.asMotion(),
				}"
				:class="searchBarVariants.icon({ position: 'trailing' })"
			>
				<slot name="trailing-second" />
			</MotionComponent>
			<MotionComponent
				v-if="$slots['trailing-avatar']"
				:key="`avatar-${trailingAvatarKey}`"
				as-child
				:initial="{
					width: 0,
					height: 0,
					marginLeft: 0,
					transition: transitionConfig.preset.short.enter.asMotion(),
				}"
				:animate="{
					width: 'var(--spacing-7h)',
					height: 'var(--spacing-7h)',
					marginLeft: 'var(--spacing-4)',
					transition: transitionConfig.preset.short.beginEnd.asMotion(),
				}"
				:exit="{
					width: 0,
					height: 0,
					marginLeft: 0,
					transition: transitionConfig.preset.short.exit.asMotion(),
				}"
				:class="searchBarVariants.avatar()"
			>
				<slot name="trailing-avatar" />
			</MotionComponent>
		</AnimatePresence>
	</MotionComponent>
</template>
