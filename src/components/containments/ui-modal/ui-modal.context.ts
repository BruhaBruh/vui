import type { InjectionKey, Ref } from "vue";
import type { Context } from "@/types";
import { toRef, useEventListener } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import {
	inject,
	nextTick,
	provide,
	ref,
	useId,
	watchEffect,
} from "vue";

type ModalContext = Context<
	{
		id: Ref<string>;
		open: Ref<boolean>;
		trigger: Ref<HTMLElement | null>;
		modal: Ref<HTMLElement | null>;
	},
	{
		open: boolean;
		focusTrap: boolean;
	}
>;

export type ModalState = ModalContext["state"];

export type ModalStateOptions = ModalContext["options"];

const modalStateKey = Symbol("modal-state-key") as InjectionKey<ModalState>;

export function provideModalState(options: ModalContext["provideOptions"]) {
	const contextId = useId();
	const id = ref(contextId);
	const open = toRef(options.open);
	const trigger = ref<HTMLElement | null>(null);
	const modal = ref<HTMLElement | null>(null);
	const focusTrap = toRef(options.focusTrap);

	const { activate, deactivate } = useFocusTrap(modal, { immediate: focusTrap.value });

	watchEffect(async () => {
		if (focusTrap.value && open.value) {
			await nextTick();
			activate();
		}
		else {
			deactivate();
		}
	});

	useEventListener("keydown", (e) => {
		if (!open.value)
			return;
		if (e.key !== "Escape")
			return;
		open.value = false;
	});

	useEventListener(trigger, "pointerup", () => {
		open.value = true;
	});

	const state: ModalState = {
		id,
		open,
		trigger,
		modal,
	};

	provide(modalStateKey, state);

	return state;
}

export function useModalState() {
	const state = inject(modalStateKey);

	if (!state) {
		throw new Error("useModalState must be used within a Modal component");
	}

	return state;
}
