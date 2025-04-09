import type { VariantProps } from 'class-variance-authority';
import {
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
  inject,
  provide,
  toRef,
} from 'vue';
import type { breadcrumbsVariants } from './ui-breadcrumbs.variants';

type Variants = VariantProps<typeof breadcrumbsVariants>;

export type BreadcrumbsState = {
  size: Readonly<Ref<Variants['size']>>;
  active: Readonly<Ref<string | undefined>>;
};

const breadcrumbsStateKey = Symbol() as InjectionKey<BreadcrumbsState>;

export function provideBreadcrumbsState(
  size: MaybeRefOrGetter<Variants['size']>,
  active: MaybeRefOrGetter<string | undefined>,
) {
  const state: BreadcrumbsState = {
    size: toRef(size),
    active: toRef(active),
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
