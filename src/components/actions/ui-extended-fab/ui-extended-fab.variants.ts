import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'extended-fab group/extended-fab',
    'cursor-pointer',
    'relative',
    'h-14 rounded-md p-md',
    'outline-none border-transparent',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'overflow-hidden whitespace-nowrap',
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
      hasText: {
        true: 'min-w-20',
        false: 'min-w-14',
      },
    },
    defaultVariants: {
      color: 'surface',
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

const iconVariants = cva([
  'extended-fab--icon',
  'relative size-6',
  'inline-flex items-center justify-center',
  'overflow-hidden empty:hidden',
  '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
]);

const labelVariants = cva([
  'extended-fab--label',
  'relative',
  'inline-flex',
  'w-max px-2xs',
  'typography-label-large truncate',
  'overflow-hidden empty:hidden',
]);

export const extendedFabVariants = Object.assign(variants, {
  icon: iconVariants,
  label: labelVariants,
});
