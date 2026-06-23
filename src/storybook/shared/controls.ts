import type { UnknownRecord } from "@bruhabruh/type-safe";
import { demoIcons } from "./options";

/**
 * Описание одного контрола playground.
 *
 * Поверх типа/дефолта несёт метаданные для кодогенерации и биндинга:
 * - `prop` — имя пропа в сгенерированном коде (по умолчанию = ключ контрола);
 * - `omit` — если текущее значение строго равно `omit`, проп не выводится в код
 *   и не попадает в `v-bind` (заменяет ручную обработку `'none'`/`false`);
 * - `asSlot` — значение идёт в children компонента, а не в атрибут.
 */
type BaseControl = {
	label?: string;
	description?: string;
	prop?: string;
	omit?: unknown;
	asSlot?: boolean;
};

export type Control
	= | (BaseControl & { type: "text"; default?: string })
		| (BaseControl & { type: "number"; default?: number })
		| (BaseControl & { type: "switch"; default?: boolean })
		| (BaseControl & {
			type: "select";
			default?: string;
			options: readonly string[];
		})
		| (BaseControl & {
			type: "radio";
			default?: string;
			options: readonly string[];
		})
		| (BaseControl & {
			type: "checkbox";
			default?: string[];
			options: readonly string[];
		})
		| (BaseControl & { type: "array"; default?: unknown[] })
		| (BaseControl & { type: "object"; default?: UnknownRecord });

export type Controls = Record<string, Control>;

type Extra = Partial<BaseControl>;

/** Выпадающий список из набора опций. */
export function select<T extends string>(
	options: readonly T[],
	def?: T,
	extra?: Extra,
): Control {
	return { type: "select", options, default: def ?? options[0], ...extra };
}

/** Переключатель (boolean). */
export function bool(def = false, extra?: Extra): Control {
	return { type: "switch", default: def, ...extra };
}

/** Текстовое поле. */
export function text(def = "", extra?: Extra): Control {
	return { type: "text", default: def, ...extra };
}

/** Числовое поле. */
export function num(def = 0, extra?: Extra): Control {
	return { type: "number", default: def, ...extra };
}

/** Массив (редактируется как JSON). */
export function arr(def: unknown[] = [], extra?: Extra): Control {
	return { type: "array", default: def, ...extra };
}

/** Объект (редактируется как JSON). */
export function obj(def: UnknownRecord = {}, extra?: Extra): Control {
	return { type: "object", default: def, ...extra };
}

/** Радио-группа из набора опций. */
export function radio<T extends string>(
	options: readonly T[],
	def?: T,
	extra?: Extra,
): Control {
	return { type: "radio", options, default: def ?? options[0], ...extra };
}

/**
 * Выбор демонстрационной иконки (leading/trailing). Значение `none` означает
 * отсутствие иконки и автоматически вырезается из кода и биндинга через `omit`.
 */
export function icon(def: string = "none", extra?: Extra): Control {
	return { type: "select", options: demoIcons, default: def, omit: "none", ...extra };
}
