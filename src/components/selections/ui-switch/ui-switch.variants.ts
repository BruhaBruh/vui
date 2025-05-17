import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(
  [
    'switch group/switch',
    'relative',
    'inline-flex items-center',
    'transition easing-standard duration-medium-1',
    'border-2',
    'h-8 w-13 rounded-full',
    'is-disabled:pointer-events-none',
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
      isSelected: {
        true: [
          'border-transparent',
          'bg-surface-container-highest',
          'is-disabled:bg-on-surface/12',
          'is-disabled:text-on-surface/38',
        ],
        false: [
          'border-outline',
          'is-disabled:border-outline/12',
          'text-surface',
        ],
      },
    },
    defaultVariants: {
      color: 'primary',
      isSelected: false,
    },
    compoundVariants: [
      {
        isSelected: true,
        color: 'primary',
        class: ['bg-primary text-on-primary-container'],
      },
      {
        isSelected: true,
        color: 'secondary',
        class: ['bg-secondary text-on-secondary-container'],
      },
      {
        isSelected: true,
        color: 'info',
        class: ['bg-info text-on-info-container'],
      },
      {
        isSelected: true,
        color: 'success',
        class: ['bg-success text-on-success-container'],
      },
      {
        isSelected: true,
        color: 'caution',
        class: ['bg-caution text-on-caution-container'],
      },
      {
        isSelected: true,
        color: 'critical',
        class: ['bg-critical text-on-critical-container'],
      },
    ],
  },
);

const thumbWrapperVariants = cva(
  [
    'switch--thumb-wrapper',
    'absolute',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'size-10 rounded-full',
    'group-is-disabled/switch:state-transparent',
    'group-is-hovered/switch:state-hover',
    'group-in-focus-within/switch:state-focus',
    'group-is-pressed/switch:state-press',
  ],
  {
    variants: {
      color: {
        primary: ['state-primary'],
        secondary: ['state-secondary'],
        info: ['state-info'],
        success: ['state-success'],
        caution: ['state-caution'],
        critical: ['state-critical'],
      },
      isSelected: {
        true: ['translate-x-3.5'],
        false: ['-translate-x-1.5'],
      },
    },
    defaultVariants: {
      color: 'primary',
      isSelected: false,
    },
  },
);

const thumbVariants = cva(
  [
    'switch--thumb',
    'relative',
    'inline-flex items-center justify-center',
    'transition easing-standard duration-medium-1',
    'bg-outline',
    'rounded-full group-is-pressed/switch:size-7',
  ],
  {
    variants: {
      size: {
        default: [],
        icon: ['size-6'],
      },
      color: {
        primary: {},
        secondary: {},
        info: {},
        success: {},
        caution: {},
        critical: {},
      },
      isSelected: {
        true: ['group-is-disabled/switch:bg-surface'],
        false: [
          'group-is-hovered/switch:bg-on-surface-variant',
          'group-is-pressed/switch:bg-on-surface-variant',
          'group-in-focus-within/switch:bg-on-surface-variant',
          'group-is-disabled/switch:bg-on-surface/38',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
      isSelected: false,
    },
    compoundVariants: [
      {
        isSelected: false,
        size: 'default',
        class: 'size-4',
      },
      {
        isSelected: true,
        size: 'default',
        class: 'size-6',
      },
      {
        isSelected: true,
        color: 'primary',
        class: [
          'bg-on-primary',
          'group-is-hovered/switch:bg-primary-container',
          'group-is-pressed/switch:bg-primary-container',
          'group-in-focus-within/switch:bg-primary-container',
          'group-is-hovered/switch:text-on-primary-container',
        ],
      },
      {
        isSelected: true,
        color: 'secondary',
        class: [
          'bg-on-secondary',
          'group-is-hovered/switch:bg-secondary-container',
          'group-is-pressed/switch:bg-secondary-container',
          'group-in-focus-within/switch:bg-secondary-container',
          'group-is-hovered/switch:text-on-secondary-container',
        ],
      },
      {
        isSelected: true,
        color: 'info',
        class: [
          'bg-on-info',
          'group-is-hovered/switch:bg-info-container',
          'group-is-pressed/switch:bg-info-container',
          'group-in-focus-within/switch:bg-info-container',
          'group-is-hovered/switch:text-on-info-container',
        ],
      },
      {
        isSelected: true,
        color: 'success',
        class: [
          'bg-on-success',
          'group-is-hovered/switch:bg-success-container',
          'group-is-pressed/switch:bg-success-container',
          'group-in-focus-within/switch:bg-success-container',
          'group-is-hovered/switch:text-on-success-container',
        ],
      },
      {
        isSelected: true,
        color: 'caution',
        class: [
          'bg-on-caution',
          'group-is-hovered/switch:bg-caution-container',
          'group-is-pressed/switch:bg-caution-container',
          'group-in-focus-within/switch:bg-caution-container',
          'group-is-hovered/switch:text-on-caution-container',
        ],
      },
      {
        isSelected: true,
        color: 'critical',
        class: [
          'bg-on-critical',
          'group-is-hovered/switch:bg-critical-container',
          'group-is-pressed/switch:bg-critical-container',
          'group-in-focus-within/switch:bg-critical-container',
          'group-is-hovered/switch:text-on-critical-container',
        ],
      },
    ],
  },
);

const iconVariants = cva([
  'switch--icon',
  'relative inline-block',
  'size-4',
  'transition easing-standard duration-short-2',
]);

export const switchVariants = Object.assign(variants, {
  thumbWrapper: thumbWrapperVariants,
  thumb: thumbVariants,
  icon: iconVariants,
});

export type SwitchVariants = VariantProps<typeof switchVariants>;

export type SwitchThumbWrapperVariants = VariantProps<
  typeof switchVariants.thumbWrapper
>;

export type SwitchThumbVariants = VariantProps<typeof switchVariants.thumb>;

export type SwitchIconVariants = VariantProps<typeof switchVariants.icon>;
