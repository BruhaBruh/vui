<script setup lang="ts">
import { NumberField, Switch, TextAreaField, TextField } from '@/components';
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

type ArrayArgument = BaseArgument<'array', unknown[]>;

type ObjectArgument = BaseArgument<'object', UnknownRecord>;

export type Argument =
  | TextArgument
  | NumberArgument
  | SwitchArgument
  | SelectArgument
  | RadioArgument
  | CheckboxArgument
  | ArrayArgument
  | ObjectArgument;

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
    if (argument.type === 'array') {
      obj[name] = [];
    }
    if (argument.type === 'object') {
      obj[name] = {};
    }
  });

  return obj;
}

const values = reactive(createValuesWithDefaults());

watchEffect(() => emit('change', values));

function set(obj: UnknownRecord) {
  const valuesKeys = Object.keys(values);
  for (const [key, value] of Object.entries(obj)) {
    if (!valuesKeys.includes(key)) continue;
    values[key] = value;
  }
}
</script>

<template>
  <div class="flex flex-col gap-sm mb-md last:mb-0">
    <h2 class="typography-title-large">Playground</h2>
    <div
      class="relative flex min-h-64 items-center justify-center gap-md rounded-lg border p-lg border-outline-variant"
    >
      <slot :values :set />
    </div>
    <div class="grid gap-md grid-cols-4">
      <template v-for="(argument, name) in arguments" :key="name">
        <div class="flex flex-col items-start gap-2xs">
          <p :id="`pl-label-${name}`" class="typography-label-large">
            {{ argument.label ?? name }}
          </p>
          <NumberField
            v-if="argument.type === 'number'"
            size="sm"
            v-model:value="values[name] as number"
            :aria-labelledby="`pl-label-${name}`"
          />
          <TextField
            v-if="argument.type === 'text'"
            size="sm"
            v-model:value="values[name] as string"
            :aria-labelledby="`pl-label-${name}`"
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
          <Switch
            v-if="argument.type === 'switch'"
            :checked="values[name] as boolean"
            @change="(v) => (values[name] = v)"
            :aria-labelledby="`pl-label-${name}`"
          />
          <template v-if="argument.type === 'radio'">
            <div
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
            </div>
          </template>
          <template v-if="argument.type === 'checkbox'">
            <div
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
            </div>
          </template>
          <TextAreaField
            v-if="argument.type === 'array'"
            :value="JSON.stringify(values[name])"
            @update:value="
              (v) => {
                try {
                  values[name] = JSON.parse(v);
                } catch {}
              }
            "
            :aria-labelledby="`pl-label-${name}`"
          />
          <TextAreaField
            v-if="argument.type === 'object'"
            :value="JSON.stringify(values[name])"
            @update:value="
              (v) => {
                try {
                  values[name] = JSON.parse(v);
                } catch {}
              }
            "
            :aria-labelledby="`pl-label-${name}`"
          />
        </div>
      </template>
    </div>
  </div>
</template>
