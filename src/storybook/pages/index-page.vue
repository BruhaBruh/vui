<script setup lang="ts">
import { StorybookBreadcrumbs, StorybookNavigation } from '../components';
import { navigation } from '../navigation';
</script>

<template>
  <StorybookBreadcrumbs :breadcrumbs="[{ name: 'Home', to: '/' }]" />
  <StorybookNavigation :navigation="navigation" />
</template>
