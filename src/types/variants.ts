import type { VariantProps } from 'class-variance-authority';

export type Variants<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component extends (...args: any) => any,
  T = VariantProps<Component>,
> = {
  [K in keyof T]: NonNullable<T[K]>;
} & {};
