import { cva } from 'class-variance-authority';

const groupVariants = cva(
  [
    'segmented-button-group group/segmented-button-group',
    'inline-grid auto-cols-fr grid-flow-col',
    [
      '[&>*:first-child]:ml-0 [&>*]:-ml-0.25',
      '[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md',
    ],
  ],
  {
    variants: {
      density: {
        0: 'h-10',
        [-1]: 'h-9',
        [-2]: 'h-8',
        [-3]: 'h-7',
      },
    },
    defaultVariants: {
      density: 0,
    },
  },
);

const variants = cva(
  [
    'segmented-button segmented-button-group--button group/segmented-button',
    'relative',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'is-disabled:bg-transparent',
    ['border outline-none border-outline', 'is-disabled:border-on-surface/38'],
    ['typography-label-large', 'is-disabled:text-on-surface/38'],
    'px-sm',
    'overflow-hidden',
    [
      'cursor-pointer',
      'is-disabled:state-transparent',
      'is-disabled:pointer-events-none',
      'is-hovered:state-hover',
      'in-focus-visible:state-focus',
      'is-pressed:state-press',
    ],
    'ripple-wrapper:-inset-0.25',
  ],
  {
    variants: {
      color: {
        primary: {},
        secondary: {},
        info: {},
        success: {},
        caution: {},
        critical: {},
      },
      isSelected: {
        true: {},
        false: ['text-on-surface', 'state-on-surface', 'ripple:bg-on-surface'],
      },
    },
    defaultVariants: {
      isSelected: false,
      color: 'primary',
    },
    compoundVariants: [
      {
        color: 'primary',
        isSelected: true,
        class: [
          'bg-primary-container',
          'text-on-primary-container',
          'state-on-primary-container',
          'ripple:bg-on-primary-container',
        ],
      },
      {
        color: 'secondary',
        isSelected: true,
        class: [
          'bg-secondary-container',
          'text-on-secondary-container',
          'state-on-secondary-container',
          'ripple:bg-on-secondary-container',
        ],
      },
      {
        color: 'info',
        isSelected: true,
        class: [
          'bg-info-container',
          'text-on-info-container',
          'state-on-info-container',
          'ripple:bg-on-info-container',
        ],
      },
      {
        color: 'success',
        isSelected: true,
        class: [
          'bg-success-container',
          'text-on-success-container',
          'state-on-success-container',
          'ripple:bg-on-success-container',
        ],
      },
      {
        color: 'caution',
        isSelected: true,
        class: [
          'bg-caution-container',
          'text-on-caution-container',
          'state-on-caution-container',
          'ripple:bg-on-caution-container',
        ],
      },
      {
        color: 'critical',
        isSelected: true,
        class: [
          'bg-critical-container',
          'text-on-critical-container',
          'state-on-critical-container',
          'ripple:bg-on-critical-container',
        ],
      },
    ],
  },
);

const labelVariants = cva([
  'segmented-button--label group/segmented-button--label',
  'px-2xs',
  '[&>svg]:size-4.5',
]);

const iconVariants = cva([
  'segmented-button--icon group/segmented-button--icon',
  'relative inline-block',
  'size-4.5 mr-2xs',
  'overflow-hidden',
  '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
]);

export const segmentedButtonVariants = Object.assign(variants, {
  group: groupVariants,
  label: labelVariants,
  icon: iconVariants,
});
