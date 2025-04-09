import { cva } from 'class-variance-authority';

const variants = cva(['breadcrumbs group/breadcrumbs', 'flex items-baseline'], {
  variants: {
    size: {
      lg: ['gap-xs'],
      md: ['gap-2xs'],
      sm: ['gap-2xs'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const itemVariants = cva(
  [
    'breadcrumbs--item',
    'text-on-surface',
    'transition easing-standard duration-medium-1',
    'select-none',
  ],
  {
    variants: {
      isActive: {
        true: ['text-on-surface'],
        false: ['text-on-surface-variant hover:text-primary cursor-pointer'],
      },
      size: {
        lg: ['typography-title-large'],
        md: ['typography-body-large font-medium'],
        sm: ['typography-label-large font-semibold'],
      },
    },
    defaultVariants: {
      isActive: false,
      size: 'md',
    },
  },
);

const iconVariants = cva(['breadcrumbs--icon', 'text-on-surface-variant'], {
  variants: {
    size: {
      lg: ['size-6', 'translate-y-[calc(var(--spacing-1)+var(--spacing-0q))]'],
      md: ['size-5', 'translate-y-[calc(var(--spacing-1)+var(--spacing-0e))]'],
      sm: ['size-4', 'translate-y-0.75'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const breadcrumbsVariants = Object.assign(variants, {
  item: itemVariants,
  icon: iconVariants,
});
