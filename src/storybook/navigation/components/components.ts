import type { NavigationNode } from '../navigation.types';
import { actions } from './actions';
import { communications } from './communcations';
import { containments } from './containments';
import { inputs } from './inputs';
import { navigations } from './navigations';
import { selections } from './selections';

export const components: NavigationNode = {
  type: 'folder',
  name: 'Components',
  path: '/components',
  children: [
    actions,
    communications,
    containments,
    inputs,
    navigations,
    selections,
  ],
};
