<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { DividerProps } from "@/components";
import { ref } from "vue";
import { Divider } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";

const orientations = [
	"horizontal",
	"vertical",
] satisfies DividerProps["orientation"][];

const code = ref("");

function onChange({ orientation, inset }: UnknownRecord) {
	code.value = `
<section
  class="inline-flex ${orientation === "vertical" ? "h-12" : "flex-col w-24"} items-center justify-center gap-md"
>
  <span>One</span>
  <Divider orientation="${orientation}" :inset="${inset}" />
  <span>Two</span>
  <Divider orientation="${orientation}" :inset="${inset}" />
  <span>Three</span>
  <Divider orientation="${orientation}" :inset="${inset}" />
  <span>Four</span>
</section>
`;
}
</script>

<template>
	<StorybookPlayground
		:arguments="{
			orientation: {
				type: 'select',
				label: 'Orientation',
				description: 'Orientation of Divider',
				defaultValue: 'horizontal',
				options: orientations,
			},
			inset: {
				type: 'switch',
				label: 'Inset',
				description: 'Inset state of Divider',
				defaultValue: false,
			},
		}"
		@change="onChange"
	>
		<template #default="{ values: { orientation, ...values } }">
			<section
				class="inline-flex items-center justify-center gap-md"
				:class="{
					'h-12': orientation === 'vertical',
					'flex-col w-24': orientation === 'horizontal',
				}"
			>
				<span>One</span>
				<Divider
					v-bind="values"
					:orientation="orientation as DividerProps['orientation']"
				/>
				<span>Two</span>
				<Divider
					v-bind="values"
					:orientation="orientation as DividerProps['orientation']"
				/>
				<span>Three</span>
				<Divider
					v-bind="values"
					:orientation="orientation as DividerProps['orientation']"
				/>
				<span>Four</span>
			</section>
		</template>
	</StorybookPlayground>
	<StorybookCode name="Divider" :code />
	<StorybookStory
		v-for="orientation in orientations"
		:key="orientation"
		:name="`${orientation.charAt(0).toUpperCase() + orientation.slice(1)} Orientation`"
	>
		<section
			class="inline-flex items-center justify-center gap-md"
			:class="{
				'h-12': orientation === 'vertical',
				'flex-col w-24': orientation === 'horizontal',
			}"
		>
			<span>One</span>
			<Divider :orientation="orientation" inset />
			<span>Two</span>
			<Divider :orientation="orientation" />
			<span>Three</span>
			<Divider :orientation="orientation" inset />
			<span>Four</span>
		</section>
	</StorybookStory>
</template>
