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

const top = cva(
  [
    'app-bar--top',
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

const topItemVariants = cva([], {
  variants: {
    position: {
      leading: [
        'app-bar--top-leading',
        'grow-1 basis-0',
        'h-12 inline-flex items-center justify-start',
      ],
      center: ['app-bar--top-center', 'min-w-0 *:min-w-0'],
      trailing: [
        'app-bar--top-trailing',
        'grow-1 basis-0',
        'h-12 inline-flex items-center justify-end',
      ],
    },
  },
});

const slotVariants = cva([
  'app-bar--slot size-12 inline-flex items-center justify-center',
]);

const textVariants = cva(
  ['app-bar--text', 'inline-flex flex-col justify-center'],
  {
    variants: {
      variant: {
        search: [],
        small: [],
        medium: ['mt-1', 'px-4 w-full'],
        large: ['mt-2', 'px-4 w-full'],
      },
      centered: {
        true: ['items-center'],
        false: ['w-full'],
      },
    },
    defaultVariants: {
      variant: 'search',
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
  top: top,
  topItem: topItemVariants,
  slot: slotVariants,
  text: textVariants,
  title: titleVariants,
  subtitle: subtitleVariants,
});

export type AppBarVariants = Variants<typeof appBarVariants>;

export type AppBarTopVariants = Variants<typeof appBarVariants.top>;

export type AppBarTopItemVariants = Variants<typeof appBarVariants.topItem>;

export type AppBarSlotVariants = Variants<typeof appBarVariants.slot>;

export type AppBarTextVariants = Variants<typeof appBarVariants.text>;

export type AppBarTitleVariants = Variants<typeof appBarVariants.title>;

export type AppBarSubtitleVariants = Variants<typeof appBarVariants.subtitle>;
