import fs from 'fs';
import path from 'path';
import type { BasicRegistry } from '../schema/registry';
import { fileHash } from '../utility/file-hash';

export class BasicRegistryCollector {
  #registry: BasicRegistry = {
    dependecyVersions: {
      '@floating-ui/vue': '^1.1.6',
      '@tabler/icons-vue': '^3.31.0',
      '@vueuse/core': '^13.1.0',
      '@vueuse/integrations': '^13.1.0',
      'class-variance-authority': '^0.7.1',
      'embla-carousel-vue': '^8.3.0',
      'focus-trap': '^7.6.4',
      'motion-v': '^1.0.1',
      'tailwind-merge-vue-directive': '^2.0.5',
      '@bruhabruh/type-safe': '^1.2.3',
      '@tailwindcss/vite': '^4.1.5',
      tailwindcss: '^4.1.5',
    },
    dependencies: [
      '@floating-ui/vue',
      '@tabler/icons-vue',
      '@vueuse/core',
      '@vueuse/integrations',
      'class-variance-authority',
      'embla-carousel-vue',
      'focus-trap',
      'motion-v',
      'tailwind-merge-vue-directive',
    ],
    devDependencies: [
      '@bruhabruh/type-safe',
      '@tailwindcss/vite',
      'tailwindcss',
    ],
    files: [],
  };

  get registry() {
    return this.#registry;
  }

  get #source() {
    return path.resolve('./src');
  }

  async collect() {
    this.addFile('index.ts');
    this.addFiles('components');
    this.addFiles('composables');
    this.addFiles('config');
    this.addFiles('tailwind');
    this.addFiles('types');
  }

  private addFiles(pathToDirectory: string) {
    const directory = path.resolve(this.#source, pathToDirectory);

    for (const filePath of fs.globSync(`${directory}/**/*`)) {
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) continue;
      this.addFile(filePath, true);
    }
  }

  private addFile(pathToFile: string, absolute = false) {
    const filePath = absolute
      ? pathToFile
      : path.resolve(this.#source, pathToFile);
    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });

    this.#registry.files.push({
      path: `${filePath.slice(this.#source.length + 1)}`,
      content,
      hash: fileHash(content),
    });
  }
}
