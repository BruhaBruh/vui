import { exec } from 'node:child_process';
import { logger } from './logger';

export const addDependencies = async (
  dependencies: string[],
  packageManager: 'yarn' | 'pnpm' | 'bun' | 'npm' | 'deno',
  isDev = false,
) => {
  let command = `npm i${isDev ? ' --save-dev' : ''} ${dependencies.join(' ')}`;
  if (packageManager === 'yarn') {
    command = `yarn add${isDev ? ' --dev' : ''} ${dependencies.join(' ')}`;
  } else if (packageManager === 'pnpm') {
    command = `pnpm add${isDev ? ' --save-dev' : ''} ${dependencies.join(' ')}`;
  } else if (packageManager === 'bun') {
    command = `bun add${isDev ? ' --dev' : ''} ${dependencies.join(' ')}`;
  } else if (packageManager === 'deno') {
    logger.error('Deno is not supported!');
    process.exit(1);
  }

  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Fail run command: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Error: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
};
