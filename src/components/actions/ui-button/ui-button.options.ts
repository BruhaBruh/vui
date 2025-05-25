import type { ButtonVariants } from './ui-button.variants';

export const buttonBorderRadius = {
  rounded: {
    xs: 'var(--spacing-4)',
    sm: 'var(--spacing-5)',
    md: 'var(--spacing-7)',
    lg: 'var(--spacing-12)',
    xl: 'var(--spacing-17)',
  },
  square: {
    xs: 'var(--radius-md)',
    sm: 'var(--radius-md)',
    md: 'var(--radius-lg)',
    lg: 'var(--radius-xl)',
    xl: 'var(--radius-xl)',
  },
} satisfies Record<
  NonNullable<ButtonVariants['shape']>,
  Record<NonNullable<ButtonVariants['size']>, string>
>;

export const buttonBorderRadiusAlt = {
  rounded: buttonBorderRadius.square,
  square: buttonBorderRadius.rounded,
} satisfies Record<
  NonNullable<ButtonVariants['shape']>,
  Record<NonNullable<ButtonVariants['size']>, string>
>;

export const buttonIconSize = {
  xs: 'var(--spacing-5)',
  sm: 'var(--spacing-5)',
  md: 'var(--spacing-6)',
  lg: 'var(--spacing-8)',
  xl: 'var(--spacing-10)',
} satisfies Record<NonNullable<ButtonVariants['size']>, string>;


export const buttonIconMargin = {
  xs: 'var(--spacing-1)',
  sm: 'var(--spacing-2)',
  md: 'var(--spacing-2)',
  lg: 'var(--spacing-3)',
  xl: 'var(--spacing-4)',
} satisfies Record<NonNullable<ButtonVariants['size']>, string>;
