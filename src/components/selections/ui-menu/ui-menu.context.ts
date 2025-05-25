import { usePopoverState } from '@/components/containments/ui-popover/ui-popover.context';
import type { Context } from '@/types';
import { toRef, useEventListener } from '@vueuse/core';
import {
  type ComputedRef,
  type InjectionKey,
  type Ref,
  computed,
  inject,
  provide,
  ref,
} from 'vue';

type SelectionMode = 'single' | 'multiple' | 'none';

type MenuContext = Context<
  {
    selectionMode: Ref<SelectionMode>;
    disabledValues: Ref<string[]>;
    selectedValues: ComputedRef<string[]>;
    collection: Ref<string[]>;
    focusedId: Ref<string | null>;
    triggerId: ComputedRef<string | undefined>;
    addToCollection: (value: string) => void;
    removeFromCollection: (value: string) => void;
    clearCollection: () => void;
    select: (value: string) => void;
    unselect: (value: string) => void;
    toggleSelect: (value: string) => void;
  },
  {
    selectionMode: SelectionMode;
    disabledValues: string[];
  },
  {
    selectedValues: string[];
  },
  {
    onChange: (values: string[]) => void;
  }
>;

export type MenuState = MenuContext['state'];

export type MenuStateOptions = MenuContext['options'];

const modalStateKey = Symbol() as InjectionKey<MenuState>;

export function provideMenuState(options: MenuContext['provideOptions']) {
  const collection = ref<string[]>([]);
  const itemsCollection = computed(() =>
    collection.value.filter((v) => !v.endsWith('-section')),
  );
  const selectedValues = options.selectedValues;
  const selectionMode = toRef(options.selectionMode);
  const disabledValues = toRef(options.disabledValues);
  const focusedId = ref<string | null>(null);

  const { open: isMenuOpen, triggerElement } = usePopoverState();

  const triggerId = computed(() => triggerElement.value?.id);

  function addToCollection(value: string) {
    if (collection.value.includes(value)) {
      throw new Error(`Duplicate value "${value}" in Menu state collection`);
    }
    collection.value = [...collection.value, value];
  }

  function removeFromCollection(value: string) {
    collection.value = collection.value.filter((v) => v !== value);
  }

  function clearCollection() {
    collection.value = [];
  }

  function select(value: string) {
    if (selectionMode.value === 'none') return;
    if (selectionMode.value === 'single') {
      options.onChange([value]);
      return;
    }
    options.onChange([
      ...selectedValues.value.filter((v) => v !== value),
      value,
    ]);
  }

  function unselect(value: string) {
    if (selectionMode.value === 'single') return;
    options.onChange(selectedValues.value.filter((v) => v !== value));
  }

  function toggleSelect(value: string) {
    const isSelected = selectedValues.value.includes(value);
    if (isSelected) {
      unselect(value);
    } else {
      select(value);
    }
  }

  function focusItem(ids: string[]) {
    let item: HTMLElement | null = null;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const el = document.querySelector(`#${id}`) as HTMLElement | null;
      if (el && el.ariaDisabled !== 'true') {
        item = el;
        break;
      }
    }
    item?.focus();
  }

  function focusNext() {
    let ids = itemsCollection.value;

    if (focusedId.value) {
      const index = itemsCollection.value.findIndex(
        (v) => v === focusedId.value,
      );
      if (index !== itemsCollection.value.length - 1) {
        ids = itemsCollection.value.slice(index + 1);
      }
    }

    focusItem(ids);
  }

  function focusPrevious() {
    let ids = itemsCollection.value;

    if (focusedId.value) {
      const index = itemsCollection.value.findIndex(
        (v) => v === focusedId.value,
      );
      if (index !== 0) {
        ids = itemsCollection.value.slice(0, index);
      }
    }

    focusItem([...ids].reverse());
  }

  useEventListener('keydown', (e) => {
    if (!isMenuOpen.value) return;
    if (
      ![
        'ArrowDown',
        'ArrowUp',
        'ArrowRight',
        'ArrowLeft',
        'Home',
        'End',
        ' ',
      ].includes(e.key)
    )
      return;
    e.preventDefault();

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') focusNext();
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') focusPrevious();
    if (e.key === 'Home') focusItem(itemsCollection.value);
    if (e.key === 'End') focusItem([...itemsCollection.value].reverse());
    if (e.key === ' ') {
      if (!focusedId.value) return;
      const item = document.querySelector(
        `#${focusedId.value}`,
      ) as HTMLElement | null;
      item?.click();
    }
  });

  // watchEffect(() => {
  //   if (selectionMode.value === 'none') {
  //     selectedValues.value = [];
  //   } else if (selectionMode.value === 'single') {
  //     selectedValues.value = selectedValues.value.slice(0, 1);
  //   }
  // });

  const state: MenuState = {
    selectionMode,
    collection,
    disabledValues,
    selectedValues,
    focusedId,
    triggerId,
    addToCollection,
    removeFromCollection,
    clearCollection,
    select,
    unselect,
    toggleSelect,
  };

  provide(modalStateKey, state);

  return state;
}

export function useMenuState() {
  const state = inject(modalStateKey);

  if (!state) {
    throw new Error('useMenuState must be used within a MenuContent component');
  }

  return state;
}
