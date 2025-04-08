<script setup lang="ts">
import { IconButton } from '@/components';
import { IconCopy } from '@tabler/icons-vue';
import { computedAsync, useClipboard, useDark } from '@vueuse/core';
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
  const trimmedCode = code.trim();
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
    class="flex flex-col gap-sm mb-md last:mb-0 overflow-hidden relative"
  >
    <h2 class="typography-title-large">{{ name }} Code Example</h2>
    <section
      class="code-block relative overflow-hidden p-lg rounded-lg border border-outline-variant whitespace-pre-wrap typography-body-large"
      v-html="highlightedCode"
      @mouseenter="isCopyButtonVisible = true"
      @mouseleave="isCopyButtonVisible = false"
    />
    <IconButton
      :class="[
        'absolute top-3xl right-xs',
        isCopyButtonVisible ? 'opacity-100' : 'opacity-0',
      ]"
      color="secondary"
      @mouseenter="isCopyButtonVisible = true"
      @click="copy(code)"
    >
      <IconCopy />
    </IconButton>
  </section>
</template>

<style scoped>
.code-block :global(code) {
  counter-reset: step;
  counter-increment: step 0;
}

.code-block :global(.line:before) {
  content: counter(step);
  counter-increment: step;
  display: inline-block;
  width: var(--spacing-6);
  margin-right: var(--spacing-xs);
  color: var(--color-on-surface-variant);
  text-align: right;
}
</style>
