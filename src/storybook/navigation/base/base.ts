import {
  DurationPage,
  EasingPage,
  ElevationPage,
  PalettePage,
  RadiusPage,
  TypographyPage,
} from '@/storybook/pages';
import type { NavigationNode } from '../navigation.types';

export const base: NavigationNode = {
  type: 'folder',
  name: 'Base',
  path: '/base',
  children: [
    {
      type: 'link',
      name: 'Duration',
      path: '/duration',
      icon: 'tabler:time-duration-30',
      page: DurationPage,
    },
    {
      type: 'link',
      name: 'Easing',
      path: '/easing',
      icon: 'tabler:ease-in-out',
      page: EasingPage,
    },
    {
      type: 'link',
      name: 'Elevation',
      path: '/elevation',
      icon: 'tabler:shadow',
      page: ElevationPage,
    },
    {
      type: 'link',
      name: 'Palette',
      path: '/palette',
      icon: 'tabler:palette',
      page: PalettePage,
    },
    {
      type: 'link',
      name: 'Radius',
      path: '/radius',
      icon: 'tabler:border-radius',
      page: RadiusPage,
    },
    {
      type: 'link',
      name: 'Typography',
      path: '/typography',
      icon: 'tabler:typography',
      page: TypographyPage,
    },
  ],
};
