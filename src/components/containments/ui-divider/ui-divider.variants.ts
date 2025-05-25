import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'divider group/divider',
    'relative',
    'inline-flex items-center justify-center',
    [
      'aria-[orientation=horizontal]:h-0.25 aria-[orientation=horizontal]:w-full',
      'aria-[orientation=vertical]:h-full aria-[orientation=vertical]:w-0.25',
    ],
    ['after:bg-outline-variant', 'after:size-full'],
  ],
  {
    variants: {
      inset: {
        true: [
          'aria-[orientation=horizontal]:px-md',
          'aria-[orientation=vertical]:py-md',
        ],
        false: {},
      },
    },
    defaultVariants: {
      inset: false,
    },
  },
);

export const dividerVariants = Object.assign(variants, {});

export type DividerVariants = Variants<typeof dividerVariants>;
