import type { ExtendedFabVariants } from './ui-extended-fab.variants';

export const extendedFabIconSize = {
  sm: 'var(--spacing-6)',
  md: 'var(--spacing-7)',
  lg: 'var(--spacing-9)',
} satisfies Record<NonNullable<ExtendedFabVariants['size']>, string>;

export const extendedFabIconMargin = {
  sm: 'var(--spacing-2)',
  md: 'var(--spacing-3)',
  lg: 'var(--spacing-4)',
} satisfies Record<NonNullable<ExtendedFabVariants['size']>, string>;
