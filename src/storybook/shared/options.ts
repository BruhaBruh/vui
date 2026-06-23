import type {
	ButtonVariants,
	CardVariants,
	CheckboxProps,
	FabVariants,
	FieldInputVariants,
} from "@/components";

/**
 * Переиспользуемые наборы опций для playground-контролов.
 *
 * `cva@0.7.1` не отдаёт варианты в runtime (метаданные спрятаны в замыкании),
 * поэтому держим наборы здесь, привязывая их к типам компонентов через
 * `satisfies` — рассинхрон с библиотекой будет пойман type-check'ом.
 */

/** Шесть семантических цветов (Button, Checkbox, Radio, Switch, ...). */
export const colors = [
	"primary",
	"secondary",
	"info",
	"success",
	"caution",
	"critical",
] as const satisfies readonly NonNullable<CheckboxProps["color"]>[];

/** Цвета с дополнительным `standard` (Card). */
export const surfaceColors = [
	"standard",
	"primary",
	"secondary",
	"info",
	"success",
	"caution",
	"critical",
] as const satisfies readonly NonNullable<CardVariants["color"]>[];

/** Размеры кнопок и крупных action-компонентов. */
export const buttonSizes = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
] as const satisfies readonly NonNullable<ButtonVariants["size"]>[];

/** Размеры полей ввода. */
export const fieldSizes = [
	"sm",
	"md",
	"lg",
] as const satisfies readonly NonNullable<FieldInputVariants["size"]>[];

/** Размеры FAB / Extended FAB. */
export const fabSizes = [
	"sm",
	"md",
	"lg",
] as const satisfies readonly NonNullable<FabVariants["size"]>[];

/** Стили FAB / Extended FAB. */
export const fabVariants = [
	"filled",
	"tonal",
] as const satisfies readonly NonNullable<FabVariants["variant"]>[];

/** Стили кнопок. */
export const buttonVariants = [
	"elevated",
	"filled",
	"tonal",
	"outlined",
	"text",
] as const satisfies readonly NonNullable<ButtonVariants["variant"]>[];

/** Стили карточек. */
export const cardVariants = [
	"elevated",
	"filled",
	"outlined",
	"none",
] as const satisfies readonly NonNullable<CardVariants["variant"]>[];

/** Формы (rounded / square). */
export const shapes = [
	"rounded",
	"square",
] as const satisfies readonly NonNullable<ButtonVariants["shape"]>[];

/** Демонстрационные иконки для контролов leading/trailing. `none` = без иконки. */
export const demoIcons = [
	"none",
	"tabler:square-rounded",
	"tabler:circle",
] as const;
