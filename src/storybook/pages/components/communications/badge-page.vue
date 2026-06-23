<script setup lang="ts">
import { Badge, ExtendedFab, Fab, Icon, IconButton } from "@/components";
import { StorybookPlayground, StorybookStory } from "@/storybook/components";
import { num, select } from "@/storybook/shared/controls";
import { colors } from "@/storybook/shared/options";

const badgeValues = [0, 1, 500, 1000];

const controls = {
	color: select(colors, "primary", { label: "Color" }),
	value: num(0, { label: "Value" }),
	maxValue: num(999, { label: "Max Value", prop: "max-value" }),
};
</script>

<template>
	<StorybookPlayground :is="Badge" component="Badge" :controls />
	<StorybookStory name="Colors">
		<Badge v-for="color in colors" :key="color" :color="color" />
	</StorybookStory>
	<StorybookStory name="Sizes">
		<Badge v-for="value in badgeValues" :key="value" :value="value" />
	</StorybookStory>
	<StorybookStory name="On Icon">
		<section class="flex items-center gap-xl">
			<Badge placement="icon">
				<Icon class="inline-flex size-6" icon="tabler:mail" />
			</Badge>
			<Badge placement="icon" :value="1">
				<Icon class="inline-flex size-6" icon="tabler:message-circle" />
			</Badge>
			<Badge placement="icon" :value="500">
				<Icon class="inline-flex size-6" icon="tabler:users" />
			</Badge>
			<Badge placement="icon" :value="1000">
				<Icon class="inline-flex size-6" icon="tabler:video" />
			</Badge>
		</section>
	</StorybookStory>
	<StorybookStory name="On IconButton">
		<section class="flex items-center gap-xl">
			<IconButton icon="tabler:mail" :badge-value="0" variant="tonal" />
			<IconButton icon="tabler:message-circle" :badge-value="1" variant="tonal" />
			<IconButton icon="tabler:users" :badge-value="500" variant="tonal" />
			<IconButton icon="tabler:video" :badge-value="1000" variant="tonal" />
		</section>
	</StorybookStory>
	<StorybookStory name="On Fab">
		<Fab icon="tabler:mail" :badge-value="0" variant="tonal" />
		<Fab icon="tabler:message-circle" :badge-value="1" variant="tonal" />
		<Fab icon="tabler:users" :badge-value="500" variant="tonal" />
		<Fab icon="tabler:video" :badge-value="1000" variant="tonal" />
	</StorybookStory>
	<StorybookStory name="On ExtendedFab">
		<ExtendedFab icon="tabler:mail" :badge-value="0" variant="tonal">
			Extended Fab
		</ExtendedFab>
		<ExtendedFab icon="tabler:message-circle" :badge-value="1" variant="tonal">
			Extended Fab
		</ExtendedFab>
		<ExtendedFab icon="tabler:users" :badge-value="500" variant="tonal">
			Extended Fab
		</ExtendedFab>
		<ExtendedFab icon="tabler:video" :badge-value="1000" variant="tonal">
			Extended Fab
		</ExtendedFab>
	</StorybookStory>
</template>
