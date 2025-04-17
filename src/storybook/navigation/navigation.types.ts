import type { Component } from 'vue';

export type NavigationNode = {
  name: string;
  path: string;
  icon?: Component;
  order?: number;
} & (
  | {
      type: 'link';
      page: Component;
    }
  | {
      type: 'folder';
      children: NavigationNode[];
    }
);
