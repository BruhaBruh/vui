<script setup lang="ts">
import {
  Container,
  ContainerContent,
  type ContainerContentProps,
  type ContainerProps,
} from '@/components';
import {
  StorybookCode,
  StorybookPlayground,
  StorybookStory,
} from '@/storybook/components';
import type { UnknownRecord } from '@bruhabruh/type-safe';
import { ref } from 'vue';

const paddings = [
  'none',
  'top',
  'both',
  'bottom',
] satisfies ContainerContentProps['padding'][];
const variants = [
  'none',
  'flex',
  'grid',
] satisfies ContainerContentProps['variant'][];
const colors = [
  'none',
  'surface',
  'surface-container',
  'inverse-surface',
  'primary',
  'primary-container',
  'secondary',
  'secondary-container',
  'info',
  'info-container',
  'success',
  'success-container',
  'caution',
  'caution-container',
  'critical',
  'critical-container',
] satisfies ContainerProps['color'][];

const code = ref('');

const onChange = ({ color, variant, padding }: UnknownRecord) => {
  code.value = `
<Container color="${color}">
  <ContainerContent variant="${variant}" padding="${padding}">
    <section>Container</section>
  </ContainerContent>
</Container>
`;
};
</script>

<template>
  <StorybookPlayground
    @change="onChange"
    :arguments="{
      color: {
        type: 'select',
        label: 'Color',
        description: 'Color of Container',
        defaultValue: 'none',
        options: colors,
      },
      variant: {
        type: 'select',
        label: 'Variant',
        description: 'Variant of Container',
        defaultValue: 'none',
        options: variants,
      },
      padding: {
        type: 'select',
        label: 'Padding',
        description: 'Padding of Container',
        defaultValue: 'none',
        options: paddings,
      },
    }"
  >
    <template #default="{ values: { color, ...values } }">
      <section class="grid gap-md w-full">
        <Container :color="color as ContainerProps['color']">
          <ContainerContent v-bind="values">
            <section>Container</section>
          </ContainerContent>
        </Container>
      </section>
    </template>
  </StorybookPlayground>
  <StorybookCode name="Container" :code />
  <StorybookStory name="Paddings">
    <section class="grid gap-md w-full">
      <Container
        v-for="padding in paddings"
        :key="padding"
        color="surface-container"
      >
        <ContainerContent :padding="padding">
          {{ padding.charAt(0).toUpperCase() + padding.slice(1) }}
          Padding
        </ContainerContent>
      </Container>
    </section>
  </StorybookStory>
  <StorybookStory name="Variants">
    <section class="grid gap-md w-full">
      <Container
        v-for="variant in variants"
        :key="variant"
        color="surface-container"
      >
        <ContainerContent :variant="variant" padding="both">
          <section class="bg-critical-container">
            {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
            Variant
          </section>
        </ContainerContent>
      </Container>
    </section>
  </StorybookStory>
  <StorybookStory name="Colors">
    <section class="grid gap-md w-full">
      <Container v-for="color in colors" :key="color" :color="color">
        <ContainerContent padding="both">
          {{
            color
              .split('-')
              .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
              .join(' ')
          }}
        </ContainerContent>
      </Container>
    </section>
  </StorybookStory>
</template>
