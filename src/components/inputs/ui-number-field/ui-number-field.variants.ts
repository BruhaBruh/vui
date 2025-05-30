import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(['number-field group/number-field']);

const spinButtonVariants = cva(
  [
    'number-field--spin-button',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'cursor-pointer',
    'state-on-surface-variant',
    'hover:state-hover',
    'active:state-press',
    'group-is-disabled/number-field:state-transparent',
  ],
  {
    variants: {
      size: {
        sm: ['w-4.5 rounded-xs', '[&>*]:size-3'],
        md: ['w-5 rounded-xs', '[&>*]:size-3.5'],
        lg: ['w-6 rounded-xs', '[&>*]:size-4'],
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

export const numberFieldVariants = Object.assign(variants, {
  spinButton: spinButtonVariants,
});

export type NumberFieldVariants = Variants<typeof numberFieldVariants>;

export type NumberFieldSpinButtonVariants = Variants<
  typeof numberFieldVariants.spinButton
>;
