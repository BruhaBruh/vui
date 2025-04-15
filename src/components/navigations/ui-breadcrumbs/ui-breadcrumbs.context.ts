import type { Context } from '@/types';
import { toRef } from '@vueuse/core';
import { type InjectionKey, type Ref, inject, provide } from 'vue';
import type { BreadcrumbsVariants } from './ui-breadcrumbs.variants';

type BreadcrumbsContext = Context<
  {
    size: Readonly<Ref<BreadcrumbsVariants['size']>>;
    active: Readonly<Ref<string | undefined>>;
    currentVariant: Readonly<
      Ref<'page' | 'step' | 'location' | 'date' | 'time' | boolean>
    >;
  },
  {
    size: BreadcrumbsVariants['size'];
    active: string | undefined;
    currentVariant: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  }
>;

export type BreadcrumbsState = BreadcrumbsContext['state'];

export type BreadcrumbsStateOptions = BreadcrumbsContext['options'];

const breadcrumbsStateKey = Symbol() as InjectionKey<BreadcrumbsState>;

export function provideBreadcrumbsState(
  options: BreadcrumbsContext['provideOptions'],
) {
  const size = toRef(options.size);
  const active = toRef(options.active);
  const currentVariant = toRef(options.currentVariant);

  const state: BreadcrumbsState = {
    size,
    active,
    currentVariant,
  };

  provide(breadcrumbsStateKey, state);

  return state;
}

export function useBreadcrumbsState() {
  const state = inject(breadcrumbsStateKey);

  if (!state) {
    throw new Error(
      'useBreadcrumbsState must be used within a Breadcrumbs component',
    );
  }

  return state;
}
