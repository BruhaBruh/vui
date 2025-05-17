import type { Variants } from '@/types';
import { cva } from 'class-variance-authority';

const variants = cva(['modal group/modal', 'p-md']);

const underlayVariants = cva([
  'modal--underlay',
  'fixed inset-0',
  'inline-flex items-center justify-center',
  'overflow-hidden z-50',
  'overscroll-contain',
  'transition easing-standard duration-medium-1',
  'starting:opacity-0 opacity-100',
]);

export const modalVariants = Object.assign(variants, {
  underlay: underlayVariants,
});

export type ModalVariants = Variants<typeof modalVariants>;

export type ModalUnderlayVariants = Variants<typeof modalVariants.underlay>;
