import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva([
  'dialog group/dialog',
  'min-w-72 max-w-72 sm:max-w-[calc(var(--spacing-96)+var(--spacing-44))]',
  'inline-flex flex-col',
  'p-lg',
  'rounded-xl',
  'bg-surface-container-high text-on-surface',
  'elevation-3',
]);

const iconVariants = cva([
  'dialog--icon',
  'text-secondary',
  'size-6',
  'relative inline-block',
  'overflow-hidden',
  '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
  'mx-auto mb-md last:mb-0',
]);

const subheadVariants = cva([
  'dialog--subhead',
  'text-center typography-headline-small text-on-surface',
  'mb-md last:mb-0',
]);

const textVariants = cva([
  'dialog--text',
  'typography-body-medium text-on-surface-variant',
]);

const dividerVariants = cva(['dialog--divider first:mt-0 last:mb-0'], {
  variants: {
    spacing: {
      top: 'mt-md',
      bottom: 'mb-md',
      both: 'my-md',
      none: '',
    },
  },
  defaultVariants: {
    spacing: 'none',
  },
});

const actionsVariants = cva([
  'dialog--actions',
  'inline-flex items-center justify-end gap-sm',
  'mt-lg first:mt-0',
]);

export const dialogVariants = Object.assign(variants, {
  icon: iconVariants,
  subhead: subheadVariants,
  text: textVariants,
  divider: dividerVariants,
  actions: actionsVariants,
});

export type DialogVariants = VariantProps<typeof dialogVariants>;

export type DialogIconVariants = VariantProps<typeof dialogVariants.icon>;

export type DialogSubheadVariants = VariantProps<typeof dialogVariants.subhead>;

export type DialogTextVariants = VariantProps<typeof dialogVariants.text>;

export type DialogDividerVariants = VariantProps<typeof dialogVariants.divider>;

export type DialogActionsVariants = VariantProps<typeof dialogVariants.actions>;
