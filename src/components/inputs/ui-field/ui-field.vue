<script setup lang="ts">
import type { FieldInputVariants } from "./ui-field.variants";
import type { IconProps } from "@/components/utility";
import type { PropsPolymorphic } from "@/types";
import { AnimatePresence } from "motion-v";
import { computed, useId, useTemplateRef } from "vue";
import { Icon, MotionComponent } from "@/components/utility";
import { useInteractions } from "@/composables";
import { transitionConfig } from "@/config";
import { fieldVariants } from "./ui-field.variants";

export type FieldProps = PropsPolymorphic & {
	leading?: IconProps["icon"];
	trailing?: IconProps["icon"];
	size?: FieldInputVariants["size"];
	alwaysShowLabel?: boolean;
	invalid?: boolean;
};

defineOptions({
	inheritAttrs: false,
});

const {
	leading,
	trailing,
	size = "lg",
	alwaysShowLabel = false,
	invalid = false,
	as = "div",
} = defineProps<FieldProps>();

const elementRef = useTemplateRef<HTMLElement | null>("field");

const labelId = useId();
const inputId = useId();
const descriptionId = useId();
const errorId = useId();

function focusInput() {
	const input = elementRef.value?.querySelector(
		`#${inputId}`,
	) as HTMLElement | null;
	input?.focus();
}

const iconSize = computed(() => {
	if (size === "sm")
		return "var(--spacing-4h)";
	if (size === "md")
		return "var(--spacing-5)";
	return "var(--spacing-6)";
});

const iconMargin = computed(() => {
	if (size === "sm")
		return "var(--spacing-2xs)";
	if (size === "md")
		return "var(--spacing-xs)";
	return "var(--spacing-sm)";
});

const { isDisabled } = useInteractions(elementRef, {
	focusVisible: false,
	press: false,
});
</script>

<template>
	<slot name="before" :input-id :label-id />
	<component
		:is="as"
		ref="field"
		v-tw-merge
		:class="fieldVariants()"
		:data-invalid="Boolean($slots.error) || invalid ? true : undefined"
		v-bind="$attrs"
		@click="focusInput()"
	>
		<div v-tw-merge :class="fieldVariants.input({ size })">
			<AnimatePresence mode="wait" :initial="false">
				<MotionComponent
					v-if="leading || $slots.leading"
					:key="JSON.stringify(leading)"
					as-child
					:initial="{
						width: 0,
						height: 0,
						opacity: 0,
						marginRight: 0,
						transition: transitionConfig.preset.short.enter.asMotion(),
					}"
					:animate="{
						width: iconSize,
						height: iconSize,
						opacity: 1,
						marginRight: iconMargin,
						transition: transitionConfig.preset.short.beginEnd.asMotion(),
					}"
					:exit="{
						width: 0,
						height: 0,
						opacity: 0,
						marginRight: 0,
						transition: transitionConfig.preset.short.exit.asMotion(),
					}"
					class="field--leading-icon" :class="[
						fieldVariants.icon({ size }),
						{
							sm: 'mr-2xs',
							md: 'mr-xs',
							lg: 'mr-2xs',
						}[size ?? 'lg'],
					]"
				>
					<Icon v-if="leading" :icon="leading" />
					<slot v-else name="leading" />
				</MotionComponent>
			</AnimatePresence>
			<div :class="fieldVariants.inputContent()">
				<slot
					v-if="size !== 'sm' || alwaysShowLabel"
					:id="labelId"
					name="label"
					:for="inputId"
					:class="fieldVariants.label()"
				/>
				<slot
					:id="inputId"
					:class="fieldVariants.inputField()"
					:disabled="isDisabled"
					tabindex="0"
					:aria-labelledby="$slots.label ? labelId : undefined"
					:aria-describedby="$slots.description ? descriptionId : undefined"
					:aria-invalid="$slots.error ? 'true' : undefined"
					:aria-errormessage="$slots.error ? errorId : undefined"
				/>
			</div>
			<AnimatePresence mode="wait" :initial="false">
				<MotionComponent
					v-if="trailing || $slots.trailing"
					:key="JSON.stringify(trailing)"
					as-child
					:initial="{
						width: 0,
						height: 0,
						opacity: 0,
						marginLeft: 0,
						transition: transitionConfig.preset.short.enter.asMotion(),
					}"
					:animate="{
						width: iconSize,
						height: iconSize,
						opacity: 1,
						marginLeft: iconMargin,
						transition: transitionConfig.preset.short.beginEnd.asMotion(),
					}"
					:exit="{
						width: 0,
						height: 0,
						opacity: 0,
						marginLeft: 0,
						transition: transitionConfig.preset.short.exit.asMotion(),
					}"
					class="field--trailing-icon" :class="[
						fieldVariants.icon({ size }),
						{
							sm: 'ml-2xs',
							md: 'ml-xs',
							lg: 'ml-2xs',
						}[size ?? 'lg'],
					]"
				>
					<Icon v-if="trailing" :icon="trailing" />
					<slot v-else name="trailing" />
				</MotionComponent>
			</AnimatePresence>
		</div>
		<slot
			:id="descriptionId"
			name="description"
			:class="fieldVariants.description({ size })"
		/>
		<slot
			:id="errorId"
			name="error"
			role="alert"
			:class="fieldVariants.error({ size })"
		/>
	</component>
	<slot name="after" :input-id :label-id />
</template>
