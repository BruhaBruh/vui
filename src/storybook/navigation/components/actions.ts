import { ButtonPage, ExtendedFabPage } from '@/storybook/pages';
import { IconHandFinger } from '@tabler/icons-vue';
import type { NavigationNode } from '../navigation.types';

export const actions: NavigationNode = {
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
    // {
    //   type: 'link',
    //   name: 'Fab',
    //   path: '/fab',
    //   page: FabPage,
    // },
    {
      type: 'link',
      name: 'ExtendedFab',
      path: '/extended-fab',
      page: ExtendedFabPage,
    },
    // {
    //   type: 'link',
    //   name: 'IconButton',
    //   path: '/icon-button',
    //   page: IconButtonPage,
    // },
    // {
    //   type: 'link',
    //   name: 'SegmentedButton',
    //   path: '/segmented-button',
    //   page: SegmentedButtonPage,
    // },
  ],
};
