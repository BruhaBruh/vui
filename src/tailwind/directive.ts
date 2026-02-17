import type { DirectiveBinding, Plugin } from "vue";
import { extendTailwindMerge } from "tailwind-merge";

export const mergeDirective: Plugin = (app) => {
	app.directive("tw-merge", {
		beforeMount: computeClasses,
		updated: computeClasses,
	});
};

const twMerge = extendTailwindMerge<string, string>({
	extend: {
		classGroups: {
			padding: [(className: string) => className.startsWith("p-")],
			paddingX: [(className: string) => className.startsWith("px-")],
			paddingY: [(className: string) => className.startsWith("py-")],
			paddingT: [(className: string) => className.startsWith("pt-")],
			paddingB: [(className: string) => className.startsWith("pb-")],
			paddingR: [(className: string) => className.startsWith("pr-")],
			paddingL: [(className: string) => className.startsWith("pl-")],
			stateType: [
				"state-hover",
				"state-focus",
				"state-press",
				"state-drag",
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
	vNode: any,
) {
	const existingClasses = el.classList.value;
	const inheritedClasses = vNode?.ctx?.attrs as string | undefined;

	if (!existingClasses || !inheritedClasses)
		return;

	el.classList.value = twMerge(existingClasses, inheritedClasses);
}
