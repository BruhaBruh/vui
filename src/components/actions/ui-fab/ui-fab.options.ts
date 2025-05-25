import type { FabVariants } from './ui-fab.variants';

export const fabIconSize = {
  sm: 'var(--spacing-6)',
  md: 'var(--spacing-7)',
  lg: 'var(--spacing-9)',
} satisfies Record<NonNullable<FabVariants['size']>, string>;
