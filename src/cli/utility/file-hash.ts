import crypto from 'node:crypto';

export function fileHash(content: string) {
  const hash = crypto.createHash('sha256');
  hash.update(content);
  return hash.digest('hex')
};
