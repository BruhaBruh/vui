/// <reference types="node" />

import { Command } from 'commander';
import packageJson from '../../../package.json';
import { init } from './init';
import { install } from './install';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const program = new Command()
    .name('@bruhabruh/vui-cli')
    .description('CLI utility for @bruhabruh/vui')
    .version(
      packageJson.version || '1.0.0',
      '-v, --version',
      'display the version number',
    );

  program.addCommand(init).addCommand(install);

  program.parse();
}

main();
