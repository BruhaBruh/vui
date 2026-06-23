<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { Component } from "vue";
import type { Control, Controls } from "@/storybook/shared/controls";
import { computed, reactive, watchEffect } from "vue";
import { NumberField, Switch, TextAreaField, TextField } from "@/components";
import StorybookCode from "./storybook-code.vue";

const {
	component,
	controls = {},
	slotText = "",
	events = {},
	is,
} = defineProps<{
	/** Имя тега для генерации кода использования (напр. `"Button"`). */
	component?: string;
	/** Описание контролов playground. */
	controls?: Controls;
	/** Статические children в сгенерированном коде и авто-preview. */
	slotText?: string;
	/** События для кода: `{ select: "console.log('on select')" }`. */
	events?: Record<string, string>;
	/** Компонент для авто-preview, если слот `#default` не передан. */
	is?: Component;
}>();

const emit = defineEmits<{
	(e: "change", value: UnknownRecord): void;
}>();

function defaultFor(control: Control): unknown {
	if (control.default !== undefined)
		return control.default;
	switch (control.type) {
		case "number":
			return 0;
		case "text":
			return "";
		case "switch":
			return false;
		case "select":
		case "radio":
			return control.options[0];
		case "checkbox":
		case "array":
			return [];
		case "object":
			return {};
		default:
			return undefined;
	}
}

const values = reactive<UnknownRecord>(
	Object.fromEntries(
		Object.entries(controls).map(([name, control]) => [
			name,
			defaultFor(control),
		]),
	),
);

watchEffect(() => emit("change", values));

function set(obj: UnknownRecord) {
	for (const [key, value] of Object.entries(obj)) {
		if (key in values)
			values[key] = value;
	}
}

/** Значения, готовые к `v-bind`: без `omit`-значений и без `asSlot`-полей. */
const cleanProps = computed(() => {
	const result: UnknownRecord = {};
	for (const [name, control] of Object.entries(controls)) {
		if (control.asSlot)
			continue;
		const value = values[name];
		if ("omit" in control && value === control.omit)
			continue;
		// Биндим по camelCase-имени контрола (= реальное имя пропа компонента).
		// `control.prop` — это кебаб-алиас только для генерации кода.
		result[name] = value;
	}
	return result;
});

/** Children для авто-preview: статический текст или значение `asSlot`-контрола. */
const slotChildren = computed(() => {
	for (const [name, control] of Object.entries(controls)) {
		if (control.asSlot)
			return String(values[name] ?? "");
	}
	return slotText;
});

function formatAttr(prop: string, value: unknown): string {
	if (typeof value === "string")
		return `${prop}="${value}"`;
	if (typeof value === "boolean" || typeof value === "number")
		return `:${prop}="${value}"`;
	return `:${prop}="${JSON.stringify(value)}"`;
}

const generatedCode = computed(() => {
	if (!component)
		return "";

	const attrs: string[] = [];
	for (const [name, control] of Object.entries(controls)) {
		if (control.asSlot)
			continue;
		const value = values[name];
		if ("omit" in control && value === control.omit)
			continue;
		attrs.push(formatAttr(control.prop ?? name, value));
	}
	for (const [name, handler] of Object.entries(events))
		attrs.push(`@${name}="${handler}"`);

	const children = slotChildren.value;
	const hasAttrs = attrs.length > 0;

	if (!hasAttrs)
		return children ? `<${component}>${children}</${component}>` : `<${component} />`;

	const indented = attrs.map(a => `  ${a}`).join("\n");
	if (!children)
		return `<${component}\n${indented}\n/>`;
	return `<${component}\n${indented}\n>\n  ${children}\n</${component}>`;
});

const hasControls = computed(() => Object.keys(controls).length > 0);
</script>

<template>
	<div class="flex flex-col gap-sm mb-md last:mb-0">
		<h2 class="typography-title-large">
			Playground
		</h2>
		<div
			class="relative flex min-h-64 items-center justify-center gap-md rounded-lg border p-lg border-outline-variant"
		>
			<slot :props="cleanProps" :values="values" :set="set">
				<component :is="is" v-if="is && slotChildren" v-bind="cleanProps">
					{{ slotChildren }}
				</component>
				<component :is="is" v-else-if="is" v-bind="cleanProps" />
			</slot>
		</div>
		<div v-if="hasControls" class="grid gap-md grid-cols-4">
			<template v-for="(control, name) in controls" :key="name">
				<div class="flex flex-col items-start gap-2xs">
					<p :id="`pl-label-${name}`" class="typography-label-large">
						{{ control.label ?? name }}
					</p>
					<NumberField
						v-if="control.type === 'number'"
						v-model:value="values[name] as number"
						size="sm"
						:aria-labelledby="`pl-label-${name}`"
					/>
					<TextField
						v-if="control.type === 'text'"
						v-model:value="values[name] as string"
						size="sm"
						:aria-labelledby="`pl-label-${name}`"
					/>
					<select
						v-if="control.type === 'select'"
						v-model="values[name]"
						class="h-10 bg-surface-container px-sm rounded-sm w-max max-w-full"
						:aria-labelledby="`pl-label-${name}`"
					>
						<option v-for="value in control.options" :key="value">
							{{ value }}
						</option>
					</select>
					<Switch
						v-if="control.type === 'switch'"
						:checked="values[name] as boolean"
						:aria-labelledby="`pl-label-${name}`"
						@change="(v) => (values[name] = v)"
					/>
					<template v-if="control.type === 'radio'">
						<div
							v-for="value in control.options"
							:key="value"
							class="flex items-center gap-xs"
						>
							<input
								v-model="values[name]"
								class="size-4.5"
								:aria-labelledby="`pl-label-${name}`"
								:value="value"
								type="radio"
							>
							{{ value }}
						</div>
					</template>
					<template v-if="control.type === 'checkbox'">
						<div
							v-for="value in control.options"
							:key="value"
							class="flex items-center gap-xs"
						>
							<input
								v-model="values[name]"
								class="size-4.5"
								:aria-labelledby="`pl-label-${name}`"
								:value="value"
								type="checkbox"
							>
							{{ value }}
						</div>
					</template>
					<TextAreaField
						v-if="control.type === 'array' || control.type === 'object'"
						:value="JSON.stringify(values[name])"
						:aria-labelledby="`pl-label-${name}`"
						@update:value="
							(v) => {
								try {
									values[name] = JSON.parse(v);
								}
								catch {}
							}
						"
					/>
				</div>
			</template>
		</div>
		<StorybookCode v-if="generatedCode" :name="component" :code="generatedCode" />
	</div>
</template>
