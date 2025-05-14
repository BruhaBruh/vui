import type { NavigationNode } from '../navigation.types';
import { actions } from './actions';

export const components: NavigationNode = {
  type: 'folder',
  name: 'Components',
  path: '/components',
  children: [
    actions,
    // communications,
    // containments,
    // inputs,
    // navigations,
    // selections,
  ],
};
