import useEmblaCarouselVue from 'embla-carousel-vue';
import { type MaybeRefOrGetter, type Ref, toRef } from 'vue';

type UnwrapRef<T> = T extends Ref<infer U> ? U : T;

type EmblaParameters = Parameters<typeof useEmblaCarouselVue>;

type EmblaParameter<T extends number> = UnwrapRef<
  NonNullable<EmblaParameters[T]>
>;

type EmblaReturn = ReturnType<typeof useEmblaCarouselVue>;

export type EmblaOptions = EmblaParameter<0>;
export type EmblaPlugin = EmblaParameter<1>[number];

export type EmblaCarouselApi = NonNullable<UnwrapRef<EmblaReturn[1]>>;

export type UseCarouselOptions = {
  options?: MaybeRefOrGetter<EmblaOptions>;
  plugins?: MaybeRefOrGetter<EmblaPlugin[]>;
};

export function useCarousel(opts: UseCarouselOptions = {}): {
  ref: Ref<HTMLElement | undefined>;
  api: Ref<EmblaCarouselApi | undefined>;
} {
  const options = toRef(opts.options ?? (() => ({})));
  const plugins = toRef(opts.plugins ?? (() => []));

  const [ref, api] = useEmblaCarouselVue(options, plugins);

  return { ref, api };
}
