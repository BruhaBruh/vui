import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'extended-fab group/extended-fab',
    'min-w-20',
    'elevation-3',
    'is-hovered:elevation-4',
    'in-focus:elevation-3',
    'is-pressed:elevation-3',
    [
      'inline-flex items-center justify-center',
      'relative',
      'cursor-pointer',
      'transition-box duration-medium-1 easing-standard',
      ['ripple-wrapper:inset-0 ripple:bg-current'],
      [
        'state-current',
        'is-hovered:state-hover',
        'in-focus:state-focus',
        'is-pressed:state-press',
      ],
      ['outline-offset-[3px]', 'in-focus-visible:outline-[3px]'],
    ],
  ],
  {
    variants: {
      size: {
        sm: ['h-14 px-4 rounded-lg', 'typography-title-medium'],
        md: ['h-20 px-6.5 rounded-lg-inc', 'typography-title-large'],
        lg: ['h-24 px-7 rounded-xl', 'typography-headline-small'],
      },
      variant: {
        filled: [],
        tonal: [],
      },
      color: {
        primary: [],
        secondary: [],
        info: [],
        success: [],
        caution: [],
        critical: [],
      },
    },
    defaultVariants: {
      size: 'sm',
      variant: 'filled',
      color: 'primary',
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'primary',
        class: ['bg-primary', 'text-on-primary'],
      },
      {
        variant: 'filled',
        color: 'secondary',
        class: ['bg-secondary', 'text-on-secondary'],
      },
      {
        variant: 'filled',
        color: 'info',
        class: ['bg-info', 'text-on-info'],
      },
      {
        variant: 'filled',
        color: 'success',
        class: ['bg-success', 'text-on-success'],
      },
      {
        variant: 'filled',
        color: 'caution',
        class: ['bg-caution', 'text-on-caution'],
      },
      {
        variant: 'filled',
        color: 'critical',
        class: ['bg-critical', 'text-on-critical'],
      },

      {
        variant: 'tonal',
        color: 'primary',
        class: ['bg-primary-container', 'text-on-primary-container'],
      },
      {
        variant: 'tonal',
        color: 'secondary',
        class: ['bg-secondary-container', 'text-on-secondary-container'],
      },
      {
        variant: 'tonal',
        color: 'info',
        class: ['bg-info-container', 'text-on-info-container'],
      },
      {
        variant: 'tonal',
        color: 'success',
        class: ['bg-success-container', 'text-on-success-container'],
      },
      {
        variant: 'tonal',
        color: 'caution',
        class: ['bg-caution-container', 'text-on-caution-container'],
      },
      {
        variant: 'tonal',
        color: 'critical',
        class: ['bg-critical-container', 'text-on-critical-container'],
      },
    ],
  },
);

const iconVariants = cva(['extended-fab--icon'], {
  variants: {
    size: {
      sm: ['size-6 mr-2'],
      md: ['size-7 mr-3'],
      lg: ['size-9 mr-4'],
    },
    variant: {
      filled: [],
      tonal: [],
    },
    color: {
      primary: [],
      secondary: [],
      info: [],
      success: [],
      caution: [],
      critical: [],
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'filled',
    color: 'primary',
  },
  compoundVariants: [],
});

const labelVariants = cva(['extended-fab--label'], {
  variants: {
    size: {
      sm: [],
      md: [],
      lg: [],
    },
    variant: {
      filled: [],
      tonal: [],
    },
    color: {
      primary: [],
      secondary: [],
      info: [],
      success: [],
      caution: [],
      critical: [],
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'filled',
    color: 'primary',
  },
  compoundVariants: [],
});

export const extendedFabVariants = Object.assign(variants, {
  icon: iconVariants,
  label: labelVariants,
});

export type ExtendedFabVariants = Variants<typeof extendedFabVariants>;

export type ExtendedFabIconVariants = Variants<typeof extendedFabVariants.icon>;

export type ExtendedFabLabelVariants = Variants<
  typeof extendedFabVariants.label
>;
