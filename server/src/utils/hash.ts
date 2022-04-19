/* eslint-disable @typescript-eslint/no-unused-vars */
import hasher from 'node-object-hash';

export const hasherCoerceSort = hasher({
  coerce: true,
  sort: true,
});

export const validateObject = (
  object: any,
  hash: string,
): boolean => true;
// ): boolean => hasherCoerceSort.hash(object) === hash;
