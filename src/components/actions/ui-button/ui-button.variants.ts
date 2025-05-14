import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'button group/button',
    [
      'inline-flex items-center justify-center',
      'relative',
      'overflow-hidden',
      'cursor-pointer',
      'transition duration-medium-1 easing-standard',
      ['ripple-wrapper:inset-0 ripple:bg-current'],
      [
        'state-current',
        'is-disabled:state-transparent',
        'is-disabled:pointer-events-none',
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
        xs: ['h-8 px-3 border', 'typography-label-large'],
        sm: ['h-10 px-4 border', 'typography-label-large'],
        md: ['h-14 px-6 border', 'typography-title-medium'],
        lg: ['h-24 px-12 border-2', 'typography-headline-small'],
        xl: ['h-34 px-16 border-[3px]', 'typography-headline-large'],
      },
      shape: {
        rounded: ['rounded-full'],
        square: [],
      },
      variant: {
        elevated: [
          'bg-surface-container-low',
          'is-disabled:bg-on-surface/10',
          'is-disabled:text-on-surface/38',
          'elevation-1',
          'is-hovered:elevation-2',
          'in-focus:elevation-1',
          'is-pressed:elevation-1',
          'is-disabled:elevation-0',
        ],
        filled: [
          'aria-not-pressed:bg-surface-container',
          'aria-not-pressed:text-on-surface-variant',
          'is-disabled:bg-on-surface/10',
          'is-disabled:text-on-surface/38',
          'elevation-0',
          'is-hovered:elevation-1',
          'in-focus:elevation-0',
          'is-pressed:elevation-0',
          'is-disabled:elevation-0',
        ],
        tonal: [
          'is-disabled:bg-on-surface/10',
          'is-disabled:text-on-surface/38',
          'elevation-0',
          'is-hovered:elevation-1',
          'in-focus:elevation-0',
          'is-pressed:elevation-0',
          'is-disabled:elevation-0',
        ],
        outlined: [
          'border-outline-variant aria-pressed:border-transparent',
          'bg-transparent aria-pressed:bg-inverse-surface',
          'text-on-surface-variant  aria-pressed:text-inverse-on-surface',
          'is-disabled:border-outline-variant',
          'is-disabled:aria-pressed:bg-on-surface/10',
          'is-disabled:text-on-surface/38',
        ],
        text: ['is-disabled:text-on-surface/38', 'elevation-0'],
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
      shape: 'rounded',
      variant: 'filled',
      color: 'primary',
    },
    compoundVariants: [
      {
        variant: ['elevated', 'filled', 'tonal', 'text'],
        class: 'border-0',
      },

      {
        size: ['xs', 'sm'],
        shape: 'square',
        class: 'rounded-md',
      },
      {
        size: 'md',
        shape: 'square',
        class: 'rounded-lg',
      },
      {
        size: ['lg', 'xl'],
        shape: 'square',
        class: 'rounded-xl',
      },

      {
        variant: 'elevated',
        color: 'primary',
        class: [
          'aria-pressed:bg-primary',
          'text-primary aria-pressed:text-on-primary',
        ],
      },
      {
        variant: 'elevated',
        color: 'secondary',
        class: [
          'aria-pressed:bg-secondary',
          'text-secondary aria-pressed:text-on-secondary',
        ],
      },
      {
        variant: 'elevated',
        color: 'info',
        class: ['aria-pressed:bg-info', 'text-info aria-pressed:text-on-info'],
      },
      {
        variant: 'elevated',
        color: 'success',
        class: [
          'aria-pressed:bg-success',
          'text-success aria-pressed:text-on-success',
        ],
      },
      {
        variant: 'elevated',
        color: 'caution',
        class: [
          'aria-pressed:bg-caution',
          'text-caution aria-pressed:text-on-caution',
        ],
      },
      {
        variant: 'elevated',
        color: 'critical',
        class: [
          'aria-pressed:bg-critical',
          'text-critical aria-pressed:text-on-critical',
        ],
      },

      {
        variant: 'filled',
        color: 'primary',
        class: [
          'bg-primary aria-pressed:bg-primary',
          'text-on-primary aria-pressed:text-on-primary',
        ],
      },
      {
        variant: 'filled',
        color: 'secondary',
        class: [
          'bg-secondary aria-pressed:bg-secondary',
          'text-on-secondary aria-pressed:text-on-secondary',
        ],
      },
      {
        variant: 'filled',
        color: 'info',
        class: [
          'bg-info aria-pressed:bg-info',
          'text-on-info aria-pressed:text-on-info',
        ],
      },
      {
        variant: 'filled',
        color: 'success',
        class: [
          'bg-success aria-pressed:bg-success',
          'text-on-success aria-pressed:text-on-success',
        ],
      },
      {
        variant: 'filled',
        color: 'caution',
        class: [
          'bg-caution aria-pressed:bg-caution',
          'text-on-caution aria-pressed:text-on-caution',
        ],
      },
      {
        variant: 'filled',
        color: 'critical',
        class: [
          'bg-critical aria-pressed:bg-critical',
          'text-on-critical aria-pressed:text-on-critical',
        ],
      },

      {
        variant: 'tonal',
        color: 'primary',
        class: [
          'bg-primary-container aria-pressed:bg-primary',
          'text-on-primary-container aria-pressed:text-on-primary',
        ],
      },
      {
        variant: 'tonal',
        color: 'secondary',
        class: [
          'bg-secondary-container aria-pressed:bg-secondary',
          'text-on-secondary-container aria-pressed:text-on-secondary',
        ],
      },
      {
        variant: 'tonal',
        color: 'info',
        class: [
          'bg-info-container aria-pressed:bg-info',
          'text-on-info-container aria-pressed:text-on-info',
        ],
      },
      {
        variant: 'tonal',
        color: 'success',
        class: [
          'bg-success-container aria-pressed:bg-success',
          'text-on-success-container aria-pressed:text-on-success',
        ],
      },
      {
        variant: 'tonal',
        color: 'caution',
        class: [
          'bg-caution-container aria-pressed:bg-caution',
          'text-on-caution-container aria-pressed:text-on-caution',
        ],
      },
      {
        variant: 'tonal',
        color: 'critical',
        class: [
          'bg-critical-container aria-pressed:bg-critical',
          'text-on-critical-container aria-pressed:text-on-critical',
        ],
      },

      {
        variant: 'text',
        color: 'primary',
        class: ['text-primary'],
      },
      {
        variant: 'text',
        color: 'secondary',
        class: ['text-secondary'],
      },
      {
        variant: 'text',
        color: 'info',
        class: ['text-info'],
      },
      {
        variant: 'text',
        color: 'success',
        class: ['text-success'],
      },
      {
        variant: 'text',
        color: 'caution',
        class: ['text-caution'],
      },
      {
        variant: 'text',
        color: 'critical',
        class: ['text-critical'],
      },
    ],
  },
);

const iconVariants = cva(['button--icon'], {
  variants: {
    size: {
      xs: ['size-5'],
      sm: ['size-5'],
      md: ['size-6'],
      lg: ['size-8'],
      xl: ['size-10'],
    },
    shape: {
      rounded: [],
      square: [],
    },
    variant: {
      elevated: [],
      filled: [],
      tonal: [],
      outlined: [],
      text: [],
    },
    color: {
      primary: [],
      secondary: [],
      info: [],
      success: [],
      caution: [],
      critical: [],
    },
    position: {
      leading: [],
      trailing: [],
    },
  },
  defaultVariants: {
    size: 'sm',
    shape: 'rounded',
    variant: 'filled',
    color: 'primary',
  },
  compoundVariants: [
    {
      position: 'leading',
      size: 'xs',
      class: 'mr-1',
    },
    {
      position: 'leading',
      size: ['sm', 'md'],
      class: 'mr-2',
    },
    {
      position: 'leading',
      size: 'lg',
      class: 'mr-3',
    },
    {
      position: 'leading',
      size: 'xl',
      class: 'mr-4',
    },
    {
      position: 'trailing',
      size: 'xs',
      class: 'ml-1',
    },
    {
      position: 'trailing',
      size: ['sm', 'md'],
      class: 'ml-2',
    },
    {
      position: 'trailing',
      size: 'lg',
      class: 'ml-3',
    },
    {
      position: 'trailing',
      size: 'xl',
      class: 'ml-4',
    },
  ],
});

const labelVariants = cva(['button--label'], {
  variants: {
    size: {
      xs: [],
      sm: [],
      md: [],
      lg: [],
      xl: [],
    },
    shape: {
      rounded: [],
      square: [],
    },
    variant: {
      elevated: [],
      filled: [],
      tonal: [],
      outlined: [],
      text: [],
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
    shape: 'rounded',
    variant: 'filled',
    color: 'primary',
  },
  compoundVariants: [],
});

export const buttonVariants = Object.assign(variants, {
  icon: iconVariants,
  label: labelVariants,
});

export type ButtonVariants = Variants<typeof buttonVariants>;

export type ButtonIconVariants = Variants<typeof buttonVariants.icon>;

export type ButtonLabelVariants = Variants<typeof buttonVariants.label>;
