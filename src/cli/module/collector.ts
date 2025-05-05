import fs from 'node:fs';
import path from 'node:path';
import type { Module } from '../schema/module';
import { fileHash } from '../utility/file-hash';

export class ModuleCollector {
  #module: Module = {
    name: '',
    files: [],
    dependencies: [],
    devDependencies: [],
    moduleDependencies: [],
  };

  constructor(...name: string[]) {
    this.#module.name = name.join(':');
  }

  get #source() {
    return path.resolve('./src');
  }

  get module() {
    return this.#module;
  }

  addDependencies(...dependencies: string[]) {
    this.#module.dependencies.push(...dependencies);
  }

  addDevDependencies(...dependencies: string[]) {
    this.#module.devDependencies.push(...dependencies);
  }

  addModuleDependencies(...dependencies: string[]) {
    this.#module.moduleDependencies.push(...dependencies);
  }

  addFiles(pathToDirectory: string) {
    const directory = path.resolve(this.#source, pathToDirectory);

    for (const filePath of fs.globSync(`${directory}/**/*`)) {
      this.addFile(filePath, true);
    }
  }

  addFile(pathToFile: string, absolute = false) {
    const filePath = absolute
      ? pathToFile
      : path.resolve(this.#source, pathToFile);
    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });

    this.#module.files.push({
      path: `${filePath.slice(this.#source.length + 1)}`,
      content,
      hash: fileHash(content),
    });
  }

  addAppendToFile(pathToFile: string, content: string) {
    this.#module.files.push({
      path: pathToFile,
      content,
      hash: 'append',
    });
  }
}
