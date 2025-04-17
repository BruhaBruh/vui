<script setup lang="ts">
import { provideModalState } from './ui-modal.context';

export type ModalProps = {
  focusTrap?: boolean;
};

const { focusTrap = false } = defineProps<ModalProps>();

const open = defineModel<boolean>('open', { default: false });

provideModalState({
  open,
  focusTrap: () => focusTrap,
});
</script>

<template>
  <slot />
</template>
