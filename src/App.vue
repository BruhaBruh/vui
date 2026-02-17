<script setup lang="ts">
import { MotionConfig } from "motion-v";
import { RouterView } from "vue-router";
import { materialDuration, materialEasing } from "./config";
import { StorybookSidebar } from "./storybook";
</script>

<template>
	<MotionConfig
		:transition="{
			duration: materialDuration.asMotion('medium-1'),
			ease: materialEasing.standard,
		}"
	>
		<StorybookSidebar />
		<main class="fixed ml-72 inset-0 overflow-auto">
			<section class="mx-auto w-full max-w-[100ch] my-lg">
				<RouterView />
			</section>
		</main>
	</MotionConfig>
</template>
