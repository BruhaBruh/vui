import {
  DurationPage,
  EasingPage,
  ElevationPage,
  PalettePage,
  RadiusPage,
  TypographyPage,
} from '@/storybook/pages';
import {
  IconBorderRadius,
  IconEaseInOut,
  IconPalette,
  IconShadow,
  IconTimeDuration30,
  IconTypography,
} from '@tabler/icons-vue';
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
      icon: IconTimeDuration30,
      page: DurationPage,
    },
    {
      type: 'link',
      name: 'Easing',
      path: '/easing',
      icon: IconEaseInOut,
      page: EasingPage,
    },
    {
      type: 'link',
      name: 'Elevation',
      path: '/elevation',
      icon: IconShadow,
      page: ElevationPage,
    },
    {
      type: 'link',
      name: 'Palette',
      path: '/palette',
      icon: IconPalette,
      page: PalettePage,
    },
    {
      type: 'link',
      name: 'Radius',
      path: '/radius',
      icon: IconBorderRadius,
      page: RadiusPage,
    },
    {
      type: 'link',
      name: 'Typography',
      path: '/typography',
      icon: IconTypography,
      page: TypographyPage,
    },
  ],
};
