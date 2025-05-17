import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(
  [
    'radio group/radio',
    'relative',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'size-10 rounded-full',
    'is-disabled:pointer-events-none',
    [
      'is-disabled:state-transparent',
      'is-hovered:state-hover',
      'in-focus-within:state-focus',
      'is-pressed:state-press',
    ],
    ['ripple-wrapper:inset-0'],
  ],
  {
    variants: {
      color: {
        primary: ['state-primary', 'ripple:bg-primary'],
        secondary: ['state-secondary', 'ripple:bg-secondary'],
        info: ['state-info', 'ripple:bg-info'],
        success: ['state-success', 'ripple:bg-success'],
        caution: ['state-caution', 'ripple:bg-caution'],
        critical: ['state-critical', 'ripple:bg-critical'],
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);

const markVariants = cva(
  [
    'radio--mark',
    'relative',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'size-5 rounded-full',
    'overflow-hidden',
    'border-2',
    'group-is-disabled/radio:border-on-surface/38',
  ],
  {
    variants: {
      color: {
        primary: ['text-primary'],
        secondary: ['text-secondary'],
        info: ['text-info'],
        success: ['text-success'],
        caution: ['text-caution'],
        critical: ['text-critical'],
      },
      checked: {
        true: [],
        false: ['border-outline'],
      },
    },
    defaultVariants: {
      color: 'primary',
      checked: true,
    },
  },
);

const iconVariants = cva(
  [
    'radio--icon',
    'absolute inline-block size-2.5 rounded-full',
    'transition easing-standard duration-medium-1',
    'overflow-hidden',
    'group-is-disabled/radio:bg-on-surface/38',
  ],
  {
    variants: {
      color: {
        primary: ['bg-primary'],
        secondary: ['bg-secondary'],
        info: ['bg-info'],
        success: ['bg-success'],
        caution: ['bg-caution'],
        critical: ['bg-critical'],
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);

export const radioVariants = Object.assign(variants, {
  mark: markVariants,
  icon: iconVariants,
});

export type RadioVariants = VariantProps<typeof radioVariants>;

export type RadioMarkVariants = VariantProps<typeof radioVariants.mark>;

export type RadioIconVariants = VariantProps<typeof radioVariants.icon>;
