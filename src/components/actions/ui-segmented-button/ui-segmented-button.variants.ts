import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const groupVariants = cva(
  [
    'segmented-button-group group/segmented-button-group',
    'inline-grid auto-cols-fr grid-flow-col',
    [
      '[&>*:first-child]:ml-0 [&>*]:-ml-0.25',
      '[&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full',
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
    [
      'inline-flex items-center justify-center',
      'relative',
      'overflow-hidden',
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
    'is-disabled:bg-transparent',
    ['border outline-none border-outline', 'is-disabled:border-on-surface/38'],
    ['typography-label-large', 'is-disabled:text-on-surface/38'],
    'px-sm',
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
        false: ['text-on-surface', 'state-on-surface'],
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
        class: ['bg-primary-container', 'text-on-primary-container'],
      },
      {
        color: 'secondary',
        isSelected: true,
        class: ['bg-secondary-container', 'text-on-secondary-container'],
      },
      {
        color: 'info',
        isSelected: true,
        class: ['bg-info-container', 'text-on-info-container'],
      },
      {
        color: 'success',
        isSelected: true,
        class: ['bg-success-container', 'text-on-success-container'],
      },
      {
        color: 'caution',
        isSelected: true,
        class: ['bg-caution-container', 'text-on-caution-container'],
      },
      {
        color: 'critical',
        isSelected: true,
        class: ['bg-critical-container', 'text-on-critical-container'],
      },
    ],
  },
);

const labelVariants = cva([
  'segmented-button--label group/segmented-button--label',
  '[&>svg]:size-4.5 px-2xs',
]);

const iconVariants = cva([
  'segmented-button--icon group/segmented-button--icon',
  'size-4.5 mr-2xs',
]);

export const segmentedButtonVariants = Object.assign(variants, {
  group: groupVariants,
  label: labelVariants,
  icon: iconVariants,
});

export type SegmentedButtonVariants = Variants<typeof segmentedButtonVariants>;

export type SegmentedButtonLabelVariants = Variants<
  typeof segmentedButtonVariants.label
>;

export type SegmentedButtonIconVariants = Variants<
  typeof segmentedButtonVariants.icon
>;

export type SegmentedButtonGroupVariants = Variants<
  typeof segmentedButtonVariants.group
>;
