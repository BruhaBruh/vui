import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva([
  'pagination group/pagination',
  'inline-flex items-center justify-center',
  'gap-sm',
]);

const buttonVariants = cva(['pagination--button', 'typography-label-large']);

const buttonTextVariants = cva([
  'pagination--button-text',
  'inline-flex items-center justify-center',
]);

export const paginationVariants = Object.assign(variants, {
  button: buttonVariants,
  buttonText: buttonTextVariants,
});

export type PaginationVariants = VariantProps<typeof paginationVariants>;

export type PaginationButtonVariants = VariantProps<
  typeof paginationVariants.button
>;

export type PaginationButtonTextVariants = VariantProps<
  typeof paginationVariants.buttonText
>;
