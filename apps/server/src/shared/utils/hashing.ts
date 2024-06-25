import * as bcrypt from 'bcrypt';

export function genHash(input: string) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(input, salt);
  return hash;
}

export function verifyHash(input: string, hash: string) {
  return bcrypt.compareSync(input, hash);
}
