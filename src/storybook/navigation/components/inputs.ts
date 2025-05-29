import {
  MaskFieldPage,
  NumberFieldPage,
  SearchBarPage,
  TextAreaFieldPage,
  TextFieldPage,
} from '@/storybook/pages';
import type { NavigationNode } from '../navigation.types';

export const inputs: NavigationNode = {
  type: 'folder',
  name: 'Inputs',
  path: '/inputs',
  icon: 'tabler:forms',
  children: [
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
      name: 'NumberField',
      path: '/number-field',
      page: NumberFieldPage,
    },
    {
      type: 'link',
      name: 'MaskField',
      path: '/mask-field',
      page: MaskFieldPage,
    },
    {
      type: 'link',
      name: 'SearchBar',
      path: '/search-bar',
      page: SearchBarPage,
    },
  ],
};
