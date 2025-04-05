import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'fab group/fab',
    'cursor-pointer',
    'relative',
    'outline-none border-transparent',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'whitespace-nowrap',
    [
      'is-disabled:state-transparent',
      'is-disabled:pointer-events-none',
      'is-hovered:state-hover',
      'in-focus-visible:state-focus',
      'is-pressed:state-press',
    ],
    ['ripple-wrapper:inset-0'],
  ],
  {
    variants: {
      color: {
        surface: ['text-primary', 'ripple:bg-primary', 'state-primary'],
        primary: [
          'bg-primary-container',
          'text-on-primary-container',
          'ripple:bg-on-primary-container',
          'state-on-primary-container',
        ],
        secondary: [
          'bg-secondary-container',
          'text-on-secondary-container',
          'ripple:bg-on-secondary-container',
          'state-on-secondary-container',
        ],
        info: [
          'bg-info-container',
          'text-on-info-container',
          'ripple:bg-on-info-container',
          'state-on-info-container',
        ],
        success: [
          'bg-success-container',
          'text-on-success-container',
          'ripple:bg-on-success-container',
          'state-on-success-container',
        ],
        caution: [
          'bg-caution-container',
          'text-on-caution-container',
          'ripple:bg-on-caution-container',
          'state-on-caution-container',
        ],
        critical: [
          'bg-critical-container',
          'text-on-critical-container',
          'ripple:bg-on-critical-container',
          'state-on-critical-container',
        ],
      },
      size: {
        sm: ['size-10 rounded-xs', 'ripple-wrapper:rounded-xs'],
        md: ['size-14 rounded-md p-md', 'ripple-wrapper:rounded-md'],
        lg: ['size-24 rounded-2xl p-md', 'ripple-wrapper:rounded-2xl'],
      },
      lowered: {
        true: [
          'elevation-1',
          'is-hovered:elevation-2',
          'in-focus-visible:elevation-1',
          'is-pressed:elevation-1',
        ],
        false: [
          'elevation-3',
          'is-hovered:elevation-4',
          'in-focus-visible:elevation-3',
          'is-pressed:elevation-3',
        ],
      },
    },
    defaultVariants: {
      color: 'surface',
      size: 'md',
      lowered: false,
    },
    compoundVariants: [
      {
        color: 'surface',
        lowered: true,
        class: 'bg-surface-container-low',
      },
      {
        color: 'surface',
        lowered: false,
        class: 'bg-surface-container-high',
      },
    ],
  },
);

const iconVariants = cva(
  [
    [
      'fab--icon',
      'relative',
      'inline-flex items-center justify-center',
      'empty:hidden',
      '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
    ],
  ],
  {
    variants: {
      size: {
        sm: ['size-6'],
        md: ['size-6'],
        lg: ['size-9'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const fabVariants = Object.assign(variants, {
  icon: iconVariants,
});
