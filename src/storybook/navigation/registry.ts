import type { IconProps } from "@/components";

/**
 * Декларативный реестр секций-папок навигации (иконки, имена, порядок).
 *
 * Сами страницы-листья подхватываются автоматически из файловой системы
 * через `import.meta.glob` в `navigation.ts` и раскладываются по секциям
 * на основе своего пути. Здесь описываем только структуру папок.
 */
export type Section = {
	/** Путь сегмента относительно родителя (напр. `"/actions"`). */
	path: string;
	name: string;
	icon?: IconProps["icon"];
	order?: number;
	children?: Section[];
};

/**
 * Точечные переопределения метаданных страниц по их полному пути.
 * Имя по умолчанию выводится из имени файла (kebab → PascalCase); здесь
 * задаём иконки и нестандартные имена, которые нельзя вывести автоматически.
 */
export const pageMeta: Record<
	string,
	{ name?: string; icon?: IconProps["icon"] }
> = {
	"/base/duration": { icon: "tabler:time-duration-30" },
	"/base/easing": { icon: "tabler:ease-in-out" },
	"/base/elevation": { icon: "tabler:shadow" },
	"/base/palette": { icon: "tabler:palette" },
	"/base/radius": { icon: "tabler:border-radius" },
	"/base/typography": { icon: "tabler:typography" },
	"/components/inputs/textarea-field": { name: "TextAreaField" },
};

export const sections: Section[] = [
	{ path: "/base", name: "Base", order: 0 },
	{
		path: "/components",
		name: "Components",
		order: 1,
		children: [
			{ path: "/actions", name: "Actions", icon: "tabler:hand-finger" },
			{ path: "/communications", name: "Communications", icon: "tabler:broadcast" },
			{ path: "/containments", name: "Containments", icon: "tabler:square-rounded" },
			{ path: "/inputs", name: "Inputs", icon: "tabler:forms" },
			{ path: "/navigations", name: "Navigations", icon: "tabler:navigation" },
			{ path: "/selections", name: "Selections", icon: "tabler:square-check" },
		],
	},
];
