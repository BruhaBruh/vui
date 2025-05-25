import type { EmptyObject } from '@bruhabruh/type-safe';
import { type ComputedRef, type MaybeRefOrGetter } from 'vue';

export type Context<
  T extends Record<string, unknown> = EmptyObject,
  Options extends Record<string, unknown> = EmptyObject,
  ReadonlyOptions extends Record<string, unknown> = EmptyObject,
  RawOptions extends Record<string, unknown> = EmptyObject,
  ProvideOptions = {
    [key in keyof Options]: MaybeRefOrGetter<Options[key]>;
  },
  ProvideReadonlyOptions = {
    [key in keyof ReadonlyOptions]: ComputedRef<ReadonlyOptions[key]>;
  },
> = {
  state: T;
  options: Options & ReadonlyOptions & RawOptions & {};
  provideOptions: ProvideOptions & ProvideReadonlyOptions & RawOptions & {};
};
