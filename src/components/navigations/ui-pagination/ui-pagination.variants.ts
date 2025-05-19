import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva([
  'pagination group/pagination',
  'inline-flex items-center justify-center',
  'gap-xs',
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

export type PaginationVariants = Variants<typeof paginationVariants>;

export type PaginationButtonVariants = Variants<
  typeof paginationVariants.button
>;

export type PaginationButtonTextVariants = Variants<
  typeof paginationVariants.buttonText
>;
