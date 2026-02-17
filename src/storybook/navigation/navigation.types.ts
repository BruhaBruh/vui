import type { Component } from "vue";
import type { IconProps } from "@/components";

export type NavigationNode = {
	name: string;
	path: string;
	icon?: IconProps["icon"];
	order?: number;
} & (
	| {
		type: "link";
		page: Component;
	}
	| {
		type: "folder";
		children: NavigationNode[];
	}
);
