import { extendTailwindMerge } from 'tailwind-merge';
import type { DirectiveBinding, Plugin } from 'vue';

export const mergeDirective: Plugin = (app) => {
  app.directive('tw-merge', {
    beforeMount: computeClasses,
    updated: computeClasses,
  });
};

const twMerge = extendTailwindMerge<string, string>({
  extend: {
    classGroups: {
      padding: [(className: string) => /^p-/.test(className)],
      paddingX: [(className: string) => /^px-/.test(className)],
      paddingY: [(className: string) => /^py-/.test(className)],
      paddingT: [(className: string) => /^pt-/.test(className)],
      paddingB: [(className: string) => /^pb-/.test(className)],
      paddingR: [(className: string) => /^pr-/.test(className)],
      paddingL: [(className: string) => /^pl-/.test(className)],
      stateType: [
        'state-hover',
        'state-focus',
        'state-press',
        'state-drag',
        (className: string) => /^state-\d+$/.test(className),
      ],
      state: [
        (className: string) =>
          /^state-(?!hover$|focus$|press$|drag$|\d+$).+$/.test(className),
      ],
      elevation: [(className: string) => /^elevation-.+$/.test(className)],
      easing: [(className: string) => /^easing-.+$/.test(className)],
      duration: [(className: string) => /^duration-.+$/.test(className)],
    },
  },
});

function computeClasses(
  el: HTMLElement,
  binding: DirectiveBinding,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vNode: any,
) {
  const existingClasses = el.classList.value;
  const inheritedClasses = vNode?.ctx?.attrs as string | undefined;

  if (!existingClasses || !inheritedClasses) return;

  el.classList.value = twMerge(existingClasses, inheritedClasses);
}
