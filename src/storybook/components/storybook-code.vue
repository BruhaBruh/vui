<script setup lang="ts">
import { IconButton } from '@/components';
import { materialDuration, materialEasing } from '@/config';
import { IconCopy } from '@tabler/icons-vue';
import { computedAsync, useClipboard, useDark } from '@vueuse/core';
import { motion } from 'motion-v';
import { type BundledLanguage, type BundledTheme, codeToHtml } from 'shiki';
import { computed, ref } from 'vue';

const {
  name = '',
  code,
  lang = 'vue',
  disableVueTemplate,
} = defineProps<{
  name?: string;
  code: string;
  lang?: BundledLanguage;
  disableVueTemplate?: boolean;
}>();

const isCopyButtonVisible = ref(false);

const formattedCode = computed(() => {
  const trimmedCode = code.trim().replace(/^\s*\n/gm, '');
  if (lang === 'vue' && !disableVueTemplate) {
    return `<template>\r\n${trimmedCode.replace(/^/gm, '  ')}\r\n</template>`;
  }
  return trimmedCode;
});

const isDark = useDark();

const theme = computed<BundledTheme>(() =>
  isDark.value ? 'github-dark' : 'github-light',
);

const { copy } = useClipboard();

const highlightedCode = computedAsync(async () => {
  try {
    return await codeToHtml(formattedCode.value, {
      theme: theme.value,
      lang,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при подсветке кода:', error);
  }
  return '';
}, code);
</script>

<template>
  <section
    :exit="{ height: 0 }"
    v-if="code.trim()"
    class="flex flex-col gap-sm mb-md last:mb-0 relative"
  >
    <h2 class="typography-title-large">{{ name }} Code Example</h2>
    <motion.section
      layout
      :animate="{ height: 'max-content' }"
      :transition="{
        duration: materialDuration.asMotion('medium-1'),
        ease: materialEasing.standard,
      }"
      v-html="highlightedCode"
      class="code-block relative overflow-hidden p-lg rounded-lg border border-outline-variant whitespace-pre-wrap typography-body-large"
      @mouseenter="isCopyButtonVisible = true"
      @mouseleave="isCopyButtonVisible = false"
    />
    <IconButton
      :class="[
        'absolute top-3xl right-xs in-focus-visible:opacity-100',
        isCopyButtonVisible ? 'opacity-100' : 'opacity-0',
      ]"
      color="secondary"
      :aria-label="`Copy code of ${name} example`"
      @mouseenter="isCopyButtonVisible = true"
      @click="copy(code)"
    >
      <IconCopy />
    </IconButton>
  </section>
</template>

<style>
.code-block code {
  counter-reset: step;
  counter-increment: step 0;
  font-weight: 600;
}

.code-block::selection {
  background-color: var(--color-primary-container);
}

.code-block .line::before {
  content: counter(step);
  counter-increment: step;
  display: inline-block;
  width: var(--spacing-6);
  margin-right: var(--spacing-xs);
  color: var(--color-on-surface-variant);
  text-align: right;
}
</style>
