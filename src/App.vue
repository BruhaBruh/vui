<script setup lang="ts">
import { RouterView } from 'vue-router';
import { StorybookSidebar } from './storybook';
import { MotionConfig } from 'motion-v';
</script>

<template>
  <MotionConfig :transition="{ duration: 0.25, ease: [0.2, 0, 0, 1] }">
    <StorybookSidebar />
    <main class="fixed ml-72 inset-0 overflow-auto">
      <section class="mx-auto w-full max-w-[100ch] my-lg">
        <RouterView />
      </section>
    </main>
  </MotionConfig>
</template>
