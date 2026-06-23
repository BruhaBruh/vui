<script setup lang="ts">
import { Pagination } from "@/components";
import { StorybookPlayground } from "@/storybook/components";
import { num } from "@/storybook/shared/controls";

const controls = {
	pageAmount: num(15, { label: "Page amount", prop: "page-amount" }),
	pagesToView: num(5, { label: "Pages to view", prop: "pages-to-view" }),
};
</script>

<template>
	<StorybookPlayground :is="Pagination" component="Pagination" :controls />
</template>
