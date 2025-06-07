import {
  AppBarPage,
  BreadcrumbsPage,
  NavigationBarPage,
  NavigationRailPage,
  PaginationPage,
} from '@/storybook/pages';
import type { NavigationNode } from '../navigation.types';

export const navigations: NavigationNode = {
  type: 'folder',
  name: 'Navigations',
  path: '/navigations',
  icon: 'tabler:navigation',
  children: [
    {
      type: 'link',
      name: 'Breadcrumbs',
      path: '/breadcrumbs',
      page: BreadcrumbsPage,
    },
    {
      type: 'link',
      name: 'Pagination',
      path: '/pagination',
      page: PaginationPage,
    },
    {
      type: 'link',
      name: 'NavigationBar',
      path: '/navigation-bar',
      page: NavigationBarPage,
    },
    {
      type: 'link',
      name: 'NavigationRail',
      path: '/navigation-rail',
      page: NavigationRailPage,
    },
    {
      type: 'link',
      name: 'AppBar',
      path: '/app-bar',
      page: AppBarPage,
    },
  ],
};
