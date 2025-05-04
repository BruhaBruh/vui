import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(
  [
    'card group/card',
    'transition duration-medium-1 easing-standard',
    'relative',
    'rounded-xs',
    'overflow-hidden',
    'outline-none border-transparent',
    ['ripple-wrapper:inset-0', 'ripple-wrapper:rounded-xs'],
  ],
  {
    variants: {
      variant: {
        elevated: [
          'bg-surface-container-low is-disabled:bg-surface/38',
          'text-on-surface',
          'elevation-1',
          'is-disabled:elevation-1',
          'is-disabled:bg-surface/38',
        ],
        filled: [
          'bg-surface-container-highest is-disabled:bg-surface-variant/38',
          'text-on-surface',
          'is-disabled:elevation-0',
          'is-disabled:bg-surface-variant/38',
        ],
        outlined: [
          'bg-surface',
          'text-on-surface',
          'border border-outline-variant is-disabled:border-outline/12',
          'is-disabled:elevation-0',
          'is-disabled:border-outline/12',
        ],
        none: [],
      },
      color: {
        standard: [],
        primary: [],
        secondary: [],
        info: [],
        success: [],
        caution: [],
        critical: [],
      },
      interactable: {
        true: [
          'cursor-pointer',
          'is-hovered:state-hover',
          'in-focus-visible:state-focus',
          'is-pressed:state-press',
          'is-disabled:state-transparent',
          'is-disabled:pointer-events-none',
        ],
        false: [],
      },
    },
    defaultVariants: {
      color: 'standard',
      variant: 'none',
      interactable: false,
    },
    compoundVariants: [
      {
        variant: 'elevated',
        interactable: true,
        class: [
          'is-hovered:elevation-2',
          'in-focus-visible:elevation-1',
          'is-pressed:elevation-1',
        ],
      },
      {
        variant: ['filled', 'none'],
        interactable: true,
        class: [
          'is-hovered:elevation-1',
          'in-focus-visible:elevation-0',
          'is-pressed:elevation-0',
        ],
      },
      {
        variant: 'outlined',
        interactable: true,
        class: [
          'in-focus-visible:border-on-surface',
          'is-pressed:border-outline-variant',
          'is-hovered:elevation-1',
          'in-focus-visible:elevation-0',
          'is-pressed:elevation-0',
        ],
      },
      {
        interactable: true,
        color: 'standard',
        className: ['state-on-surface', 'ripple:bg-on-surface'],
      },
      {
        interactable: true,
        color: 'primary',
        className: ['state-primary', 'ripple:bg-primary'],
      },
      {
        interactable: true,
        color: 'secondary',
        className: ['state-secondary', 'ripple:bg-secondary'],
      },
      {
        interactable: true,
        color: 'info',
        className: ['state-info', 'ripple:bg-info'],
      },
      {
        interactable: true,
        color: 'success',
        className: ['state-success', 'ripple:bg-success'],
      },
      {
        interactable: true,
        color: 'caution',
        className: ['state-caution', 'ripple:bg-caution'],
      },
      {
        interactable: true,
        color: 'critical',
        className: ['state-critical', 'ripple:bg-critical'],
      },
    ],
  },
);

export const cardVariants = Object.assign(variants, {});

export type CardVariants = VariantProps<typeof cardVariants>;
