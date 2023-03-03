import { randomUUID } from 'crypto';

export function GetRandom() {
  return { random: randomUUID() };
}
