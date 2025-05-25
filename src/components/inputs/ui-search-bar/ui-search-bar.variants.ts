import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva([
  'search-bar group/search-bar',
  'bg-surface-container-high text-on-surface',
  'h-14 rounded-full px-4',
  'elevation-3',
  [
    'inline-flex items-center justify-between',
    'relative',
    'cursor-text',
    'transition-box duration-medium-1 easing-standard',
    ['ripple-wrapper:inset-0 ripple:bg-current'],
    [
      'state-primary',
      'is-hovered:state-hover',
      'in-focus-within:state-focus',
      'is-pressed:state-press',
    ],
  ],
  'border-2 border-transparent outline-none',
]);

const inputVariants = cva([
  'searchg-bar--input',
  'flex-1',
  'typography-body-large placeholder:text-on-surface-variant',
  'transition easing-standard duration-medium-1',
  'outline-0! overflow-hidden',
  'appearance-none [-moz-appearance:textfield] min-w-[0px] w-auto',
]);

const iconVariants = cva(['search-bar--icon', 'size-6'], {
  variants: {
    position: {
      leading: [
        'mr-4',
        [
          'inline-flex items-center justify-center',
          'relative',
          'cursor-pointer',
          'overflow-hidden',
          'transition-box duration-medium-1 easing-standard',
          ['outline-offset-[3px]', 'focus-visible:outline-[3px]'],
        ],
        [
          '[&>*]:absolute [&>*]:inset-0 [&>*]:w-full [&>*]:h-full',
          '[&>*]:transition-box [&>*]:duration-medium-1 [&>*]:easing-standard'
        ],
      ],
      trailing: 'ml-4 text-on-surface-variant',
    },
  },
});

const avatarVariants = cva([
  'search-bar--avatar',
  'size-7h',
  'rounded-full',
  'ml-4',
]);

export const searchBarVariants = Object.assign(variants, {
  input: inputVariants,
  icon: iconVariants,
  avatar: avatarVariants,
});

export type SearchBarVariants = Variants<typeof searchBarVariants>;

export type SearchBarInputVariants = Variants<typeof searchBarVariants.input>;

export type SearchBarIconVariants = Variants<typeof searchBarVariants.icon>;

export type SearchBarAvatarVariants = Variants<typeof searchBarVariants.avatar>;
