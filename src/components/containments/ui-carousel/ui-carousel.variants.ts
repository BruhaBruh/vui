import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(['carousel group/carousel', 'grid gap-2xs']);

const containerVariants = cva([
  'carousel--container',
  'grid grid-cols-[max-content_1fr_max-content]',
  'gap-2xs',
]);

const viewVariants = cva([
  'carousel--view',
  'overflow-hidden',
  'p-3xs',
  'col-start-2',
]);

const viewContainerVariants = cva([
  'carousel--view-container',
  'flex -ml-md',
  'touch-pan-y touch-pinch-zoom',
]);

const slideVariants = cva([
  'carousel--slide',
  'min-w-0',
  'shrink-0 grow-0',
  'translate-x-0 translate-y-0',
  'pl-md',
]);

const slideContentVariants = cva(['carousel--content', 'select-none']);

const arrowButtonVariants = cva([
  'carousel--arrow-button',
  'h-auto self-stretch',
]);

const dotsContainerVariants = cva([
  'carousel--dots-container',
  'flex items-center justify-center',
  'gap-3xs',
]);

const dotVariants = cva(
  [
    'carousel--dot',
    'flex items-center justify-center',
    'size-6',
    'transition easing-standard duration-medium-1',
    '[&>*]:size-4 cursor-pointer',
    'outline-none bg-transparent border-none',
  ],
  {
    variants: {
      isSelected: {
        true: 'text-outline',
        false: 'text-outline-variant',
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

export const carouselVariants = Object.assign(variants, {
  container: containerVariants,
  view: viewVariants,
  viewContainer: viewContainerVariants,
  slide: slideVariants,
  slideContent: slideContentVariants,
  arrowButton: arrowButtonVariants,
  dotsContainer: dotsContainerVariants,
  dot: dotVariants,
});

export type CarouselVariants = Variants<typeof carouselVariants>;

export type CarouselContainerVariants = Variants<
  typeof carouselVariants.container
>;

export type CarouselViewVariants = Variants<typeof carouselVariants.view>;

export type CarouselViewContainerVariants = Variants<
  typeof carouselVariants.viewContainer
>;

export type CarouselSlideVariants = Variants<typeof carouselVariants.slide>;

export type CarouselSlideContentVariants = Variants<
  typeof carouselVariants.slideContent
>;

export type CarouselArrowButtonVariants = Variants<
  typeof carouselVariants.arrowButton
>;

export type CarouselDotsContainerVariants = Variants<
  typeof carouselVariants.dotsContainer
>;

export type CarouselDotVariants = Variants<typeof carouselVariants.dot>;
