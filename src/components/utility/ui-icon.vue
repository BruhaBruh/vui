<script setup lang="ts">
import {
  Icon as IconifyIcon,
  type IconProps as IconifyIconProps,
} from '@iconify/vue';
import { Badge, type BadgeProps } from '../communications';

export type IconProps = IconifyIconProps & {
  badge?: boolean;
} & Pick<BadgeProps, 'color' | 'value' | 'maxValue'>;

const { badge, color, value, maxValue, ...props } = defineProps<IconProps>();

defineOptions({ inheritAttrs: false });
</script>

<template>
  <Badge v-if="badge" placement="icon" :color :value :max-value>
    <IconifyIcon
      v-bind="{ ...$attrs, ...props }"
      width="auto"
      height="auto"
      tabindex="-1"
      v-tw-merge
    />
  </Badge>
  <IconifyIcon
    v-else
    v-bind="{ ...$attrs, ...props }"
    width="auto"
    height="auto"
    tabindex="-1"
    v-tw-merge
  />
</template>
