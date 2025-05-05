/// <reference types="node" />

import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import { BasicRegistryCollector } from '../registy/basic-collector';
import { highlighter } from '../utility/highlighter';
import { logger } from '../utility/logger';
import { withTrailingLine } from '../utility/with-trailing-line';

export const generateRegistry = new Command()
  .command('registry')
  .description('Generate registry')
  .option('-f, --fancy', 'Output with fancy formatting')
  .option('-o, --output', 'Output of registry', './public/registry.json')
  .action(async ({ output, fancy }) => {
    const pathToFile = path.resolve(output);
    const directoryOfFile = path.dirname(pathToFile);

    logger.log(
      highlighter.info('INFO'),
      `Generate registry with ${highlighter.info(output)} output`,
    );

    logger.log(highlighter.info('INFO'), 'Make directories recurively');
    await fs.mkdir(directoryOfFile, { recursive: true });

    logger.log(highlighter.info('INFO'), 'Collect registry info');
    const collector = new BasicRegistryCollector();
    await collector.collect();

    logger.log(highlighter.info('INFO'), 'Write registry to output');
    const fileContent = fancy
      ? JSON.stringify(collector.registry, null, 2)
      : JSON.stringify(collector.registry);
    await fs.writeFile(pathToFile, withTrailingLine(fileContent));

    logger.log(
      highlighter.success('SUCCESS'),
      `Registry successfully saved at ${highlighter.info(pathToFile)}`,
    );
    logger.break();
  });
