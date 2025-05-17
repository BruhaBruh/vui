import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(
  [
    'checkbox group/checkbox',
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
    'checkbox--mark',
    'relative',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'size-4.5 rounded-xs',
    'overflow-hidden',
    'border-2',
  ],
  {
    variants: {
      color: {
        primary: [],
        secondary: [],
        info: [],
        success: [],
        caution: [],
        critical: [],
      },
      state: {
        unchecked: [
          'border-outline',
          'group-is-disabled/checkbox:border-on-surface/38',
        ],
        checked: [],
        indeterminate: [],
      },
    },
    defaultVariants: {
      color: 'primary',
      state: 'unchecked',
    },
    compoundVariants: [
      {
        state: ['checked', 'indeterminate'],
        class: [
          'border-transparent',
          'group-is-disabled/checkbox:text-surface',
          'group-is-disabled/checkbox:bg-on-surface/38',
        ],
      },
      {
        state: ['checked', 'indeterminate'],
        color: 'primary',
        class: ['bg-primary text-on-primary'],
      },
      {
        state: ['checked', 'indeterminate'],
        color: 'secondary',
        class: ['bg-secondary text-on-secondary'],
      },
      {
        state: ['checked', 'indeterminate'],
        color: 'info',
        class: ['bg-info text-on-info'],
      },
      {
        state: ['checked', 'indeterminate'],
        color: 'success',
        class: ['bg-success text-on-success'],
      },
      {
        state: ['checked', 'indeterminate'],
        color: 'caution',
        class: ['bg-caution text-on-caution'],
      },
      {
        state: ['checked', 'indeterminate'],
        color: 'critical',
        class: ['bg-critical text-on-critical'],
      },
    ],
  },
);

const iconVariants = cva([
  'checkbox--icon',
  'absolute inline-block size-4',
  'transition easing-standard duration-short-2',
]);

export const checkboxVariants = Object.assign(variants, {
  mark: markVariants,
  icon: iconVariants,
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export type CheckboxMarkVariants = VariantProps<typeof checkboxVariants.mark>;

export type CheckboxIconVariants = VariantProps<typeof checkboxVariants.icon>;
