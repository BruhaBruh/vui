<script setup lang="ts">
import type { UnknownRecord } from "@bruhabruh/type-safe";
import { ref } from "vue";
import { Icon, SearchBar } from "@/components";
import {
	StorybookCode,
	StorybookPlayground,
	StorybookStory,
} from "@/storybook/components";

const code = ref("");

function onChange({
	placeholder,
	leading,
	trailing,
	trailingSecond,
}: UnknownRecord) {
	let leadingDisplay = "";
	if (leading !== "none") {
		leadingDisplay = `
  <template #leading v-if="leading !== 'none'">
    <button tabindex="0" type="button">
      <Icon icon="tabler:menu-2" />
    </button>
  </template>
`;
	}
	let trailingDisplay = "";
	if (trailing === "search") {
		trailingDisplay = `
  <template #trailing>
    <Icon icon="tabler:search" />
  </template>
`;
	}
	else if (trailing === "share") {
		trailingDisplay = `
  <template #trailing>
    <Icon icon="tabler:screen-share" />
  </template>
`;
	}

	let trailingSecondDisplay = "";
	if (trailingSecond === "search") {
		trailingSecondDisplay = `
  <template #trailing-second>
    <Icon icon="tabler:search" />
  </template>
`;
	}
	else if (trailingSecond === "avatar") {
		trailingSecondDisplay = `
  <template #trailing-avatar>
    <img src="https://placehold.co/32/6750A4/white?text=A" />
  </template>
`;
	}

	code.value = `
<SearchBar
  placeholder="${placeholder}"
  v-model:value
${
	leadingDisplay || trailingDisplay || trailingSecondDisplay
		? `>
  ${leadingDisplay}
  ${trailingDisplay}
  ${trailingSecondDisplay}
</SearchBar>`
		: "/>"
}
`;
}
</script>

<template>
	<StorybookPlayground
		:arguments="{
			placeholder: {
				type: 'text',
				label: 'Placeholder',
				description: 'Placeholder of SearchBar',
				defaultValue: 'Hinted search text',
			},
			leading: {
				type: 'select',
				label: 'Leading',
				description: 'Leading component of SearchBar',
				defaultValue: 'none',
				options: ['none', 'menu'],
			},
			trailing: {
				type: 'select',
				label: 'Trailing',
				description: 'Trailing component of SearchBar',
				defaultValue: 'none',
				options: ['none', 'share', 'search'],
			},
			trailingSecond: {
				type: 'select',
				label: 'Trailing second',
				description: 'Trailing second component of SearchBar',
				defaultValue: 'none',
				options: ['none', 'search', 'avatar'],
			},
		}"
		@change="onChange"
	>
		<template
			#default="{ values: { leading, trailing, trailingSecond, ...values } }"
		>
			<SearchBar
				v-bind="values"
				:leading-key="leading as string"
				:trailing-key="trailing as string"
				:trailing-second-key="trailingSecond as string"
				:trailing-avatar-key="trailingSecond as string"
			>
				<template v-if="leading !== 'none'" #leading>
					<button tabindex="0" type="button">
						<Icon icon="tabler:menu-2" />
					</button>
				</template>
				<template v-if="trailing !== 'none'" #trailing>
					<Icon v-if="trailing === 'search'" icon="tabler:search" />
					<Icon v-else icon="tabler:screen-share" />
				</template>
				<template v-if="trailingSecond === 'search'" #trailing-second>
					<Icon icon="tabler:search" />
				</template>
				<template v-if="trailingSecond === 'avatar'" #trailing-avatar>
					<img src="https://placehold.co/32/6750A4/white?text=A">
				</template>
			</SearchBar>
		</template>
	</StorybookPlayground>
	<StorybookCode name="SearchBar" :code />
	<StorybookStory name="Configurations">
		<div class="flex flex-col gap-md">
			<SearchBar placeholder="Hinted search text">
				<template #trailing>
					<Icon icon="tabler:search" />
				</template>
			</SearchBar>
			<SearchBar placeholder="Hinted search text">
				<template #leading>
					<button tabindex="0" type="button">
						<Icon icon="tabler:menu-2" />
					</button>
				</template>
				<template #trailing-avatar>
					<img src="https://placehold.co/32/6750A4/white?text=A">
				</template>
			</SearchBar>
			<SearchBar placeholder="Hinted search text">
				<template #leading>
					<button tabindex="0" type="button">
						<Icon icon="tabler:menu-2" />
					</button>
				</template>
				<template #trailing>
					<Icon icon="tabler:search" />
				</template>
			</SearchBar>
			<SearchBar placeholder="Hinted search text">
				<template #leading>
					<button tabindex="0" type="button">
						<Icon icon="tabler:menu-2" />
					</button>
				</template>
				<template #trailing>
					<Icon icon="tabler:screen-share" />
				</template>
				<template #trailing-second>
					<Icon icon="tabler:search" />
				</template>
			</SearchBar>
			<SearchBar placeholder="Hinted search text">
				<template #leading>
					<button tabindex="0" type="button">
						<Icon icon="tabler:menu-2" />
					</button>
				</template>
				<template #trailing>
					<Icon icon="tabler:search" />
				</template>
				<template #trailing-avatar>
					<img src="https://placehold.co/32/6750A4/white?text=A">
				</template>
			</SearchBar>
		</div>
	</StorybookStory>
</template>
