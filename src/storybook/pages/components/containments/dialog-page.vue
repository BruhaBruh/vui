<script setup lang="ts">
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogDivider,
  DialogIcon,
  DialogSubhead,
  DialogText,
  DialogTrigger,
} from '@/components';
import { StorybookCode, StorybookPlayground } from '@/storybook/components';

const code = `
<Dialog focus-trap>
  <DialogTrigger>
    <Button> Click me </Button>
  </DialogTrigger>
  <DialogContent>
    <template #icon>
      <DialogIcon icon="tabler:arrow-back-up" />
    </template>
    <template #subhead>
      <DialogSubhead>Reset settings?</DialogSubhead>
    </template>
    <template #text>
      <DialogText>
        This will reset your app preferences back to their default settings.
        The following accounts will also be signed out:
      </DialogText>
    </template>
    <template #default>
      <DialogDivider spacing="both" />
      <section>
        Some additional content describes the current dialog
      </section>
      <DialogDivider spacing="top" />
    </template>
    <template #actions="{ close }">
      <DialogActions>
        <Button variant="text" @click="close">Accept</Button>
        <Button variant="text" @click="close">Cancel</Button>
      </DialogActions>
    </template>
  </DialogContent>
</Dialog>
`;
</script>

<template>
  <StorybookPlayground>
    <Dialog focus-trap>
      <DialogTrigger>
        <Button> Click me </Button>
      </DialogTrigger>
      <DialogContent>
        <template #icon>
          <DialogIcon icon="tabler:arrow-back-up" />
        </template>
        <template #subhead>
          <DialogSubhead>Reset settings?</DialogSubhead>
        </template>
        <template #text>
          <DialogText>
            This will reset your app preferences back to their default settings.
            The following accounts will also be signed out:
          </DialogText>
        </template>
        <template #default>
          <DialogDivider spacing="both" />
          <section>
            Some additional content describes the current dialog
          </section>
          <DialogDivider spacing="top" />
        </template>
        <template #actions="{ close }">
          <DialogActions>
            <Button variant="text" @click="close">Accept</Button>
            <Button variant="text" @click="close">Cancel</Button>
          </DialogActions>
        </template>
      </DialogContent>
    </Dialog>
  </StorybookPlayground>
  <StorybookCode name="Dialog" :code />
</template>
