import type { ComputedRef, InjectionKey, Ref } from "vue";
import type { Context } from "@/types";
import { onClickOutside, toRef, useEventListener } from "@vueuse/core";
import {
	computed,
	inject,
	provide,
	ref,
	useId,
} from "vue";

type PopoverContext = Context<
	{
		id: Ref<string>;
		open: Ref<boolean>;
		trigger: Ref<HTMLElement | null>;
		triggerElement: ComputedRef<HTMLElement | null>;
		popover: Ref<HTMLElement | null>;
	},
	{
		open: boolean;
	}
>;

export type PopoverState = PopoverContext["state"];

export type PopoverStateOptions = PopoverContext["options"];

const popoverStateKey = Symbol("popover-state-key") as InjectionKey<PopoverState>;

export function providePopoverState(options: PopoverContext["provideOptions"]) {
	const contextId = useId();
	const id = ref(contextId);
	const open = toRef(options.open);
	const trigger = ref<HTMLElement | null>(null);
	const popover = ref<HTMLElement | null>(null);
	const triggerElement = computed<HTMLElement | null>(() => {
		if (trigger.value && "$el" in trigger.value) {
			return trigger.value.$el as HTMLElement | null;
		}
		return trigger.value;
	});
	const popoverElement = computed<HTMLElement | null>(() => {
		if (popover.value && "$el" in popover.value) {
			return popover.value.$el as HTMLElement | null;
		}
		return popover.value;
	});

	useEventListener(trigger, "click", () => {
		open.value = !open.value;
	});

	onClickOutside(
		popoverElement,
		() => {
			if (!open.value)
				return;
			open.value = false;
		},
		{ ignore: [triggerElement] },
	);

	useEventListener("keydown", (e) => {
		if (!open.value)
			return;
		if (e.key !== "Escape")
			return;
		open.value = false;
		triggerElement.value?.focus();
	});

	const state: PopoverState = {
		id,
		open,
		trigger,
		triggerElement,
		popover,
	};

	provide(popoverStateKey, state);

	return state;
}

export function usePopoverState() {
	const state = inject(popoverStateKey);

	if (!state) {
		throw new Error("usePopoverState must be used within a Popover component");
	}

	return state;
}
