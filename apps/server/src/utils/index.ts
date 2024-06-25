import { randomBytes } from 'crypto';
import configuration from 'src/config/configuration';

export function generateRandomMagicString(length: number): string {
  return randomBytes(length).toString('hex');
}

export function getVerficicationUrl() {
  const config = configuration();
  const uri = '/user/verify';
  if (config.development) return `http://localhost:3001` + uri;
  else return `https://${config.root_domain}` + uri;
}

export function getPublicUrl() {
  const config = configuration();
  if (config.development) return `http://localhost:3001`;
  else return `https://${config.root_domain}`;
}


