import type { Placement } from '@floating-ui/vue';
import type { TooltipVariants } from './ui-tooltip.variants';

const variantToFloating = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  'top-left': 'top-start',
  'top-right': 'top-end',
  'bottom-left': 'bottom-start',
  'bottom-right': 'bottom-end',
} satisfies Record<NonNullable<TooltipVariants['placement']>, Placement>;

export const variantPlacementToFloatingPlacement = (
  placement: TooltipVariants['placement'],
): Placement => {
  if (!placement) return 'top';
  return variantToFloating[placement] ?? 'top';
};

export const floatingPlacementToVariantPlacement = (
  placement: Placement,
): NonNullable<TooltipVariants['placement']> => {
  const foundedVariant = Object.entries(variantToFloating).find(
    (v) => v[1] === placement,
  ) as [NonNullable<TooltipVariants['placement']>, Placement] | undefined;
  return foundedVariant?.[0] ?? 'top';
};
