<script setup lang="ts">
import type { EmptyObject, UnknownRecord } from '@bruhabruh/type-safe';
import { reactive, watchEffect } from 'vue';

type BaseArgument<
  T extends string,
  DF = unknown,
  U extends UnknownRecord = EmptyObject,
> = {
  type: T;
  label?: string;
  description?: string;
  defaultValue?: DF;
} & U;

type TextArgument = BaseArgument<'text', string>;

type NumberArgument = BaseArgument<'number', number>;

type SwitchArgument = BaseArgument<'switch', boolean>;

type SelectArgument = BaseArgument<'select', string> & {
  options: string[];
};

type RadioArgument = BaseArgument<'radio', string> & {
  options: string[];
};

type CheckboxArgument = BaseArgument<'checkbox', string[]> & {
  options: string[];
};

export type Argument =
  | TextArgument
  | NumberArgument
  | SwitchArgument
  | SelectArgument
  | RadioArgument
  | CheckboxArgument;

export type Arguments = Record<string, Argument>;

const { arguments: args = {} } = defineProps<{
  arguments?: Arguments;
}>();

const emit = defineEmits<{
  (e: 'change', value: UnknownRecord): void;
}>();

function createValuesWithDefaults() {
  const obj: UnknownRecord = {};

  Object.entries(args).forEach(([name, argument]) => {
    if (argument.defaultValue !== undefined) {
      obj[name] = argument.defaultValue;
      return;
    }
    if (argument.type === 'number') {
      obj[name] = 0;
    }
    if (argument.type === 'text') {
      obj[name] = '';
    }
    if (argument.type === 'switch') {
      obj[name] = false;
    }
    if (argument.type === 'select') {
      obj[name] = argument.options[0];
    }
    if (argument.type === 'radio') {
      obj[name] = argument.options[0];
    }
    if (argument.type === 'checkbox') {
      obj[name] = [];
    }
  });

  return obj;
}

const values = reactive(createValuesWithDefaults());

watchEffect(() => emit('change', values));
</script>

<template>
  <section class="flex flex-col gap-sm mb-md last:mb-0">
    <h2 class="typography-title-large">Playground</h2>
    <section
      class="relative flex min-h-96 items-center justify-center gap-md rounded-lg border p-lg border-outline-variant"
    >
      <slot :values />
    </section>
    <section class="grid gap-md grid-cols-4">
      <template v-for="(argument, name) in arguments" :key="name">
        <section class="flex flex-col items-start gap-2xs">
          <p :id="`pl-label-${name}`" class="typography-label-large">
            {{ argument.label ?? name }}
          </p>
          <input
            v-if="argument.type === 'number'"
            v-model.number="values[name]"
            class="h-10 bg-surface-container px-sm rounded-sm w-max max-w-full"
            :aria-labelledby="`pl-label-${name}`"
            type="number"
            inputmode="numeric"
          />
          <input
            v-if="argument.type === 'text'"
            v-model="values[name]"
            class="h-10 bg-surface-container px-sm rounded-sm w-max max-w-full"
            :aria-labelledby="`pl-label-${name}`"
            type="text"
          />
          <select
            v-if="argument.type === 'select'"
            v-model="values[name]"
            class="h-10 bg-surface-container px-sm rounded-sm w-max max-w-full"
            :aria-labelledby="`pl-label-${name}`"
          >
            <option v-for="value in argument.options" :key="value">
              {{ value }}
            </option>
          </select>
          <input
            v-if="argument.type === 'switch'"
            v-model="values[name]"
            class="size-4.5"
            :aria-labelledby="`pl-label-${name}`"
            type="checkbox"
          />
          <template v-if="argument.type === 'radio'">
            <section
              v-for="value in argument.options"
              :key="value"
              class="flex items-center gap-xs"
            >
              <input
                v-model="values[name]"
                class="size-4.5"
                :aria-labelledby="`pl-label-${name}`"
                :value="value"
                type="radio"
              />
              {{ value }}
            </section>
          </template>
          <template v-if="argument.type === 'checkbox'">
            <section
              v-for="value in argument.options"
              :key="value"
              class="flex items-center gap-xs"
            >
              <input
                v-model="values[name]"
                class="size-4.5"
                :aria-labelledby="`pl-label-${name}`"
                :value="value"
                type="checkbox"
              />
              {{ value }}
            </section>
          </template>
        </section>
      </template>
    </section>
  </section>
</template>
