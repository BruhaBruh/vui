import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(
  ['tooltip group/tooltip', 'overflow-hidden', 'relative', 'z-20'],
  {
    variants: {
      placement: {
        'top-left': ['origin-bottom-right'],
        top: ['origin-bottom'],
        'top-right': ['origin-bottom-left'],
        right: ['origin-left'],
        'bottom-right': ['origin-top-left'],
        bottom: ['origin-top'],
        'bottom-left': ['origin-top-right'],
        left: ['origin-right'],
      },
      variant: {
        plain: [
          'max-w-48',
          'bg-inverse-surface',
          'inline-flex items-center',
          'px-xs py-2xs',
          'rounded-3xs',
          'select-none',
        ],
        rich: [
          'max-w-80',
          'bg-surface-container',
          'inline-flex flex-col',
          'px-md pb-xs pt-sm',
          'elevation-2',
          'rounded-sm',
        ],
      },
    },
    defaultVariants: {
      variant: 'plain',
      placement: 'top',
    },
  },
);

const subheadVariants = cva([
  'tooltip--subhead',
  'text-balance typography-title-small text-on-surface-variant',
  'mb-2xs',
]);

const textVariants = cva(['tooltip--text'], {
  variants: {
    variant: {
      plain: 'typography-body-small text-inverse-on-surface',
      rich: 'typography-body-medium text-on-surface-variant',
    },
  },
  defaultVariants: {
    variant: 'plain',
  },
});

const actionsVariants = cva([
  'tooltip--actions',
  'items-centeer inline-flex gap-xs',
  'mt-sm',
]);

export const tooltipVariants = Object.assign(variants, {
  text: textVariants,
  subhead: subheadVariants,
  actions: actionsVariants,
});

export type TooltipVariants = VariantProps<typeof tooltipVariants>;

export type TooltipTextVariants = VariantProps<typeof textVariants>;

export type TooltipSubheadVariants = VariantProps<typeof subheadVariants>;

export type TooltipActionsVariants = VariantProps<typeof actionsVariants>;
