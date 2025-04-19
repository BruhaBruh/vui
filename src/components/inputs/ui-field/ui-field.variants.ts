import { type VariantProps, cva } from 'class-variance-authority';

const variants = cva(['field group/field', 'inline-grid gap-2xs']);

const inputVariants = cva(
  [
    'field--input',
    'relative',
    'w-full',
    'inline-flex items-center justify-between',
    'transition easing-standard duration-medium-1',
    'border-2 border-transparent outline-none',
    'overflow-hidden',
    'bg-surface-container group-is-disabled/field:bg-on-surface/8',
    'whitespace-nowrap text-on-surface',
    'state-primary',
    'group-is-disabled/field:state-transparent',
    'group-is-disabled/field:pointer-events-none',
    'group-is-hovered/field:state-hover',
    'group-in-focus-within/field:border-primary',
    'group-[[data-invalid="true"]]/field:state-critical',
    'group-[[data-invalid="true"]]/field:border-critical',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-10 rounded-xs px-xs',
        md: 'min-h-12 rounded-sm px-sm',
        lg: 'min-h-14 rounded-md px-md',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

const inputContentVariants = cva([
  'field--input-content',
  'relative',
  'flex-1 inline-flex flex-col justify-center',
  'transition easing-standard duration-medium-1',
  'overflow-hidden',
  'whitespace-nowrap typography-body-large',
]);

const inputFieldVariants = cva([
  'field--input-field',
  'typography-body-large',
  'text-on-surface group-is-disabled/field:text-on-surface/38',
  'placeholder:text-outline group-is-disabled/field:placeholder:text-on-surface/38',
  'transition easing-standard duration-medium-1',
  'outline-0! overflow-hidden',
  'appearance-none [-moz-appearance:textfield]',
]);

const labelVariants = cva([
  'field--label',
  'transition easing-standard duration-medium-1',
  'select-none',
  'typography-label-medium truncate',
  'text-on-surface-variant',
  'group-[[data-invalid="true"]]/field:text-critical',
  'group-is-disabled/field:text-on-surface/38',
  'group-[[data-invalid="true"]]/field:group-is-disabled/field:text-on-surface/38',
]);

const descriptionVariants = cva(
  [
    'field--description',
    'typography-body-small text-on-surface-variant',
    'transition easing-standard duration-medium-1',
    'inline-flex items-center justify-between',
  ],
  {
    variants: {
      size: {
        sm: 'px-xs gap-xs',
        md: 'px-sm gap-sm',
        lg: 'px-md gap-md',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

const errorVariants = cva(
  [
    'field--error',
    'typography-body-small text-critical',
    'transition easing-standard duration-medium-1',
    'inline-flex items-center justify-between',
  ],
  {
    variants: {
      size: {
        sm: 'px-xs gap-xs',
        md: 'px-sm gap-sm',
        lg: 'px-md gap-md',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

const iconVariants = cva(
  [
    'field--icon',
    'text-on-surface-variant group-is-disabled/field:text-on-surface/38',
    'relative inline-block',
    '[&>*]:absolute [&>*]:inset-0 [&>*]:size-full',
  ],
  {
    variants: {
      size: {
        sm: 'size-4.5',
        md: 'size-4',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

export const fieldVariants = Object.assign(variants, {
  input: inputVariants,
  inputContent: inputContentVariants,
  inputField: inputFieldVariants,
  label: labelVariants,
  description: descriptionVariants,
  error: errorVariants,
  icon: iconVariants,
});

export type FieldVariants = VariantProps<typeof fieldVariants>;

export type FieldInputVariants = VariantProps<typeof fieldVariants.input>;

export type FieldInputContentVariants = VariantProps<
  typeof fieldVariants.inputContent
>;

export type FieldInputFieldVariants = VariantProps<
  typeof fieldVariants.inputField
>;

export type FieldLabelVariants = VariantProps<typeof fieldVariants.label>;

export type FieldDescriptionVariants = VariantProps<
  typeof fieldVariants.description
>;

export type FieldErrorVariants = VariantProps<typeof fieldVariants.error>;

export type FieldIconVariants = VariantProps<typeof fieldVariants.icon>;
