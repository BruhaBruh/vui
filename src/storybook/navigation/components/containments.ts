import {
  CardPage,
  CarouselPage,
  ContainerPage,
  DialogPage,
  DividerPage,
  ModalPage,
  PopoverPage,
} from '@/storybook/pages';
import type { NavigationNode } from '../navigation.types';

export const containments: NavigationNode = {
  type: 'folder',
  name: 'Containments',
  path: '/containments',
  icon: 'tabler:square-rounded',
  children: [
    {
      type: 'link',
      name: 'Divider',
      path: '/divider',
      page: DividerPage,
    },
    {
      type: 'link',
      name: 'Container',
      path: '/container',
      page: ContainerPage,
    },
    {
      type: 'link',
      name: 'Card',
      path: '/card',
      page: CardPage,
    },
    {
      type: 'link',
      name: 'Popover',
      path: '/popover',
      page: PopoverPage,
    },
    {
      type: 'link',
      name: 'Modal',
      path: '/modal',
      page: ModalPage,
    },
    {
      type: 'link',
      name: 'Dialog',
      path: '/dialog',
      page: DialogPage,
    },
    {
      type: 'link',
      name: 'Carousel',
      path: '/carousel',
      page: CarouselPage,
    },
  ],
};
