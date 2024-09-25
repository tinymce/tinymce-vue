import { Assertions } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { isValidKey } from 'src/main/ts/Utils';

describe('UtilsTest', () => {
  const checkValidKey = (key: string, expected: boolean) => {
    const actual = isValidKey(key);
    Assertions.assertEq('Key is valid', expected, actual);
  };

  it('should check if key is valid onKeyUp', () => {
    checkValidKey('onKeyUp', true);
  });

  it('should check if key is valid onkeyup', () => {
    checkValidKey('onkeyup', true);
  });

  it('should check if key is valid onDisable', () => {
    checkValidKey('onDisable', false);
  });
});