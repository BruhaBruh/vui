<script setup lang="ts">
import {
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components';
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
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <div v-if="code.trim()" class="flex flex-col gap-sm mb-md last:mb-0 relative">
    <h2 class="typography-title-large">{{ name }} Code Example</h2>
    <div
      v-html="highlightedCode"
      class="code-block relative overflow-hidden p-lg rounded-lg border border-outline-variant whitespace-pre-wrap typography-body-large"
      @mouseenter="isCopyButtonVisible = true"
      @mouseleave="isCopyButtonVisible = false"
    />

    <Tooltip>
      <TooltipTrigger>
        <IconButton
          icon="tabler:clipboard-copy"
          color="secondary"
          variant="tonal"
          :aria-label="`Copy code of ${name} example`"
          :class="[
            'absolute! top-3xl right-xs in-focus-visible:opacity-100',
            isCopyButtonVisible ? 'opacity-100' : 'opacity-0',
          ]"
          @mouseenter="isCopyButtonVisible = true"
          @click="copy(code)"
        />
      </TooltipTrigger>
      <TooltipContent> Copy code </TooltipContent>
    </Tooltip>
  </div>
</template>

<style>
.code-block code {
  counter-reset: step;
  counter-increment: step 0;
  font-weight: 600;
}

.code-block pre {
  background-color: transparent !important;
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
