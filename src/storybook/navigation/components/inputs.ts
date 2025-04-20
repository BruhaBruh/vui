import {
  MaskFieldPage,
  NumberFieldPage,
  TextAreaFieldPage,
  TextFieldPage,
} from '@/storybook/pages';
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
      name: 'NumberField',
      path: '/number-field',
      page: NumberFieldPage,
    },
    {
      type: 'link',
      name: 'TextField',
      path: '/text-field',
      page: TextFieldPage,
    },
    {
      type: 'link',
      name: 'TextAreaField',
      path: '/textarea-field',
      page: TextAreaFieldPage,
    },
    {
      type: 'link',
      name: 'MaskField',
      path: '/mask-field',
      page: MaskFieldPage,
    },
  ],
};
