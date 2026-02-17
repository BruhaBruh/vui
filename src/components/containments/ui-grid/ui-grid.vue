<script setup lang="ts" generic="T extends UnknownRecord">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { IconProps } from "@/components/utility";
import type { PropsPolymorphic } from "@/types";
import { IconButton } from "@/components/actions";
import { gridVariants } from "./ui-grid.variants";

type BaseLabel = {
	label: string;
	actions?: false;
};

type SortableLabel<T extends UnknownRecord> = {
	key: keyof T;
	sortable?: boolean;
	ascSortIcon?: IconProps["icon"];
	descSortIcon?: IconProps["icon"];
};

type NonSortableLabel<T extends UnknownRecord> = {
	key: keyof T | (string & {});
	sortable?: undefined;
	ascSortIcon?: undefined;
	descSortIcon?: undefined;
};

type RegularLabel<T extends UnknownRecord>
	= | (BaseLabel & SortableLabel<T>)
		| (BaseLabel & NonSortableLabel<T>);

type ActionsLabel = {
	actions: true;
	label: string;
};

type Labels<T extends UnknownRecord> = (RegularLabel<T> | ActionsLabel)[];

type Sort<T extends UnknownRecord> = {
	[K in keyof T]?: "asc" | "desc" | null;
};

type GridProps<T extends UnknownRecord> = PropsPolymorphic & {
	sortIcon?: IconProps["icon"];
	defaultAscSortIcon?: IconProps["icon"];
	defaultDescSortIcon?: IconProps["icon"];
	items: T[];
	labels: Labels<T>;
	sort?: Sort<T>;
};

const {
	items,
	labels,
	sort = {} as Sort<T>,
	sortIcon = "tabler:arrows-sort",
	defaultAscSortIcon = "tabler:sort-ascending-shapes",
	defaultDescSortIcon = "tabler:sort-descending-shapes",
	as = "div",
} = defineProps<GridProps<T>>();

const emit = defineEmits<{
	"sort-change": [sort: Sort<T>];
}>();

function onChange(key: keyof T) {
	const current = sort[key] ?? null;
	if (current === "asc") {
		emit("sort-change", {
			...sort,
			[key]: "desc",
		});
	}
	else if (current === "desc") {
		emit("sort-change", {
			...sort,
			[key]: null,
		});
	}
	else {
		emit("sort-change", {
			...sort,
			[key]: "asc",
		});
	}
}

function getSortIcon(item: Labels<T>[number]) {
	if (item.actions)
		return sortIcon;
	const current = sort[item.key] ?? null;
	if (current === "asc") {
		return item.ascSortIcon ?? defaultAscSortIcon;
	}
	if (current === "desc") {
		return item.descSortIcon ?? defaultDescSortIcon;
	}
	return sortIcon;
}
</script>

<template>
	<component :is="as" v-tw-merge :class="gridVariants()">
		<div
			v-tw-merge :class="gridVariants.row()" :style="{
				gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
			}"
		>
			<div
				v-for="item of labels" :key="item.actions ? `${item.actions}` : item.key" v-tw-merge
				:class="gridVariants.cell()"
			>
				<span v-tw-merge :class="gridVariants.header()">
					{{ item.label }}
				</span>
				<IconButton
					v-if="!item.actions && item.sortable" :icon="getSortIcon(item)" size="xs" variant="standard" :class="gridVariants.sortButton({
						visible: Boolean(sort[item.key]),
					})
					" @click="onChange(item.key)"
				/>
			</div>
		</div>
		<div
			v-for="item in items" :key="JSON.stringify(item)" v-tw-merge :class="gridVariants.row()" :style="{
				gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
			}"
		>
			<slot :item />
		</div>
	</component>
</template>
