import { SwitchPage } from '@/storybook/pages';
import { IconSquareCheck } from '@tabler/icons-vue';
import type { NavigationNode } from '../navigation.types';

export const selections: NavigationNode = {
  type: 'folder',
  name: 'Selections',
  path: '/selections',
  icon: IconSquareCheck,
  children: [
    {
      type: 'link',
      name: 'Switch',
      path: '/switch',
      page: SwitchPage,
    },
  ],
};
