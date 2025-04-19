import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(['number-field group/number-field']);

const spinButtonVariants = cva([
  'number-field--spin-button',
  'px-2xs rounded-3xs',
  'transition easing-standard duration-medium-1',
  'state-on-surface-variant',
  'hover:state-hover',
  'active:state-press',
  'group-is-disabled/number-field:state-transparent',
  '[&>*]:size-4',
]);

export const numberFieldVariants = Object.assign(variants, {
  spinButton: spinButtonVariants,
});

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>;

export type NumberFieldSpinButtonVariants = VariantProps<
  typeof numberFieldVariants.spinButton
>;
