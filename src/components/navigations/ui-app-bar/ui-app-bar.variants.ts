import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(
  [
    'app-bar group/app-bar @container/app-bar',
    'bg-surface text-on-surface',
    'w-full',
    'px-0',
  ],
  {
    variants: {
      variant: {
        search: ['h-16'],
        small: ['h-16'],
        medium: ['pt-2 pb-3'],
        large: ['pt-2 pb-3'],
      },
    },
    defaultVariants: {
      variant: 'search',
    },
  },
);

const topContainer = cva(
  [
    'app-bar--top-container',
    'px-1',
    'w-full',
    'inline-flex items-center justify-between',
  ],
  {
    variants: {
      variant: {
        search: ['h-full gap-2'],
        small: ['h-full gap-1'],
        medium: [],
        large: [],
      },
    },
    defaultVariants: {
      variant: 'search',
    },
  },
);

const bottomContainer = cva(['app-bar--bottom-container', 'px-4', 'w-full'], {
  variants: {
    variant: {
      search: [],
      small: [],
      medium: ['mt-1'],
      large: ['mt-2'],
    },
  },
  defaultVariants: {
    variant: 'search',
  },
});

const searchBarVariants = cva([
  'app-bar--search-bar',
  'w-0 flex-1 @md/app-bar:flex-0 @md/app-bar:w-96',
]);

const titleContainerVariants = cva(
  ['app-bar--title-container', 'inline-flex flex-col justify-center'],
  {
    variants: {
      centered: {
        true: ['items-center'],
        false: ['w-full'],
      },
    },
    defaultVariants: {
      centered: false,
    },
  },
);

const titleVariants = cva(['app-bar--title'], {
  variants: {
    variant: {
      search: [],
      small: ['typography-title-large'],
      medium: ['typography-headline-large'],
      large: ['typography-display-small'],
    },
  },
  defaultVariants: {
    variant: 'search',
  },
});

const subtitleVariants = cva(['app-bar--subtitle', 'text-on-surface-variant'], {
  variants: {
    variant: {
      search: [],
      small: ['typography-label-medium'],
      medium: ['typography-label-large mt-1'],
      large: ['typography-title-medium mt-2'],
    },
  },
  defaultVariants: {
    variant: 'search',
  },
});

export const appBarVariants = Object.assign(variants, {
  topContainer: topContainer,
  bottomContainer: bottomContainer,
  searchBar: searchBarVariants,
  titleContainer: titleContainerVariants,
  title: titleVariants,
  subtitle: subtitleVariants,
});

export type AppBarVariants = Variants<typeof appBarVariants>;

export type AppBarTopContainerVariants = Variants<
  typeof appBarVariants.topContainer
>;

export type AppBarBottomContainerVariants = Variants<
  typeof appBarVariants.bottomContainer
>;

export type AppBarSearchBarVariants = Variants<typeof appBarVariants.searchBar>;

export type AppBarTitleContainerVariants = Variants<
  typeof appBarVariants.titleContainer
>;

export type AppBarTitleVariants = Variants<typeof appBarVariants.title>;

export type AppBarSubtitleVariants = Variants<typeof appBarVariants.subtitle>;
