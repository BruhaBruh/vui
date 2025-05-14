import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'icon-button group/icon-button',
    [
      'inline-flex items-center justify-center',
      'relative',
      'overflow-hidden',
      'cursor-pointer',
      'transition-box duration-medium-1 easing-standard',
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
        xs: ['h-8 border', 'typography-label-large'],
        sm: ['h-10 border', 'typography-label-large'],
        md: ['h-14 border', 'typography-title-medium'],
        lg: ['h-24 border-2', 'typography-headline-small'],
        xl: ['h-34 border-[3px]', 'typography-headline-large'],
      },
      shape: {
        rounded: ['rounded-full'],
        square: [],
      },
      variant: {
        filled: [
          'aria-not-pressed:bg-surface-container',
          'aria-not-pressed:text-on-surface-variant',
          'is-disabled:bg-on-surface/10',
          'is-disabled:text-on-surface/38',
        ],
        tonal: [
          'is-disabled:bg-on-surface/10',
          'is-disabled:text-on-surface/38',
        ],
        outlined: [
          'border-outline-variant aria-pressed:border-transparent',
          'bg-transparent aria-pressed:bg-inverse-surface',
          'text-on-surface-variant  aria-pressed:text-inverse-on-surface',
          'is-disabled:border-outline-variant',
          'is-disabled:aria-pressed:bg-on-surface/10',
          'is-disabled:text-on-surface/38',
        ],
        standard: ['text-on-surface-variant', 'is-disabled:text-on-surface/38'],
      },
      color: {
        primary: [],
        secondary: [],
        info: [],
        success: [],
        caution: [],
        critical: [],
      },
      width: {
        default: [],
        narrow: [],
        wide: [],
      },
    },
    defaultVariants: {
      size: 'sm',
      shape: 'rounded',
      variant: 'filled',
      color: 'primary',
      width: 'default',
    },
    compoundVariants: [
      {
        variant: ['filled', 'tonal', 'standard'],
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
        size: 'xs',
        width: 'default',
        class: 'w-8',
      },
      {
        size: 'sm',
        width: 'default',
        class: 'w-10',
      },
      {
        size: 'md',
        width: 'default',
        class: 'w-14',
      },
      {
        size: 'lg',
        width: 'default',
        class: 'w-24',
      },
      {
        size: 'xl',
        width: 'default',
        class: 'w-34',
      },

      {
        size: 'xs',
        width: 'narrow',
        class: 'w-7',
      },
      {
        size: 'sm',
        width: 'narrow',
        class: 'w-8',
      },
      {
        size: 'md',
        width: 'narrow',
        class: 'w-12',
      },
      {
        size: 'lg',
        width: 'narrow',
        class: 'w-16',
      },
      {
        size: 'xl',
        width: 'narrow',
        class: 'w-26',
      },

      {
        size: 'xs',
        width: 'wide',
        class: 'w-10',
      },
      {
        size: 'sm',
        width: 'wide',
        class: 'w-13',
      },
      {
        size: 'md',
        width: 'wide',
        class: 'w-18',
      },
      {
        size: 'lg',
        width: 'wide',
        class: 'w-32',
      },
      {
        size: 'xl',
        width: 'wide',
        class: 'w-46',
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
        variant: 'standard',
        color: 'primary',
        class: ['aria-pressed:text-primary'],
      },
      {
        variant: 'standard',
        color: 'secondary',
        class: ['aria-pressed:text-secondary'],
      },
      {
        variant: 'standard',
        color: 'info',
        class: ['aria-pressed:text-info'],
      },
      {
        variant: 'standard',
        color: 'success',
        class: ['aria-pressed:text-success'],
      },
      {
        variant: 'standard',
        color: 'caution',
        class: ['aria-pressed:text-caution'],
      },
      {
        variant: 'standard',
        color: 'critical',
        class: ['aria-pressed:text-critical'],
      },
    ],
  },
);

const iconVariants = cva(['icon-button--icon'], {
  variants: {
    size: {
      xs: ['size-5'],
      sm: ['size-6'],
      md: ['size-6'],
      lg: ['size-8'],
      xl: ['size-10'],
    },
    shape: {
      rounded: [],
      square: [],
    },
    variant: {
      filled: [],
      tonal: [],
      outlined: [],
      standard: [],
    },
    color: {
      primary: [],
      secondary: [],
      info: [],
      success: [],
      caution: [],
      critical: [],
    },
    width: {
      default: [],
      narrow: [],
      wide: [],
    },
  },
  defaultVariants: {
    size: 'sm',
    shape: 'rounded',
    variant: 'filled',
    color: 'primary',
    width: 'default',
  },
});

export const iconButtonVariants = Object.assign(variants, {
  icon: iconVariants,
});

export type IconButtonVariants = Variants<typeof iconButtonVariants>;

export type IconButtonIconVariants = Variants<typeof iconButtonVariants.icon>;
