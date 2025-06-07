<script setup lang="ts">
import {
  ExtendedFab,
  Fab,
  IconButton,
  NavigationRail,
  NavigationRailItem,
  NavigationRailSection,
} from '@/components';
import { StorybookCode, StorybookPlayground } from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const selected = ref<'first' | 'second' | 'third' | 'fourth' | 'fifth'>(
  'first',
);

const code = ref('');

function onChange({ expanded, modal }: UnknownRecord) {
  code.value = `
<NavigationRail${expanded || modal ? '' : '>'}
  ${expanded ? 'expanded' : ''}
  ${modal ? 'modal' : ''}
${expanded || modal ? '>' : ''}
  <template #menu>
    <IconButton
      size="md"
      icon="tabler:menu-2"
      variant="standard"
    />
  </template>
  <template #fab>
    ${
      expanded
        ? `<ExtendedFab
      icon="tabler:pencil"
      variant="tonal"
      class="elevation-0!"
    >
      Label
    </ExtendedFab>`
        : `<Fab
      icon="tabler:pencil"
      variant="tonal"
      class="elevation-0!"
    />`
    }
  </template>
  <template #default="props">
    <NavigationRailSection v-bind="props">
      ${expanded ? '<template #header>Section Header</template>' : ''}
      <NavigationRailItem
        v-bind="props"
        icon="tabler:square-rounded"
        ${selected.value === 'first' ? 'active' : ''}
      >
        Label
      </NavigationRailItem>
      <NavigationRailItem
        v-bind="props"
        icon="tabler:square-rounded"
        :badge-value="0"
        ${selected.value === 'second' ? 'active' : ''}
      >
        Label
      </NavigationRailItem>
      <NavigationRailItem
        v-bind="props"
        icon="tabler:square-rounded"
        :badge-value="3"
        ${selected.value === 'third' ? 'active' : ''}
      >
        Label
      </NavigationRailItem>
    </NavigationRailSection>
    <NavigationRailSection v-bind="props">
      ${expanded ? '<template #header>Section Header</template>' : ''}
      <NavigationRailItem
        v-bind="props"
        icon="tabler:square-rounded"
        ${selected.value === 'fourth' ? 'active' : ''}
      >
        Label
      </NavigationRailItem>
      <NavigationRailItem
        v-bind="props"
        icon="tabler:square-rounded"
        ${selected.value === 'fifth' ? 'active' : ''}
      >
        Label
      </NavigationRailItem>
    </NavigationRailSection>
  </template>
</NavigationRail>
`;
}
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      expanded: {
        type: 'switch',
        label: 'Expanded',
        description: 'Expanded state of NavigationRail',
        defaultValue: false,
      },
      modal: {
        type: 'switch',
        label: 'Modal',
        description: 'Modal state of NavigationRail',
        defaultValue: false,
      },
    }"
  >
    <template #default="{ values }">
      <NavigationRail v-bind="values" class="elevation-2 min-h-96">
        <template #menu>
          <IconButton
            size="md"
            icon="tabler:menu-2"
            variant="standard"
            @click="values.expanded = !values.expanded"
          />
        </template>
        <template #fab>
          <ExtendedFab
            v-if="values.expanded"
            icon="tabler:pencil"
            variant="tonal"
            class="elevation-0!"
          >
            Label
          </ExtendedFab>
          <Fab
            v-else
            icon="tabler:pencil"
            variant="tonal"
            class="elevation-0!"
          />
        </template>
        <template #default="props">
          <NavigationRailSection v-bind="props">
            <template #header>Section Header</template>
            <NavigationRailItem
              v-bind="props"
              icon="tabler:square-rounded"
              :active="selected === 'first'"
              @click="selected = 'first'"
            >
              Label
            </NavigationRailItem>
            <NavigationRailItem
              v-bind="props"
              icon="tabler:square-rounded"
              :badge-value="0"
              :active="selected === 'second'"
              @click="selected = 'second'"
            >
              Label
            </NavigationRailItem>
            <NavigationRailItem
              v-bind="props"
              icon="tabler:square-rounded"
              :badge-value="3"
              :active="selected === 'third'"
              @click="selected = 'third'"
            >
              Label
            </NavigationRailItem>
          </NavigationRailSection>
          <NavigationRailSection v-bind="props">
            <template #header>Section Header</template>
            <NavigationRailItem
              v-bind="props"
              icon="tabler:square-rounded"
              :active="selected === 'fourth'"
              @click="selected = 'fourth'"
            >
              Label
            </NavigationRailItem>
            <NavigationRailItem
              v-bind="props"
              icon="tabler:square-rounded"
              :active="selected === 'fifth'"
              @click="selected = 'fifth'"
            >
              Label
            </NavigationRailItem>
          </NavigationRailSection>
        </template>
      </NavigationRail>
    </template>
  </StorybookPlayground>
  <StorybookCode :code name="NavigationRail" />
</template>
