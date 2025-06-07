import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva([
  'navigation-bar group/navigation-bar @container/navigation-bar',
  'w-full h-16 elevation-2',
  'inline-flex items-center justify-center',
  'bg-surface-container text-on-surface',
  'transition easing-standard duration-medium-1',
]);

const contentVariants = cva([
  'navigation-bar--content',
  'w-full max-w-screen-sm',
  'inline-flex items-center justify-center',
]);

const itemContainerVariants = cva([
  'navigation-bar--item-container group/navigation-bar--item',
  'flex-1 inline-flex items-center justify-center-safe',
  'cursor-pointer',
]);

const itemVariants = cva(
  [
    'navigation-bar--item',
    'inline-flex flex-col items-center justify-center @md/navigation-bar:flex-row',
    'gap-1',
    'cursor-pointer',
    'z-1',
    'relative',
    '@md/navigation-bar:h-10',
    '@md/navigation-bar:px-4',
    '@md/navigation-bar:rounded-full',
    'transition easing-standard duration-medium-1',
    [
      '@md/navigation-bar:state-current',
      '@md/navigation-bar:group-is-hovered/navigation-bar--item:state-hover',
      '@md/navigation-bar:group-in-focus/navigation-bar--item:state-focus',
      '@md/navigation-bar:group-is-pressed/navigation-bar--item:state-press',
    ],
  ],
  {
    variants: {
      isSelected: {
        true: ['@md/navigation-bar:text-on-secondary-container'],
        false: ['@md/navigation-bar:text-on-surface-variant'],
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

const iconContainerVariants = cva(
  [
    'navigation-bar--icon-container',
    'h-8 w-14 @md/navigation-bar:size-6',
    'inline-flex items-center justify-center',
    'rounded-full',
    'z-1',
    'relative',
    'transition easing-standard duration-medium-1',
    [
      'state-current',
      'group-is-hovered/navigation-bar--item:state-hover',
      'group-in-focus-visible/navigation-bar--item:state-focus',
      'group-is-pressed/navigation-bar--item:state-press',
      '@md/navigation-bar:state-transparent',
    ],
  ],
  {
    variants: {
      isSelected: {
        true: [
          'text-on-secondary-container',
          '@md/navigation-bar:text-current',
        ],
        false: ['text-on-surface-variant'],
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

const iconVariants = cva(['navigation-bar--icon', 'size-6']);

const labelVariants = cva(
  [
    'navigation-bar--label',
    'typography-label-medium',
    'transition easing-standard duration-medium-1',
  ],
  {
    variants: {
      isSelected: {
        true: ['text-secondary @md/navigation-bar:text-on-secondary-container'],
        false: ['text-on-surface-variant'],
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

const itemBackgroundVariants = cva([
  'navigation-bar--item-background',
  'absolute',
  'inset-0',
  'rounded-full',
  '-z-1',
  'transition easing-standard duration-medium-1',
  '@md/navigation-bar:bg-secondary-container',
]);

const iconContainerBackgroundVariants = cva([
  'navigation-bar--icon-container-background',
  'absolute',
  'inset-0',
  'rounded-full',
  '-z-1',
  'transition easing-standard duration-medium-1',
  'bg-secondary-container @md/navigation-bar:bg-transparent',
]);

export const navigationBarVariants = Object.assign(variants, {
  content: contentVariants,
  itemContainer: itemContainerVariants,
  item: itemVariants,
  iconContainer: iconContainerVariants,
  icon: iconVariants,
  label: labelVariants,
  itemBackground: itemBackgroundVariants,
  iconContainerBackground: iconContainerBackgroundVariants,
});

export type NavigationBarVariants = Variants<typeof navigationBarVariants>;

export type NavigationBarContentVariants = Variants<
  typeof navigationBarVariants.content
>;

export type NavigationBarItemContainerVariants = Variants<
  typeof navigationBarVariants.itemContainer
>;

export type NavigationBarItemVariants = Variants<
  typeof navigationBarVariants.item
>;

export type NavigationBarIconContainerVariants = Variants<
  typeof navigationBarVariants.iconContainer
>;

export type NavigationBarIconVariants = Variants<
  typeof navigationBarVariants.icon
>;

export type NavigationBarLabelVariants = Variants<
  typeof navigationBarVariants.label
>;

export type NavigationBarItemBackgroundVariants = Variants<
  typeof navigationBarVariants.itemBackground
>;

export type NavigationBarIconContainerBackgroundVariants = Variants<
  typeof navigationBarVariants.iconContainerBackground
>;
