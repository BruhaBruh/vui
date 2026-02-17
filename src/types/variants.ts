import type { VariantProps } from "class-variance-authority";

export type Variants<
	Component extends (...args: any) => any,
	T = VariantProps<Component>,
> = {
	[K in keyof T]: NonNullable<T[K]>;
} & {};
