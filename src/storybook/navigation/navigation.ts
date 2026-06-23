import type { Component } from "vue";
import type { NavigationNode } from "./navigation.types";
import type { Section } from "./registry";
import {
	computeNavigationByPath,
	computeNavigationPaths,
} from "./navigation.utility";
import { pageMeta, sections } from "./registry";

type PageModule = {
	default: Component;
};

/**
 * Все страницы-stories подхватываются автоматически из файловой системы.
 * Матчатся только файлы внутри подпапок (`pages/<section>/.../*-page.vue`);
 * `pages/index-page.vue` и `pages/storybook-page.vue` отсеиваются ниже по
 * числу сегментов пути. Имя выводится из имени файла, а иконки и нестандартные
 * имена берутся из `pageMeta` по полному пути.
 */
const modules = import.meta.glob<PageModule>("../pages/**/*-page.vue", {
	eager: true,
});

function toPascalCase(kebab: string): string {
	return kebab
		.split("-")
		.map(part => (part ? part[0]!.toUpperCase() + part.slice(1) : ""))
		.join("");
}

/** Link-узлы, сгруппированные по полному пути родительской секции. */
const linksByParent: Record<string, NavigationNode[]> = {};

for (const [filePath, mod] of Object.entries(modules)) {
	const relative = filePath.replace("../pages/", "").replace(/\.vue$/, "");
	const segments = relative.split("/");
	if (segments.length < 2)
		continue;

	const fileName = segments.pop()!.replace(/-page$/, "");
	const parentPath = `/${segments.join("/")}`;
	const fullPath = `${parentPath}/${fileName}`;
	const meta = pageMeta[fullPath] ?? {};

	const node = {
		type: "link",
		name: meta.name ?? toPascalCase(fileName),
		path: `/${fileName}`,
		page: mod.default,
		...(meta.icon ? { icon: meta.icon } : {}),
	} satisfies NavigationNode;

	(linksByParent[parentPath] ??= []).push(node);
}

function buildSection(section: Section, parentFullPath: string): NavigationNode {
	const fullPath = parentFullPath + section.path;
	const childFolders = (section.children ?? []).map(child =>
		buildSection(child, fullPath),
	);
	const childLinks = linksByParent[fullPath] ?? [];

	return {
		type: "folder",
		name: section.name,
		path: section.path,
		...(section.icon ? { icon: section.icon } : {}),
		...(section.order !== undefined ? { order: section.order } : {}),
		children: [...childFolders, ...childLinks],
	} satisfies NavigationNode;
}

const nodes: NavigationNode[] = sections.map(section =>
	buildSection(section, ""),
);

export const navigation = computeNavigationPaths(nodes);

export const navigationByPath = computeNavigationByPath(nodes);
