import uuidv1 from 'uuid/v1';

/**
 * @export
 * @returns {string}
 * @description 生成UUID
 */
export function uuid(): string {
  return uuidv1();
}
