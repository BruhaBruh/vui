<script setup lang="ts">
import {
  Button,
  Modal,
  ModalContent,
  ModalTrigger,
  ModalUnderlay,
} from '@/components';
import { StorybookCode, StorybookPlayground } from '@/storybook/components';

const code = `
<Modal focus-trap>
  <ModalTrigger>
    <Button> Click me </Button>
  </ModalTrigger>
  <ModalUnderlay>
    <ModalContent>
      <template #default="{ close }">
        <div>
          <p>Modal</p>
          <input placeholder="Name" />
          <Button @click="close">Close</Button>
        </div>
      </template>
    </ModalContent>
  </ModalUnderlay>
</Modal>
`;
</script>

<template>
  <StorybookPlayground>
    <Modal focus-trap>
      <ModalTrigger>
        <Button> Click me </Button>
      </ModalTrigger>
      <ModalUnderlay class="bg-scrim/15">
        <ModalContent
          class="bg-surface-container text-on-surface p-md rounded-md flex flex-col gap-sm"
        >
          <template #default="{ close }">
            <div>
              <p>Modal</p>
              <input placeholder="Name" />
              <Button class="w-max" @click="close">Close</Button>
            </div>
          </template>
        </ModalContent>
      </ModalUnderlay>
    </Modal>
  </StorybookPlayground>
  <StorybookCode name="Modal" :code />
</template>
