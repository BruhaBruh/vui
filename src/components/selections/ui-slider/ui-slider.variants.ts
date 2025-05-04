import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva([
  'slider group/slider',
  'inline-flex items-center',
  'h-12',
  'relative',
  'touch-none select-none',
]);

const thumbVariants = cva(
  [
    'slider--thumb',
    'inline-flex items-center justify-between',
    ['transition easing-standard duration-medium-1'],
    'h-11',
    'rounded-full',
    'absolute',
    '-translate-x-1/2',
    ['group-is-disabled/slider:bg-on-surface/38'],
  ],
  {
    variants: {
      color: {
        standard: 'bg-primary',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        info: 'bg-info',
        success: 'bg-success',
        caution: 'bg-caution',
        critical: 'bg-critical',
      },
      isDragging: {
        true: 'w-0.5',
        false: 'w-1',
      },
    },
    defaultVariants: {
      color: 'standard',
      isDragging: false,
    },
  },
);

const trackVariants = cva(
  [
    'slider--track',
    'absolute',
    'h-4',
    'inline-flex items-center',
    'overflow-hidden',
    'transition easing-standard duration-medium-1',
    'before:absolute',
    'before:h-full',
    'before:w-(--ui-slider-before-width)',
  ],
  {
    variants: {
      position: {
        left: [
          'before:rounded-l-3xl rounded-r-3xs before:left-0',
          [
            'after:absolute',
            'after:left-1.5',
            'after:size-1',
            'after:rounded-full',
          ],
        ],
        center: ['rounded-3xs'],
        right: [
          'rounded-l-3xs before:rounded-r-3xl before:right-0',
          [
            'after:absolute',
            'after:right-1.5',
            'after:size-1',
            'after:rounded-full',
          ],
        ],
      },
    },
    defaultVariants: {
      position: 'center',
    },
  },
);

const activeTrackVariants = cva(
  ['slider--active-track', 'group-is-disabled/slider:before:bg-on-surface/38'],
  {
    variants: {
      color: {
        standard: 'before:bg-primary',
        primary: 'before:bg-primary',
        secondary: 'before:bg-secondary',
        info: 'before:bg-info',
        success: 'before:bg-success',
        caution: 'before:bg-caution',
        critical: 'before:bg-critical',
      },
    },
    defaultVariants: {
      color: 'standard',
    },
  },
);

const inactiveTrackVariants = cva(
  [
    'slider--inactive-track',
    'group-is-disabled/slider:before:bg-on-surface/12',
    'group-is-disabled/slider:after:bg-on-surface/38',
  ],
  {
    variants: {
      color: {
        standard: ['before:bg-secondary-container', 'after:bg-primary'],
        primary: ['before:bg-primary-container', 'after:bg-primary'],
        secondary: ['before:bg-secondary-container', 'after:bg-secondary'],
        info: ['before:bg-info-container', 'after:bg-info'],
        success: ['before:bg-success-container', 'after:bg-success'],
        caution: ['before:bg-caution-container', 'after:bg-caution'],
        critical: ['before:bg-critical-container', 'after:bg-critical'],
      },
    },
    defaultVariants: {
      color: 'standard',
    },
  },
);

const tooltipVariants = cva(
  [
    'slider--tooltip',
    'px-4 py-3',
    'bg-inverse-surface',
    'typography-label-large text-inverse-on-surface',
    'rounded-full',
    'z-20',
  ],
  {
    variants: {
      placement: {
        top: ['origin-bottom'],
        right: ['origin-left'],
        bottom: ['origin-top'],
        left: ['origin-right'],
      },
    },
  },
);

export const sliderVariants = Object.assign(variants, {
  thumb: thumbVariants,
  track: trackVariants,
  activeTrack: activeTrackVariants,
  inactiveTrack: inactiveTrackVariants,
  tooltip: tooltipVariants,
});

export type SliderVariants = VariantProps<typeof sliderVariants>;

export type SliderThumbVariants = VariantProps<typeof sliderVariants.thumb>;

export type SliderTrackVariants = VariantProps<typeof sliderVariants.track>;

export type SliderActiveTrackVariants = VariantProps<
  typeof sliderVariants.activeTrack
>;

export type SliderInactiveTrackVariants = VariantProps<
  typeof sliderVariants.inactiveTrack
>;

export type SliderTooltipVariants = VariantProps<typeof sliderVariants.tooltip>;
