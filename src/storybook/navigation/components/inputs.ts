import { TextFieldPage } from '@/storybook/pages';
import { IconForms } from '@tabler/icons-vue';
import type { NavigationNode } from '../navigation.types';

export const inputs: NavigationNode = {
  type: 'folder',
  name: 'Inputs',
  path: '/inputs',
  icon: IconForms,
  children: [
    {
      type: 'link',
      name: 'TextField',
      path: '/text-field',
      page: TextFieldPage,
    },
  ],
};
