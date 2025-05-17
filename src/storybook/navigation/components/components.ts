import type { NavigationNode } from '../navigation.types';
import { actions } from './actions';
import { communications } from './communcations';
import { containments } from './containments';

export const components: NavigationNode = {
  type: 'folder',
  name: 'Components',
  path: '/components',
  children: [
    actions,
    communications,
    containments,
    // inputs,
    // navigations,
    // selections,
  ],
};
