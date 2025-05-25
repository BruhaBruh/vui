import type { IconButtonVariants } from './ui-icon-button.variants';

export const iconButtonWidth = {
  xs: {
    default: 'var(--spacing-8)',
    narrow: 'var(--spacing-7)',
    wide: 'var(--spacing-10)',
  },
  sm: {
    default: 'var(--spacing-10)',
    narrow: 'var(--spacing-8)',
    wide: 'var(--spacing-13)',
  },
  md: {
    default: 'var(--spacing-14)',
    narrow: 'var(--spacing-12)',
    wide: 'var(--spacing-18)',
  },
  lg: {
    default: 'var(--spacing-24)',
    narrow: 'var(--spacing-16)',
    wide: 'var(--spacing-32)',
  },
  xl: {
    default: 'var(--spacing-34)',
    narrow: 'var(--spacing-26)',
    wide: 'var(--spacing-46)',
  },
} satisfies Record<
  NonNullable<IconButtonVariants['size']>,
  Record<NonNullable<IconButtonVariants['width']>, string>
>;

export const iconButtonBorderRadius = {
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
  NonNullable<IconButtonVariants['shape']>,
  Record<NonNullable<IconButtonVariants['size']>, string>
>;

export const iconButtonBorderRadiusAlt = {
  rounded: iconButtonBorderRadius.square,
  square: iconButtonBorderRadius.rounded,
} satisfies Record<
  NonNullable<IconButtonVariants['shape']>,
  Record<NonNullable<IconButtonVariants['size']>, string>
>;

export const iconButtonIconSize = {
  xs: 'var(--spacing-5)',
  sm: 'var(--spacing-5)',
  md: 'var(--spacing-6)',
  lg: 'var(--spacing-8)',
  xl: 'var(--spacing-10)',
} satisfies Record<NonNullable<IconButtonVariants['size']>, string>;
