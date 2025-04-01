<script setup lang="ts">
import { RouterView } from 'vue-router';
import { StorybookSidebar } from './storybook';
import { MotionConfig } from 'motion-v';
import { materialDuration, materialEasing } from './config';
</script>

<template>
  <MotionConfig
    :transition="{
      duration: materialDuration.asMotion('medium-1'),
      ease: materialEasing.standard,
    }"
  >
    <StorybookSidebar />
    <main class="fixed ml-72 inset-0 overflow-auto">
      <section class="mx-auto w-full max-w-[100ch] my-lg">
        <RouterView />
      </section>
    </main>
  </MotionConfig>
</template>
