import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'navigation-rail group/navigation-rail @container/navigation-rail',
    'text-on-surface',
    'transition easing-standard duration-medium-1',
    'py-11',
    'overflow-hidden',
    'inline-flex flex-col items-stretch gap-10',
  ],
  {
    variants: {
      modal: {
        true: ['bg-surface-container elevation-2 rounded-lg'],
        false: ['bg-surface'],
      },
      expanded: {
        true: ['min-w-55 max-w-90'],
        false: ['w-24'],
      },
    },
    defaultVariants: {
      modal: false,
      expanded: false,
    },
  },
);

const menuFabVariants = cva([
  'navigation-rail--menu-fab',
  'px-5',
  'inline-flex flex-col items-start gap-1',
]);

const itemsVariants = cva(
  [
    'navigation-rail--items',
    'flex-1 overflow-y-auto',
    '[--ui-scrollbar-width:0px] [scrollbar-width:none]',
  ],
  {
    variants: {
      expanded: {
        true: ['px-5', 'inline-flex flex-col items-start gap-3'],
        false: ['inline-flex flex-col items-stretch gap-1'],
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
);

const sectionVariants = cva(['navigation-rail--section'], {
  variants: {
    expanded: {
      true: ['inline-flex flex-col items-start'],
      false: ['inline-flex flex-col items-stretch gap-1'],
    },
  },
  defaultVariants: {
    expanded: false,
  },
});

const sectionHeaderVariants = cva([
  'navigation-rail--section-label',
  'px-4 h-9',
  'inline-flex items-center',
  'text-on-surface-variant typography-label-large',
]);

const itemContainerVariants = cva([
  'navigation-rail--item-container group/navigation-rail--item',
  'flex-1 inline-flex items-center justify-center-safe',
  'cursor-pointer',
]);

const itemVariants = cva(
  [
    'navigation-rail--item',
    'inline-flex items-center justify-center',
    'cursor-pointer',
    'z-1',
    'relative',
    'transition easing-standard duration-medium-1',
  ],
  {
    variants: {
      isSelected: {
        true: [],
        false: [],
      },
      expanded: {
        true: [
          'flex-row',
          'gap-2',
          'h-14 px-4 rounded-full',
          [
            'state-current',
            'group-is-hovered/navigation-rail--item:state-hover',
            'group-in-focus/navigation-rail--item:state-focus',
            'group-is-pressed/navigation-rail--item:state-press',
          ],
        ],
        false: ['flex-col', 'gap-1'],
      },
    },
    defaultVariants: {
      isSelected: false,
      expanded: false,
    },
    compoundVariants: [
      {
        isSelected: true,
        expanded: true,
        class: 'text-on-secondary-container',
      },
      {
        isSelected: true,
        expanded: false,
        class: 'text-on-surface-variant',
      },
    ],
  },
);

const iconContainerVariants = cva(
  [
    'navigation-rail--icon-container',
    'inline-flex items-center justify-center',
    'rounded-full',
    'z-1',
    'relative',
    'transition easing-standard duration-medium-1',
    [
      'state-current',
      'group-is-hovered/navigation-rail--item:state-hover',
      'group-in-focus-visible/navigation-rail--item:state-focus',
      'group-is-pressed/navigation-rail--item:state-press',
    ],
  ],
  {
    variants: {
      isSelected: {
        true: [],
        false: ['text-on-surface-variant'],
      },
      expanded: {
        true: ['size-6 state-transparent'],
        false: ['h-8 w-14'],
      },
    },
    defaultVariants: {
      isSelected: false,
      expanded: false,
    },
    compoundVariants: [
      {
        isSelected: true,
        expanded: false,
        class: ['text-on-secondary-container'],
      },
      {
        isSelected: true,
        expanded: true,
        class: ['text-current'],
      },
    ],
  },
);

const iconVariants = cva(['navigation-rail--icon', 'size-6']);

const labelVariants = cva(
  ['navigation-rail--label', 'transition easing-standard duration-medium-1'],
  {
    variants: {
      isSelected: {
        true: [],
        false: ['text-on-surface-variant'],
      },
      expanded: {
        true: ['typography-label-large'],
        false: ['typography-label-medium'],
      },
    },
    defaultVariants: {
      isSelected: false,
      expanded: false,
    },
    compoundVariants: [
      {
        isSelected: true,
        expanded: false,
        class: 'text-secondary',
      },
      {
        isSelected: true,
        expanded: true,
        class: 'text-on-secondary-container',
      },
    ],
  },
);

const itemBackgroundVariants = cva(
  [
    'navigation-rail--item-background',
    'absolute',
    'inset-0',
    'rounded-full',
    '-z-1',
    'transition easing-standard duration-medium-1',
  ],
  {
    variants: {
      expanded: {
        true: ['bg-secondary-container'],
        false: [],
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
);

const iconContainerBackgroundVariants = cva(
  [
    'navigation-rail--icon-container-background',
    'absolute',
    'inset-0',
    'rounded-full',
    '-z-1',
    'transition easing-standard duration-medium-1',
  ],
  {
    variants: {
      expanded: {
        true: ['bg-transparent'],
        false: ['bg-secondary-container'],
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
);

export const navigationRailVariants = Object.assign(variants, {
  menuFab: menuFabVariants,
  items: itemsVariants,
  section: sectionVariants,
  sectionHeader: sectionHeaderVariants,
  itemContainer: itemContainerVariants,
  item: itemVariants,
  iconContainer: iconContainerVariants,
  icon: iconVariants,
  label: labelVariants,
  itemBackground: itemBackgroundVariants,
  iconContainerBackground: iconContainerBackgroundVariants,
});

export type NavigationRailVariants = Variants<typeof navigationRailVariants>;

export type NavigationRailMenuFabVariants = Variants<
  typeof navigationRailVariants.menuFab
>;

export type NavigationRailSectionVariants = Variants<
  typeof navigationRailVariants.items
>;

export type NavigationRailSectionHeaderVariants = Variants<
  typeof navigationRailVariants.sectionHeader
>;

export type NavigationRailItemContainerVariants = Variants<
  typeof navigationRailVariants.itemContainer
>;

export type NavigationRailItemVariants = Variants<
  typeof navigationRailVariants.item
>;

export type NavigationRailIconContainerVariants = Variants<
  typeof navigationRailVariants.iconContainer
>;

export type NavigationRailIconVariants = Variants<
  typeof navigationRailVariants.icon
>;

export type NavigationRailLabelVariants = Variants<
  typeof navigationRailVariants.label
>;

export type NavigationRailItemBackgroundVariants = Variants<
  typeof navigationRailVariants.itemBackground
>;

export type NavigationRailIconContainerBackgroundVariants = Variants<
  typeof navigationRailVariants.iconContainerBackground
>;
