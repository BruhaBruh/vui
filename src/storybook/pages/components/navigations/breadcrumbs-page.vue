<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import type { BreadcrumbsProps } from "@/components";
import { ref } from "vue";
import { Breadcrumbs, BreadcrumbsItem } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";
import { select } from "@/storybook/shared/controls";

const items = ["Home", "Components", "Navigations", "Breadcrumbs"];
const activeItem = items[items.length - 1];

const sizes = ["lg", "md", "sm"] satisfies BreadcrumbsProps["size"][];

const controls = {
	size: select(sizes, "md", { label: "Size" }),
};

const code = ref("");

function onChange({ size }: UnknownRecord) {
	code.value = `
<Breadcrumbs
  aria-label="Breadcrumbs"
  size="${size}"
  active="breadcrumbs"
>
  <BreadcrumbsItem
    as="a"
    href="#"
    value="home"
  >
    Home
  </BreadcrumbsItem>
  <BreadcrumbsItem
    as="a"
    href="#"
    value="components"
  >
    Components
  </BreadcrumbsItem>
  <BreadcrumbsItem
    as="a"
    href="#"
    value="navigations"
  >
    Navigations
  </BreadcrumbsItem>
  <BreadcrumbsItem
    as="a"
    href="#"
    value="breadcrumbs"
  >
    Breadcrumbs
  </BreadcrumbsItem>
</Breadcrumbs>
`;
}
</script>

<template>
	<StorybookPlayground :controls @change="onChange">
		<template #default="{ values }">
			<Breadcrumbs
				v-bind="values"
				aria-label="Breadcrumbs"
				:active="activeItem"
			>
				<BreadcrumbsItem
					v-for="item in items"
					:key="item"
					as="a"
					href="#"
					:value="item"
				>
					{{ item }}
				</BreadcrumbsItem>
			</Breadcrumbs>
		</template>
	</StorybookPlayground>
	<StorybookCode name="Breadcrumbs" :code />
	<StorybookStory name="Sizes">
		<section class="grid gap-md">
			<Breadcrumbs
				v-for="size in sizes"
				:key="size"
				:size="size"
				:active="activeItem"
				aria-label="Breadcrumbs"
			>
				<BreadcrumbsItem
					v-for="item in items"
					:key="item"
					as="a"
					href="#"
					:value="item"
				>
					{{ item }}
				</BreadcrumbsItem>
			</Breadcrumbs>
		</section>
	</StorybookStory>
</template>
