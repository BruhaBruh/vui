import {
  CheckboxPage,
  MenuPage,
  RadioPage,
  SliderPage,
  SwitchPage,
} from '@/storybook/pages';
import type { NavigationNode } from '../navigation.types';

export const selections: NavigationNode = {
  type: 'folder',
  name: 'Selections',
  path: '/selections',
  icon: 'tabler:square-check',
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
    {
      type: 'link',
      name: 'Slider',
      path: '/slider',
      page: SliderPage,
    },
    {
      type: 'link',
      name: 'Menu',
      path: '/menu',
      page: MenuPage,
    },
  ],
};
