import { Assertions } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock-client';
import { isValidKey } from 'src/main/ts/Utils';

UnitTest.test('UtilsTest', () => {

  const checkValidKey = (key: string, expected: boolean) => {
    const actual = isValidKey(key);
    Assertions.assertEq('Key is valid', expected, actual);
  };

  checkValidKey('onKeyUp', true);
  checkValidKey('onkeyup', true);
  checkValidKey('onDisable', false);
});