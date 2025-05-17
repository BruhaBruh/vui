import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(
  ['popover group/popover', 'overflow-hidden', 'relative', 'z-20'],
  {
    variants: {
      placement: {
        top: ['origin-bottom'],
        'top-start': ['origin-bottom-left'],
        'top-end': ['origin-bottom-right'],
        right: ['origin-left'],
        'right-start': ['origin-top-left'],
        'right-end': ['origin-bottom-left'],
        left: ['origin-right'],
        'left-start': ['origin-top-right'],
        'left-end': ['origin-bottom-right'],
        bottom: ['origin-top'],
        'bottom-start': ['origin-top-left'],
        'bottom-end': ['origin-top-right'],
      },
    },
    defaultVariants: {
      placement: 'top',
    },
  },
);

export const popoverVariants = Object.assign(variants, {});

export type PopoverVariants = Variants<typeof popoverVariants>;
