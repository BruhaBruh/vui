import {
  IconBorderRadius,
  IconBroadcast,
  IconEaseInOut,
  IconForms,
  IconHandFinger,
  IconNavigation,
  IconPalette,
  IconShadow,
  IconSquare,
  IconSquareCheck,
  IconTimeDuration30,
  IconTypography,
} from '@tabler/icons-vue';
import type { Component } from 'vue';
import {
  BadgePage,
  ButtonPage,
  DurationPage,
  EasingPage,
  ElevationPage,
  ExtendedFabPage,
  FabPage,
  IconButtonPage,
  PalettePage,
  RadiusPage,
  SegmentedButtonPage,
  TooltipPage,
  TypographyPage,
} from './pages';

export type NavigationNode = {
  name: string;
  path: string;
  icon?: Component;
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

const baseNavigation: NavigationNode[] = [
  {
    type: 'folder',
    name: 'Base',
    path: '/base',
    children: [
      {
        type: 'link',
        name: 'Duration',
        path: '/duration',
        icon: IconTimeDuration30,
        page: DurationPage,
      },
      {
        type: 'link',
        name: 'Easing',
        path: '/easing',
        icon: IconEaseInOut,
        page: EasingPage,
      },
      {
        type: 'link',
        name: 'Elevation',
        path: '/elevation',
        icon: IconShadow,
        page: ElevationPage,
      },
      {
        type: 'link',
        name: 'Palette',
        path: '/palette',
        icon: IconPalette,
        page: PalettePage,
      },
      {
        type: 'link',
        name: 'Radius',
        path: '/radius',
        icon: IconBorderRadius,
        page: RadiusPage,
      },
      {
        type: 'link',
        name: 'Typography',
        path: '/typography',
        icon: IconTypography,
        page: TypographyPage,
      },
    ],
  },
  {
    type: 'folder',
    name: 'Components',
    path: '/components',
    children: [
      {
        type: 'folder',
        name: 'Actions',
        path: '/actions',
        icon: IconHandFinger,
        children: [
          {
            type: 'link',
            name: 'Button',
            path: '/button',
            page: ButtonPage,
          },
          {
            type: 'link',
            name: 'Fab',
            path: '/fab',
            page: FabPage,
          },
          {
            type: 'link',
            name: 'ExtendedFab',
            path: '/extended-fab',
            page: ExtendedFabPage,
          },
          {
            type: 'link',
            name: 'IconButton',
            path: '/icon-button',
            page: IconButtonPage,
          },
          {
            type: 'link',
            name: 'SegmentedButton',
            path: '/segmented-button',
            page: SegmentedButtonPage,
          },
        ],
      },
      {
        type: 'folder',
        name: 'Communications',
        path: '/communications',
        icon: IconBroadcast,
        children: [
          {
            type: 'link',
            name: 'Badge',
            path: '/badge',
            page: BadgePage,
          },
          {
            type: 'link',
            name: 'Tooltip',
            path: '/tooltip',
            page: TooltipPage,
          },
        ],
      },
      {
        type: 'folder',
        name: 'Containments',
        path: '/containments',
        icon: IconSquare,
        children: [],
      },
      {
        type: 'folder',
        name: 'Inputs',
        path: '/inputs',
        icon: IconForms,
        children: [],
      },
      {
        type: 'folder',
        name: 'Navigations',
        path: '/navigations',
        icon: IconNavigation,
        children: [],
      },
      {
        type: 'folder',
        name: 'Selections',
        path: '/selections',
        icon: IconSquareCheck,
        children: [],
      },
    ],
  },
];

export const navigation = computeNavigationPaths(baseNavigation);

export const navigationByPath = computeNavigationByPath(navigation);

function computeNavigationPaths(
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
    .sort((a, b) => a.name.localeCompare(b.name));
}

function computeNavigationByPath(
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
