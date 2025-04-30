import { CheckboxPage, RadioPage, SwitchPage } from '@/storybook/pages';
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
    {
      type: 'link',
      name: 'Checkbox',
      path: '/checkbox',
      page: CheckboxPage,
    },
    {
      type: 'link',
      name: 'Radio',
      path: '/radio',
      page: RadioPage,
    },
  ],
};
