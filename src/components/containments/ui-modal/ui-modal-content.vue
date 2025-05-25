<script setup lang="ts">
import { useAttrs, watchEffect } from 'vue';
import { useModalState } from './ui-modal.context';
import { modalVariants } from './ui-modal.variants';
import { Slot } from '@/components/utility';

const { id, open } = useModalState();

const { id: idAttribute } = useAttrs();

watchEffect(() => {
  if (!idAttribute) return;
  id.value = `${idAttribute}`;
});

function close() {
  open.value = false;
}
</script>

<template>
  <Slot :id :class="modalVariants()" @click.stop v-tw-merge>
    <slot :close />
  </Slot>
</template>
