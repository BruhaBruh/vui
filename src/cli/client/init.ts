/// <reference types="node" />

import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import prompts from 'prompts';
import { configSchema } from '../schema/config';
import { highlighter } from '../utility/highlighter';
import { logger } from '../utility/logger';
import { withTrailingLine } from '../utility/with-trailing-line';

export const init = new Command()
  .command('init')
  .description('Generate config')
  .option('-o, --output', 'Output of registry', './vui.config.json')
  .action(async ({ output }) => {
    const rawConfig = await prompts([
      {
        type: 'text',
        name: 'registry',
        message: `Registry destination:`,
        initial: 'https://vui.bruhabruh.ru/registry.json',
      },
      {
        type: 'text',
        name: 'directory',
        message: `Configure the destination for @bruhabruh/vui:`,
        initial: 'src/shared/bruhabruh-vui',
      },
      {
        type: 'text',
        name: 'alias',
        message: `Configure the import alias for @bruhabruh/vui:`,
        initial: '@/shared/bruhabruh-vui',
      },
    ]);

    const parseResult = configSchema.safeParse(rawConfig);
    if (parseResult.error) {
      logger.log(highlighter.info('ERROR'), `Invalid config input data`);
      logger.error(JSON.stringify(parseResult.error, null, 2));
      logger.break();
      process.exit(1);
    }
    const config = parseResult.data;

    const pathToFile = path.resolve(output);
    const directoryOfFile = path.dirname(pathToFile);

    logger.log(
      highlighter.info('INFO'),
      `Generate config with ${highlighter.info(output)} output`,
    );

    logger.log(highlighter.info('INFO'), 'Make directories recurively');
    await fs.mkdir(directoryOfFile, { recursive: true });

    logger.log(highlighter.info('INFO'), 'Write config to output');
    const fileContent = JSON.stringify(
      { $schema: 'https://vui.bruhabruh.ru/config.schema.json', ...config },
      null,
      2,
    );
    await fs.writeFile(pathToFile, withTrailingLine(fileContent));

    logger.log(
      highlighter.success('SUCCESS'),
      `Config successfully saved at ${highlighter.info(pathToFile)}`,
    );
    logger.break();
  });
