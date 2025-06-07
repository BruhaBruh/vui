import { cva } from 'class-variance-authority';

const variants = cva([
  'grid border border-outline rounded-lg bg-surface text-on-surface overflow-hidden',
]);

const rowVariants = cva([
  'grid',
  'border-outline border-b last:border-b-0',
  'odd:bg-surface-container first:rounded-t-lg last:rounded-b-lg overflow-hidden',
]);

const cellVariants = cva([
  'group/cell',
  'min-h-10 px-2',
  'inline-flex items-center justify-between gap-2',
  'border-outline border-r last:border-r-0',
  'typography-body-large',
]);

const headerVariants = cva(['font-semibold text-on-surface-variant']);

const sortButtonVariants = cva([], {
  variants: {
    visible: {
      true: ['opacity-100'],
      false: ['opacity-0', 'group-hover/cell:opacity-100 hover:opacity-100'],
    },
  },
  defaultVariants: {
    visible: false,
  },
});

const labelVariants = cva(['truncate']);

export const gridVariants = Object.assign(variants, {
  row: rowVariants,
  cell: cellVariants,
  header: headerVariants,
  sortButton: sortButtonVariants,
  label: labelVariants,
});
