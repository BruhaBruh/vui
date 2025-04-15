import type { UnknownRecord } from '@bruhabruh/type-safe';
import type { MaybeRefOrGetter } from 'vue';

export type Context<
  T extends Record<string, unknown> = UnknownRecord,
  Options extends Record<string, unknown> = UnknownRecord,
  ProvideOptions = {
    [key in keyof Options]: MaybeRefOrGetter<Options[key]>;
  },
> = {
  state: T;
  options: Options;
  provideOptions: ProvideOptions;
};
