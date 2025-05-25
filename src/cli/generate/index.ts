/// <reference types="node" />

import { Command } from 'commander';
import packageJson from '../../../package.json';
import { generateConfigSchema } from './config-schema';
import { generateRegistry } from './registry';
import { generateRegistrySchema } from './registry-schema';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
const originalEmitWarning = process.emitWarning;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(process.emitWarning as any) = function (...args: any[]): void {
  const warning = args[0];
  const type = typeof args[1] === 'string' ? args[1] : undefined;
  if (
    (typeof warning === 'object' && warning?.name === 'ExperimentalWarning') ||
    type === 'ExperimentalWarning'
  ) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalEmitWarning.apply(process, args as any);
};

async function main() {
  const program = new Command()
    .name('internal-cli')
    .description('CLI utility for internal use')
    .version(
      packageJson.version || '1.0.0',
      '-v, --version',
      'display the version number',
    );

  program
    .addCommand(generateConfigSchema)
    .addCommand(generateRegistrySchema)
    .addCommand(generateRegistry);

  program.parse();
}

main();
