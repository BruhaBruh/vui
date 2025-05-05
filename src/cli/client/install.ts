/// <reference types="node" />

import { Command } from 'commander';
import fs from 'fs';
import ora from 'ora';
import path from 'path';
import { type Config, configSchema } from '../schema/config';
import { type BasicRegistry, basicRegistrySchema } from '../schema/registry';
import { addDependencies } from '../utility/add-dependencies';
import { getPackageManager } from '../utility/get-package-manager';
import { highlighter } from '../utility/highlighter';
import { logger } from '../utility/logger';

export const install = new Command()
  .command('install')
  .description('Install components and dependencies')
  .option('-c, --config', 'Configuration file.', 'vui.config.json')
  .action(async ({ config: configPath }) => {
    if (!fs.existsSync(configPath)) {
      logger.log(
        `${highlighter.error('ERROR')} Project must be initialized by running ${highlighter.info('pnpm dlx @bruhabruh / vui init')}`,
      );
      return;
    }

    const rawConfig = JSON.parse(
      fs.readFileSync(path.resolve(configPath), { encoding: 'utf-8' }),
    );

    const parseConfigResult = configSchema.safeParse(rawConfig);
    if (parseConfigResult.error) {
      logger.log(highlighter.info('ERROR'), `Invalid config`);
      logger.error(JSON.stringify(parseConfigResult.error, null, 2));
      logger.break();
      process.exit(1);
    }
    const config = parseConfigResult.data;

    const registrySpinner = ora(`Getting registry`).start();
    const rawRegistry = await fetch(config.registry).then((r) => r.json());
    registrySpinner.succeed();
    const parseRegistryResult = basicRegistrySchema.safeParse(rawRegistry);
    if (parseRegistryResult.error) {
      logger.log(highlighter.info('ERROR'), `Invalid registry`);
      logger.error(JSON.stringify(parseRegistryResult.error, null, 2));
      logger.break();
      process.exit(1);
    }
    const registry = parseRegistryResult.data;

    await installDependencies(registry);

    await addFiles(registry, config);

    logger.log(
      highlighter.success('SUCCESS'),
      `@bruhabruh/vui successfully installed`,
    );
    logger.break();
  });

function getPackageJson() {
  const data = fs.readFileSync('package.json', { encoding: 'utf-8' });
  return JSON.parse(data);
}

async function installDependencies(registry: BasicRegistry) {
  const packageManager = await getPackageManager(process.cwd());

  const packageJson = getPackageJson();

  const installedDependencies = Object.keys(packageJson.dependencies);
  const installedDevDependencies = Object.keys(packageJson.devDependencies);

  const dependencies = registry.dependencies.filter(
    (dependency) => !installedDependencies.includes(dependency),
  );

  const devDependencies = registry.devDependencies.filter(
    (dependency) =>
      !installedDependencies.includes(dependency) &&
      !installedDevDependencies.includes(dependency),
  );

  if (dependencies.length > 0) {
    const spinner = ora(
      `Installing ${dependencies.join(', ')} dependencies`,
    ).start();
    try {
      await addDependencies(
        dependencies.map((v) => `${v}@${registry.dependecyVersions[v]}`),
        packageManager,
      );
    } catch {
      logger.log(
        highlighter.error('ERROR'),
        `Fail install ${highlighter.info(dependencies.join(', '))} dependencies`,
      );
      spinner.succeed();
      process.exit(1);
    }
    spinner.succeed();
  }

  if (devDependencies.length > 0) {
    const spinner = ora(
      `Installing ${devDependencies.join(', ')} dev dependencies`,
    ).start();
    try {
      await addDependencies(
        devDependencies.map((v) => `${v}@${registry.dependecyVersions[v]}`),
        packageManager,
      );
    } catch {
      logger.log(
        highlighter.error('ERROR'),
        `Fail install ${highlighter.info(devDependencies.join(', '))} dev dependencies`,
      );
      spinner.succeed();
      process.exit(1);
    }
    spinner.succeed();
  }
}

async function addFiles(registry: BasicRegistry, config: Config) {
  const directory = config.directory;
  const importRegexp = /import (.*) from '@([^']+)';/gm;

  for (const file of registry.files) {
    const filePath = `${directory}/${file.path}`;
    if (fs.existsSync(filePath)) {
      logger.log(
        highlighter.warn('WARNING'),
        `File ${highlighter.info(filePath)} already exists. Backup...`,
      );
    }
    const fileSpinner = ora(`Adding ${filePath}`).start();
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const formattedContent = file.content.replace(
      importRegexp,
      `import $1 from '${config.alias}$2'`,
    );
    fs.writeFileSync(filePath, formattedContent);
    fileSpinner.succeed();
  }
}
