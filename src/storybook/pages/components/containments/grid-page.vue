<script setup lang="ts">
import { Grid, GridCell, IconButton } from '@/components';
import { StorybookCode, StorybookPlayground } from '@/storybook/components';
import { computed, ref } from 'vue';

const data: {
  id: string;
  name: string;
  age: number;
  isAdmin: boolean;
}[] = [
  {
    id: '2b939c81-35f9-4867-954c-f30f5ec9ba4c',
    name: 'BruhaBruh',
    age: 22,
    isAdmin: true,
  },
  {
    id: '2b73abf7-5a69-4034-aa14-369d47401342',
    name: 'NAGIBATOR #228',
    age: 15,
    isAdmin: false,
  },
  {
    id: '5d24d759-8c53-468e-acc1-972155310f4f',
    name: 'Нуб',
    age: 11,
    isAdmin: false,
  },
  {
    id: '871b785a-6509-451a-aad7-ef5057cdbb0b',
    name: 'Скуф',
    age: 32,
    isAdmin: true,
  },
] as const;

const sort = ref<{
  [K in keyof (typeof data)[number]]?: 'asc' | 'desc' | null;
}>({});

const items = computed(() =>
  [...data].sort((a, b) => {
    if (sort.value.id === 'asc') {
      return a.id.localeCompare(b.id);
    } else if (sort.value.id === 'desc') {
      return b.id.localeCompare(a.id);
    }
    if (sort.value.name === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sort.value.name === 'desc') {
      return b.name.localeCompare(a.name);
    }
    if (sort.value.age === 'asc') {
      return a.age - b.age;
    } else if (sort.value.age === 'desc') {
      return a.age - b.age;
    }
    if (sort.value.isAdmin === 'asc') {
      const aValue = a.isAdmin ? 1 : 0;
      const bValue = b.isAdmin ? 1 : 0;
      return bValue - aValue;
    } else if (sort.value.isAdmin === 'desc') {
      const aValue = a.isAdmin ? 1 : 0;
      const bValue = b.isAdmin ? 1 : 0;
      return aValue - bValue;
    }
    return 0;
  }),
);

const labels: (
  | {
      actions?: false;
      key: keyof (typeof data)[number];
      label: string;
      ascSortIcon?: string;
      descSortIcon?: string;
      sortable?: boolean;
    }
  | { actions: true; label: string }
)[] = [
  {
    key: 'id',
    label: 'ID',
    ascSortIcon: 'tabler:sort-ascending-letters',
    descSortIcon: 'tabler:sort-descending-letters',
    sortable: true,
  },
  {
    key: 'name',
    label: 'Имя',
    ascSortIcon: 'tabler:sort-ascending-letters',
    descSortIcon: 'tabler:sort-descending-letters',
    sortable: true,
  },
  {
    key: 'age',
    label: 'Возраст',
    ascSortIcon: 'tabler:sort-ascending-numbers',
    descSortIcon: 'tabler:sort-descending-numbers',
    sortable: true,
  },
  {
    key: 'isAdmin',
    label: 'Администратор',
    sortable: true,
  },
  {
    actions: true,
    label: 'Действия',
  },
];

const code = computed(
  () => `
<Grid
  :items="${JSON.stringify(items.value, null, 2)
    .split('\n')
    .map((v, i) => {
      if (i === 0) return v;
      return '  ' + v;
    })
    .join('\n')}"
  :labels="${JSON.stringify(labels, null, 2)
    .split('\n')
    .map((v, i) => {
      if (i === 0) return v;
      return '  ' + v;
    })
    .join('\n')}"
  :sort="${JSON.stringify(sort.value, null, 2)
    .split('\n')
    .map((v, i) => {
      if (i === 0) return v;
      return '  ' + v;
    })
    .join('\n')}"
  @sort-change="sort = $event"
>
  <template #default="{ item }">
    <GridCell tooltip>
      {{ item.id }}
    </GridCell>
    <GridCell tooltip>
      {{ item.name }}
    </GridCell>
    <GridCell tooltip>
      {{ item.age }}
    </GridCell>
    <GridCell tooltip>
      <template v-if="item.isAdmin"> Да </template>
      <template v-else> Нет </template>
    </GridCell>
    <GridCell unwrap class="justify-end gap-2">
      <IconButton
        size="xs"
        variant="tonal"
        color="caution"
        icon="tabler:pencil"
      />
      <IconButton
        size="xs"
        variant="tonal"
        color="critical"
        icon="tabler:trash"
      />
    </GridCell>
  </template>
</Grid>`,
);
</script>

<template>
  <StorybookPlayground>
    <Grid :labels :items :sort @sort-change="sort = $event">
      <template #default="{ item }">
        <GridCell tooltip>
          {{ item.id }}
        </GridCell>
        <GridCell tooltip>
          {{ item.name }}
        </GridCell>
        <GridCell tooltip>
          {{ item.age }}
        </GridCell>
        <GridCell tooltip>
          <template v-if="item.isAdmin"> Да </template>
          <template v-else> Нет </template>
        </GridCell>
        <GridCell unwrap class="justify-end gap-2">
          <IconButton
            size="xs"
            variant="tonal"
            color="caution"
            icon="tabler:pencil"
          />
          <IconButton
            size="xs"
            variant="tonal"
            color="critical"
            icon="tabler:trash"
          />
        </GridCell>
      </template>
    </Grid>
  </StorybookPlayground>
  <StorybookCode :code name="Grid" />
</template>
