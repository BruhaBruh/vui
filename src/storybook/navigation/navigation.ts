import { base } from './base';
import { components } from './components';
import type { NavigationNode } from './navigation.types';
import {
  computeNavigationByPath,
  computeNavigationPaths,
} from './navigation.utility';

const nodes: NavigationNode[] = [base, components];

export const navigation = computeNavigationPaths(nodes);

export const navigationByPath = computeNavigationByPath(nodes);
