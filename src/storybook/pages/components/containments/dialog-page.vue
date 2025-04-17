<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogActions,
  DialogDivider,
  DialogIcon,
  DialogSubhead,
  DialogText,
  Modal,
  ModalContent,
  ModalTrigger,
  ModalUnderlay,
} from '@/components';
import { StorybookCode, StorybookPlayground } from '@/storybook/components';
import { IconArrowBackUp } from '@tabler/icons-vue';

const code = `
<Modal focus-trap>
  <ModalTrigger>
    <Button> Click me </Button>
  </ModalTrigger>
  <ModalUnderlay>
    <ModalContent>
      <template #default="{ close }">
        <Dialog>
          <template #icon>
            <DialogIcon>
              <IconArrowBackUp />
            </DialogIcon>
          </template>
          <template #subhead>
            <DialogSubhead>Reset settings?</DialogSubhead>
          </template>
          <template #text>
            <DialogText>
              This will reset your app preferences back to their default
              settings. The following accounts will also be signed out:
            </DialogText>
          </template>
          <template #default>
            <DialogDivider spacing="both" />
            <section>
              Some additional content describes the current dialog
            </section>
            <DialogDivider spacing="top" />
          </template>
          <template #actions>
            <DialogActions>
              <Button variant="text" @click="close">Cancel</Button>
              <Button variant="text" @click="close">Accept</Button>
            </DialogActions>
          </template>
        </Dialog>
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
      <ModalUnderlay>
        <ModalContent>
          <template #default="{ close }">
            <Dialog>
              <template #icon>
                <DialogIcon>
                  <IconArrowBackUp />
                </DialogIcon>
              </template>
              <template #subhead>
                <DialogSubhead>Reset settings?</DialogSubhead>
              </template>
              <template #text>
                <DialogText>
                  This will reset your app preferences back to their default
                  settings. The following accounts will also be signed out:
                </DialogText>
              </template>
              <template #default>
                <DialogDivider spacing="both" />
                <section>
                  Some additional content describes the current dialog
                </section>
                <DialogDivider spacing="top" />
              </template>
              <template #actions>
                <DialogActions>
                  <Button variant="text" @click="close">Cancel</Button>
                  <Button variant="text" @click="close">Accept</Button>
                </DialogActions>
              </template>
            </Dialog>
          </template>
        </ModalContent>
      </ModalUnderlay>
    </Modal>
  </StorybookPlayground>
  <StorybookCode name="Modal" :code />
</template>
