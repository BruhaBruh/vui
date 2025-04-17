import type { NavigationNode } from './navigation.types';

export function computeNavigationPaths(
  current: NavigationNode[],
  basePath = '',
): NavigationNode[] {
  return current
    .map((node) => {
      const result = node;
      result.path = basePath + node.path;
      if (result.type === 'folder') {
        result.children = computeNavigationPaths(result.children, result.path);
      }

      return result;
    })
    .sort((a, b) => {
      const aOrder = a.order ?? 1_000_000_000;
      const bOrder = b.order ?? 1_000_000_000;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.name.localeCompare(b.name);
    });
}

export function computeNavigationByPath(
  current: NavigationNode[],
): Record<string, NavigationNode> {
  const result: Record<string, NavigationNode> = {};

  current.forEach((node) => {
    result[node.path] = node;

    if (node.type === 'folder') {
      const childrenResult = computeNavigationByPath(node.children);
      for (const key of Object.keys(childrenResult)) {
        result[key] = childrenResult[key];
      }
    }
  });

  return result;
}
