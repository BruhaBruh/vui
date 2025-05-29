import { ModuleCollector } from '../module/collector';
import type { Module } from '../schema/module';
import type { Registry } from '../schema/registry';

export class RegistryCollector {
  #registry: Registry = {
    dependecyVersions: {
      '@floating-ui/vue': '^1.1.6',
      '@iconify/vue': '^5.0.0',
      '@vueuse/core': '^13.1.0',
      '@vueuse/integrations': '^13.1.0',
      'class-variance-authority': '^0.7.1',
      'embla-carousel-vue': '^8.3.0',
      'focus-trap': '^7.6.4',
      'motion-v': '^1.0.1',
      'tailwind-merge-vue-directive': '^2.0.5',
      '@tailwindcss/vite': '^4.1.5',
      tailwindcss: '^4.1.5',
      '@bruhabruh/type-safe': '^1.2.3',
    },
    modules: [],
    moduleDependencies: ['config', 'tailwind'],
  };

  get registry() {
    return this.#registry;
  }

  async collect() {
    await Promise.all([
      this.collectComponents(),
      this.collectComposables(),
      this.collectConfig(),
      this.collectTailwind(),
      this.collectTypes(),
    ]);
  }

  private async collectComponents() {
    const componentsCollector = new ModuleCollector('components');
    componentsCollector.addModuleDependencies('components:actions');
    this.addModule(componentsCollector);

    const actionsCollector = new ModuleCollector('components', 'actions');
    actionsCollector.addAppendToFile(
      'components/index.ts',
      `export * from './actions';`,
    );
    actionsCollector.addModuleDependencies(
      'components:actions:button',
      'components:actions:extended-fab',
      'components:actions:fab',
      'components:actions:icon-button',
      'components:actions:segmented-button',
    );
    this.addModule(actionsCollector);

    const buttonCollector = new ModuleCollector(
      'components',
      'actions',
      'button',
    );
    buttonCollector.addFiles('components/actions/ui-button');
    buttonCollector.addAppendToFile(
      'components/actions/index.ts',
      `export * from './ui-button';`,
    );
    buttonCollector.addDependencies('motion-v');
    buttonCollector.addModuleDependencies(
      'composables:use-button',
      'composables:use-ripple',
      'config',
      'types:props',
    );
    this.addModule(buttonCollector);

    const extendedFabCollector = new ModuleCollector(
      'components',
      'actions',
      'extended-fab',
    );
    extendedFabCollector.addFiles('components/actions/ui-extended-fab');
    extendedFabCollector.addAppendToFile(
      'components/actions/index.ts',
      `export * from './ui-extended-fab';`,
    );
    extendedFabCollector.addDependencies('motion-v');
    extendedFabCollector.addModuleDependencies(
      'composables:use-button',
      'composables:use-ripple',
      'config',
      'types:props',
    );
    this.addModule(extendedFabCollector);

    const fabCollector = new ModuleCollector('components', 'actions', 'fab');
    fabCollector.addFiles('components/actions/ui-fab');
    fabCollector.addAppendToFile(
      'components/actions/index.ts',
      `export * from './ui-fab';`,
    );
    fabCollector.addDependencies('motion-v');
    fabCollector.addModuleDependencies(
      'composables:use-button',
      'composables:use-ripple',
      'config',
      'types:props',
    );
    this.addModule(fabCollector);

    const iconButtonCollector = new ModuleCollector(
      'components',
      'actions',
      'icon-button',
    );
    iconButtonCollector.addFiles('components/actions/ui-icon-button');
    iconButtonCollector.addAppendToFile(
      'components/actions/index.ts',
      `export * from './ui-icon-button';`,
    );
    iconButtonCollector.addDependencies('motion-v');
    iconButtonCollector.addModuleDependencies(
      'composables:use-toggle-button',
      'composables:use-ripple',
      'config',
      'types:props',
    );
    this.addModule(iconButtonCollector);

    const segmentedButtonCollector = new ModuleCollector(
      'components',
      'actions',
      'segmented-button',
    );
    segmentedButtonCollector.addFiles('components/actions/ui-segmented-button');
    segmentedButtonCollector.addAppendToFile(
      'components/actions/index.ts',
      `export * from './ui-segmented-button';`,
    );
    segmentedButtonCollector.addDependencies('motion-v', '@vueuse/core');
    segmentedButtonCollector.addDevDependencies('@iconify/vue');
    segmentedButtonCollector.addModuleDependencies(
      'composables:use-toggle-button',
      'composables:use-ripple',
      'config',
      'types',
    );
    this.addModule(segmentedButtonCollector);

    const communicationsCollector = new ModuleCollector(
      'components',
      'communications',
    );
    communicationsCollector.addAppendToFile(
      'components/index.ts',
      `export * from './communications';`,
    );
    communicationsCollector.addModuleDependencies(
      'components:communications:badge',
      'components:communications:tooltip',
    );
    this.addModule(communicationsCollector);

    const badgeCollector = new ModuleCollector(
      'components',
      'communications',
      'badge',
    );
    badgeCollector.addFiles('components/communications/ui-badge');
    badgeCollector.addAppendToFile(
      'components/communications/index.ts',
      `export * from './ui-badge';`,
    );
    badgeCollector.addDependencies('motion-v');
    badgeCollector.addModuleDependencies('config', 'types:props');
    this.addModule(badgeCollector);

    const tooltipCollector = new ModuleCollector(
      'components',
      'communications',
      'tooltip',
    );
    tooltipCollector.addFiles('components/communications/ui-tooltip');
    tooltipCollector.addAppendToFile(
      'components/communications/index.ts',
      `export * from './ui-tooltip';`,
    );
    tooltipCollector.addDependencies('motion-v', '@floating-ui/vue');
    tooltipCollector.addModuleDependencies(
      'config',
      'types',
      'components:utility:slot',
    );
    this.addModule(tooltipCollector);

    const containmentsCollector = new ModuleCollector(
      'components',
      'containments',
    );
    containmentsCollector.addAppendToFile(
      'components/index.ts',
      `export * from './containments';`,
    );
    containmentsCollector.addModuleDependencies(
      'components:containments:card',
      'components:containments:carousel',
      'components:containments:container',
      'components:containments:dialog',
      'components:containments:divider',
      'components:containments:modal',
      'components:containments:popover',
    );
    this.addModule(containmentsCollector);
  }

  private async collectComposables() {
    const composablesCollector = new ModuleCollector('composables');
    composablesCollector.addModuleDependencies(
      'composables:use-button',
      'composables:use-carousel',
      'composables:use-interactions',
      'composables:use-ripple',
      'composables:use-toggle-button',
    );
    const useButtonCollector = new ModuleCollector('composables', 'use-button');
    useButtonCollector.addFile('composables/use-button.ts');
    useButtonCollector.addAppendToFile(
      'composables/index.ts',
      `export * from './use-button';`,
    );
    useButtonCollector.addModuleDependencies('composables:use-interactions');

    const useCarouselCollector = new ModuleCollector(
      'composables',
      'use-carousel',
    );
    useCarouselCollector.addFile('composables/use-carousel.ts');
    useCarouselCollector.addAppendToFile(
      'composables/index.ts',
      `export * from './use-carousel';`,
    );
    useCarouselCollector.addDependencies('embla-carousel-vue');

    const useInteractionsCollector = new ModuleCollector(
      'composables',
      'use-interactions',
    );
    useInteractionsCollector.addFile('composables/use-interactions.ts');
    useInteractionsCollector.addAppendToFile(
      'composables/index.ts',
      `export * from './use-interactions';`,
    );
    useInteractionsCollector.addDependencies('@vueuse/core');

    const useRippleCollector = new ModuleCollector('composables', 'use-ripple');
    useRippleCollector.addFile('composables/use-ripple.ts');
    useRippleCollector.addAppendToFile(
      'composables/index.ts',
      `export * from './use-ripple';`,
    );
    useRippleCollector.addDependencies('@vueuse/core', 'motion-v');

    const useToggleButtonCollector = new ModuleCollector(
      'composables',
      'use-toggle-button',
    );
    useToggleButtonCollector.addFile('composables/use-toggle-button.ts');
    useToggleButtonCollector.addAppendToFile(
      'composables/index.ts',
      `export * from './use-toggle-button';`,
    );
    useToggleButtonCollector.addDependencies('@vueuse/core');
    useToggleButtonCollector.addModuleDependencies('composables:use-button');

    this.addModule(
      useButtonCollector,
      useCarouselCollector,
      useInteractionsCollector,
      useRippleCollector,
      useToggleButtonCollector,
    );
  }

  private async collectConfig() {
    const collector = new ModuleCollector('config');
    collector.addFiles('config');
    this.addModule(collector);
  }

  private async collectTailwind() {
    const collector = new ModuleCollector('tailwind');
    collector.addFiles('tailwind');
    collector.addDependencies(
      'tailwind-merge-vue-directive',
      'class-variance-authority',
    );
    collector.addDevDependencies('tailwindcss', '@tailwindcss/vite');

    this.addModule(collector);
  }

  private async collectTypes() {
    const typesCollector = new ModuleCollector('types');
    typesCollector.addModuleDependencies('types:props', 'types:context');

    const propsCollector = new ModuleCollector('types', 'props');
    propsCollector.addFile('types/props.ts');
    propsCollector.addAppendToFile(
      'types/index.ts',
      `export * from './props';`,
    );

    const contextCollector = new ModuleCollector('types', 'context');
    contextCollector.addFile('types/context.ts');
    contextCollector.addAppendToFile(
      'types/index.ts',
      `export * from './context';`,
    );
    contextCollector.addDevDependencies('@bruhabruh/type-safe');

    this.addModule(typesCollector, propsCollector, contextCollector);
  }

  private addModule(...modules: (Module | ModuleCollector)[]) {
    for (const module of modules) {
      if (module instanceof ModuleCollector) {
        this.#registry.modules.push(module.module);
      } else {
        this.#registry.modules.push(module);
      }
    }
  }
}
