import { IconSquare } from '@tabler/icons-vue';
import {
  CardPage,
  ContainerPage,
  DividerPage,
  ModalPage,
  PopoverPage,
} from '../../pages';
import type { NavigationNode } from '../navigation.types';

export const containments: NavigationNode = {
  type: 'folder',
  name: 'Containments',
  path: '/containments',
  icon: IconSquare,
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
  ],
};
