import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(
  [
    'icon-button group/icon-button',
    'cursor-pointer',
    'relative',
    'size-10 rounded-md',
    'inline-flex items-center justify-center',
    'transition duration-medium-1 easing-standard',
    'outline-none border-transparent',
    'whitespace-nowrap',
    [
      'is-disabled:state-transparent',
      'is-disabled:pointer-events-none',
      'is-hovered:state-hover',
      'in-focus-visible:state-focus',
      'is-pressed:state-press',
    ],
    ['ripple-wrapper:inset-0', 'ripple-wrapper:rounded-md'],
  ],
  {
    variants: {
      variant: {
        standard: 'is-disabled:text-on-surface/38',
        filled: [
          'is-disabled:bg-on-surface/12',
          'is-disabled:text-on-surface/38',
        ],
        tonal: [
          'is-disabled:bg-on-surface/12',
          'is-disabled:text-on-surface/38',
        ],
        outlined: ['border', 'is-disabled:text-on-surface/38'],
      },
      color: {
        primary: [],
        secondary: [],
        info: [],
        success: [],
        caution: [],
        critical: [],
      },
      state: {
        'toggleable-selected': [],
        'toggleable-not-selected': [],
        default: [],
      },
    },
    defaultVariants: {
      variant: 'standard',
      color: 'primary',
    },
    compoundVariants: [
      {
        variant: 'standard',
        state: 'toggleable-not-selected',
        class: [
          'text-on-surface-variant',
          'ripple:bg-on-surface-variant',
          'state-on-surface-variant',
        ],
      },
      {
        variant: 'standard',
        state: ['default', 'toggleable-selected'],
        color: 'primary',
        class: ['text-primary', 'ripple:bg-primary', 'state-primary'],
      },
      {
        variant: 'standard',
        state: ['default', 'toggleable-selected'],
        color: 'secondary',
        class: ['text-secondary', 'ripple:bg-secondary', 'state-secondary'],
      },
      {
        variant: 'standard',
        state: ['default', 'toggleable-selected'],
        color: 'info',
        class: ['text-info', 'ripple:bg-info', 'state-info'],
      },
      {
        variant: 'standard',
        state: ['default', 'toggleable-selected'],
        color: 'success',
        class: ['text-success', 'ripple:bg-success', 'state-success'],
      },
      {
        variant: 'standard',
        state: ['default', 'toggleable-selected'],
        color: 'caution',
        class: ['text-caution', 'ripple:bg-caution', 'state-caution'],
      },
      {
        variant: 'standard',
        state: ['default', 'toggleable-selected'],
        color: 'critical',
        class: ['text-critical', 'ripple:bg-critical', 'state-critical'],
      },

      {
        variant: 'filled',
        state: 'toggleable-not-selected',
        color: 'primary',
        class: [
          'bg-surface-container-highest',
          'text-primary',
          'ripple:bg-primary',
          'state-primary',
        ],
      },
      {
        variant: 'filled',
        state: ['default', 'toggleable-selected'],
        color: 'primary',
        class: [
          'bg-primary',
          'text-on-primary',
          'ripple:bg-on-primary',
          'state-on-primary',
        ],
      },
      {
        variant: 'filled',
        state: 'toggleable-not-selected',
        color: 'secondary',
        class: [
          'bg-surface-container-highest',
          'text-secondary',
          'ripple:bg-secondary',
          'state-secondary',
        ],
      },
      {
        variant: 'filled',
        state: ['default', 'toggleable-selected'],
        color: 'secondary',
        class: [
          'bg-secondary',
          'text-on-secondary',
          'ripple:bg-on-secondary',
          'state-on-secondary',
        ],
      },
      {
        variant: 'filled',
        state: 'toggleable-not-selected',
        color: 'info',
        class: [
          'bg-surface-container-highest',
          'text-info',
          'ripple:bg-info',
          'state-info',
        ],
      },
      {
        variant: 'filled',
        state: ['default', 'toggleable-selected'],
        color: 'info',
        class: [
          'bg-info',
          'text-on-info',
          'ripple:bg-on-info',
          'state-on-info',
        ],
      },
      {
        variant: 'filled',
        state: 'toggleable-not-selected',
        color: 'success',
        class: [
          'bg-surface-container-highest',
          'text-success',
          'ripple:bg-success',
          'state-success',
        ],
      },
      {
        variant: 'filled',
        state: ['default', 'toggleable-selected'],
        color: 'success',
        class: [
          'bg-success',
          'text-on-success',
          'ripple:bg-on-success',
          'state-on-success',
        ],
      },
      {
        variant: 'filled',
        state: 'toggleable-not-selected',
        color: 'caution',
        class: [
          'bg-surface-container-highest',
          'text-caution',
          'ripple:bg-caution',
          'state-caution',
        ],
      },
      {
        variant: 'filled',
        state: ['default', 'toggleable-selected'],
        color: 'caution',
        class: [
          'bg-caution',
          'text-on-caution',
          'ripple:bg-on-caution',
          'state-on-caution',
        ],
      },
      {
        variant: 'filled',
        state: 'toggleable-not-selected',
        color: 'critical',
        class: [
          'bg-surface-container-highest',
          'text-critical',
          'ripple:bg-critical',
          'state-critical',
        ],
      },
      {
        variant: 'filled',
        state: ['default', 'toggleable-selected'],
        color: 'critical',
        class: [
          'bg-critical',
          'text-on-critical',
          'ripple:bg-on-critical',
          'state-on-critical',
        ],
      },

      {
        variant: 'tonal',
        state: 'toggleable-not-selected',
        class: [
          'bg-surface-container-highest',
          'text-on-surface-variant',
          'ripple:bg-on-surface-variant',
          'state-on-surface-variant',
        ],
      },
      {
        variant: 'tonal',
        state: ['default', 'toggleable-selected'],
        color: 'primary',
        class: [
          'bg-primary-container',
          'text-on-primary-container',
          'ripple:bg-on-primary-container',
          'state-on-primary-container',
        ],
      },
      {
        variant: 'tonal',
        state: ['default', 'toggleable-selected'],
        color: 'secondary',
        class: [
          'bg-secondary-container',
          'text-on-secondary-container',
          'ripple:bg-on-secondary-container',
          'state-on-secondary-container',
        ],
      },
      {
        variant: 'tonal',
        state: ['default', 'toggleable-selected'],
        color: 'info',
        class: [
          'bg-info-container',
          'text-on-info-container',
          'ripple:bg-on-info-container',
          'state-on-info-container',
        ],
      },
      {
        variant: 'tonal',
        state: ['default', 'toggleable-selected'],
        color: 'success',
        class: [
          'bg-success-container',
          'text-on-success-container',
          'ripple:bg-on-success-container',
          'state-on-success-container',
        ],
      },
      {
        variant: 'tonal',
        state: ['default', 'toggleable-selected'],
        color: 'caution',
        class: [
          'bg-caution-container',
          'text-on-caution-container',
          'ripple:bg-on-caution-container',
          'state-on-caution-container',
        ],
      },
      {
        variant: 'tonal',
        state: ['default', 'toggleable-selected'],
        color: 'critical',
        class: [
          'bg-critical-container',
          'text-on-critical-container',
          'ripple:bg-on-critical-container',
          'state-on-critical-container',
        ],
      },

      {
        variant: 'outlined',
        state: ['default', 'toggleable-not-selected'],
        class: [
          'text-on-surface-variant',
          ['border-outline', 'is-disabled:border-on-surface/12'],
          'ripple:bg-on-surface-variant',
          'state-on-surface-variant',
        ],
      },
      {
        variant: 'outlined',
        state: 'toggleable-selected',
        class: [
          ['bg-inverse-surface', 'is-disabled:bg-on-surface/12'],
          'text-inverse-on-surface',
          'ripple:bg-inverse-on-surface',
          'state-inverse-on-surface',
        ],
      },
    ],
  },
);

const iconVariants = cva([
  'icon-button--icon',
  'relative',
  'size-6',
  'inline-flex',
  'empty:hidden',
  '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
]);

export const iconButtonVariants = Object.assign(variants, {
  icon: iconVariants,
});

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>

export type IconButtonIconVariants = VariantProps<typeof iconButtonVariants.icon>
