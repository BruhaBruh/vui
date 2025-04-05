import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'badge group/badge',
    'rounded-full',
    'z-10',
    'inline-flex items-center justify-center',
    'typography-label-small',
    'pointer-events-none select-none',
  ],
  {
    variants: {
      size: {
        small: ['size-1.5'],
        large: [
          'h-4',
          'data-[one-digit=true]:w-4',
          'data-[one-digit=false]:px-2xs',
        ],
      },
      color: {
        primary: ['bg-primary', 'text-on-primary'],
        secondary: ['bg-secondary', 'text-on-secondary'],
        info: ['bg-info', 'text-on-info'],
        success: ['bg-success', 'text-on-success'],
        caution: ['bg-caution', 'text-on-caution'],
        critical: ['bg-critical', 'text-on-critical'],
      },
      placement: {
        default: [],
        icon: ['absolute', '-translate-y-full translate-x-full'],
      },
    },
    defaultVariants: {
      size: 'small',
      color: 'primary',
    },
    compoundVariants: [
      {
        size: 'small',
        placement: 'icon',
        class: 'top-1.5 right-1.5',
      },
      {
        size: 'large',
        placement: 'icon',
        class: 'top-3.5 right-3',
      },
    ],
  },
);

export const badgeVariants = Object.assign(variants, {});
