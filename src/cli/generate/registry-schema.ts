/// <reference types="node" />

import { Command } from 'commander';
import fs from 'node:fs/promises';
import path from 'node:path';
import z from 'zod';
import { basicRegistrySchema } from '../schema/registry';
import { highlighter } from '../utility/highlighter';
import { logger } from '../utility/logger';
import { withTrailingLine } from '../utility/with-trailing-line';

export const generateRegistrySchema = new Command()
  .command('registry-schema')
  .description('Generate registry schema')
  .option('-o, --output', 'Output of schema', './public/registry.schema.json')
  .action(async ({ output }) => {
    const pathToFile = path.resolve(output);
    const directoryOfFile = path.dirname(pathToFile);

    logger.log(
      highlighter.info('INFO'),
      `Generate config json schema with ${highlighter.info(output)} output`,
    );

    logger.log(highlighter.info('INFO'), 'Make directories recurively');
    await fs.mkdir(directoryOfFile, { recursive: true });

    logger.log(highlighter.info('INFO'), 'Generate json schema');
    const jsonSchema = z.toJSONSchema(basicRegistrySchema, {
      io: 'input',
      target: 'draft-7',
      unrepresentable: 'throw',
      reused: 'ref',
    });

    logger.log(highlighter.info('INFO'), 'Write json schema to output');
    const fileContent = JSON.stringify(jsonSchema, null, 2);
    await fs.writeFile(pathToFile, withTrailingLine(fileContent));

    logger.log(
      highlighter.success('SUCCESS'),
      `Config json schema successfully saved at ${highlighter.info(pathToFile)}`,
    );
    logger.break();
  });
