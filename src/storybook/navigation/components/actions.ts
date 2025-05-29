import {
  ButtonPage,
  ExtendedFabPage,
  FabPage,
  IconButtonPage,
  SegmentedButtonPage,
} from '@/storybook/pages';
import type { NavigationNode } from '../navigation.types';

export const actions: NavigationNode = {
  type: 'folder',
  name: 'Actions',
  path: '/actions',
  icon: 'tabler:hand-finger',
  children: [
    {
      type: 'link',
      name: 'Button',
      path: '/button',
      page: ButtonPage,
    },
    {
      type: 'link',
      name: 'ExtendedFab',
      path: '/extended-fab',
      page: ExtendedFabPage,
    },
    {
      type: 'link',
      name: 'Fab',
      path: '/fab',
      page: FabPage,
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
};
