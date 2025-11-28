<script setup lang="ts" generic="T extends UnknownRecord">
import type { PropsPolymorphic } from '@/types';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { gridVariants } from './ui-grid.variants';
import type { IconProps } from '@/components/utility';
import { IconButton } from '@/components/actions';

type Labels<T extends UnknownRecord> = (
  | ({
      actions?: false;
      label: string;
    } & (
      | {
          key: keyof T;
          sortable?: boolean;
          ascSortIcon?: IconProps['icon'];
          descSortIcon?: IconProps['icon'];
        }
      | {
          key: keyof T | (string & {});
          sortable?: undefined;
          ascSortIcon?: undefined;
          descSortIcon?: undefined;
        }
    ))
  | {
      actions: true;
      label: string;
    }
)[];

type Sort<T extends UnknownRecord> = {
  [K in keyof T]?: 'asc' | 'desc' | null;
};

type GridProps<T extends UnknownRecord> = PropsPolymorphic & {
  sortIcon?: IconProps['icon'];
  defaultAscSortIcon?: IconProps['icon'];
  defaultDescSortIcon?: IconProps['icon'];
  items: T[];
  labels: Labels<T>;
  sort?: Sort<T>;
};

const {
  items,
  labels,
  sort = {} as Sort<T>,
  sortIcon = 'tabler:arrows-sort',
  defaultAscSortIcon = 'tabler:sort-ascending-shapes',
  defaultDescSortIcon = 'tabler:sort-descending-shapes',
  as = 'div',
} = defineProps<GridProps<T>>();

const emit = defineEmits<{
  sortChange: [sort: Sort<T>];
}>();

function onChange(key: keyof T) {
  const current = sort[key] ?? null;
  if (current === 'asc') {
    emit('sortChange', {
      ...sort,
      [key]: 'desc',
    });
  } else if (current === 'desc') {
    emit('sortChange', {
      ...sort,
      [key]: null,
    });
  } else {
    emit('sortChange', {
      ...sort,
      [key]: 'asc',
    });
  }
}

function getSortIcon(item: Labels<T>[number]) {
  if (item.actions) return sortIcon;
  const current = sort[item.key] ?? null;
  if (current === 'asc') {
    return item.ascSortIcon ?? defaultAscSortIcon;
  }
  if (current === 'desc') {
    return item.descSortIcon ?? defaultDescSortIcon;
  }
  return sortIcon;
}
</script>

<template>
  <component :is="as" :class="gridVariants()" v-tw-merge>
    <div
      :class="gridVariants.row()"
      :style="{
        gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
      }"
      v-tw-merge
    >
      <div
        v-for="item of labels"
        :key="item.actions ? `${item.actions}` : item.key"
        :class="gridVariants.cell()"
        v-tw-merge
      >
        <span :class="gridVariants.header()" v-tw-merge>
          {{ item.label }}
        </span>
        <IconButton
          v-if="!item.actions && item.sortable"
          :icon="getSortIcon(item)"
          size="xs"
          variant="standard"
          :class="
            gridVariants.sortButton({
              visible: Boolean(sort[item.key]),
            })
          "
          @click="onChange(item.key)"
        />
      </div>
    </div>
    <div
      v-for="item in items"
      :key="JSON.stringify(item)"
      :class="gridVariants.row()"
      :style="{
        gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
      }"
      v-tw-merge
    >
      <slot :item />
    </div>
  </component>
</template>
