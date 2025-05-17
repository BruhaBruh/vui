import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva([
  'menu group/menu',
  'relative',
  'bg-surface-container',
  'elevation-2',
  'rounded-xs',
  'py-xs',
  'overflow-y-auto overflow-x-hidden',
  'inline-grid min-w-28 max-w-72',
]);

const listVariants = cva(['menu--list', 'relative', 'inline-grid w-full'], {
  variants: {
    withScroll: {
      true: 'overflow-y-auto overflow-x-hidden',
      false: 'overflow-hidden',
    },
  },
  defaultVariants: {
    withScroll: false,
  },
});

const itemVariants = cva(
  [
    'menu--item group/menu--item',
    'relative',
    'outline-none border-transparent',
    'overflow-hidden',
    'inline-flex items-center',
    ['typography-label-large', 'is-disabled:text-on-surface/38'],
    'h-12',
    'px-sm',
    'transition easing-standard duration-medium-1',
    [
      'is-disabled:state-transparent',
      'is-disabled:pointer-events-none',
      'is-hovered:state-hover',
      'in-focus-visible:state-focus',
      'is-pressed:state-press',
    ],
    'ripple-wrapper:inset-0',
    'cursor-pointer select-none touch-pan-y touch-pan-x touch-pinch-zoom',
  ],
  {
    variants: {
      isSelected: {
        true: [
          ['bg-primary-container', 'is-disabled:bg-on-surface/8'],
          'text-on-primary-container',
          'state-on-primary-container',
          'ripple:bg-on-primary-container',
        ],
        false: ['text-on-surface', 'state-on-surface', 'ripple:bg-primary'],
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

const dividerVariants = cva(['menu--divider', 'my-xs first:mt-0 last:mb-0']);

const iconVariants = cva(
  [
    'menu--icon',
    [
      'text-on-surface-variant',
      'group-data-[is-selected=true]/menu--item:text-on-primary-container',
      'group-is-disabled/menu--item:text-on-surface/38',
    ],
    'relative inline-block',
    'size-6',
  ],
  {
    variants: {
      position: {
        left: 'mr-sm',
        right: 'ml-sm',
      },
    },
  },
);

const labelVariants = cva([
  'menu--label',
  'inline-flex flex-1 items-center',
  'min-w-16',
]);

export const menuVariants = Object.assign(variants, {
  list: listVariants,
  item: itemVariants,
  divider: dividerVariants,
  icon: iconVariants,
  label: labelVariants,
});

export type MenuVariants = Variants<typeof menuVariants>;

export type MenuListVariants = Variants<typeof menuVariants.list>;

export type MenuItemVariants = Variants<typeof menuVariants.item>;

export type MenuDividerVariants = Variants<typeof menuVariants.divider>;

export type MenuIconVariants = Variants<typeof menuVariants.icon>;

export type MenuLabelVariants = Variants<typeof menuVariants.label>;
