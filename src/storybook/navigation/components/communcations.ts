import { BadgePage, TooltipPage } from '@/storybook/pages';
import { IconBroadcast } from '@tabler/icons-vue';
import type { NavigationNode } from '../navigation.types';

export const communications: NavigationNode = {
  type: 'folder',
  name: 'Communications',
  path: '/communications',
  icon: IconBroadcast,
  children: [
    {
      type: 'link',
      name: 'Badge',
      path: '/badge',
      page: BadgePage,
    },
    {
      type: 'link',
      name: 'Tooltip',
      path: '/tooltip',
      page: TooltipPage,
    },
  ],
};
