import { Assertions } from '@ephox/agar';
import { describe, it } from '@ephox/bedrock-client';
import { Arr } from '@ephox/katamari';
import { isValidKey } from 'src/main/ts/Utils';

describe('UtilsTest', () => {
  const checkValidKey = (key: string, expected: boolean) => {
    const actual = isValidKey(key);
    Assertions.assertEq('Key should be valid in both camelCase and lowercase', expected, actual);
  };

  // eslint-disable-next-line max-len
  // v-on event listeners inside DOM templates will be automatically transformed to lowercase (due to HTML’s case-insensitivity), so v-on:myEvent would become v-on:myevent. ref: https://eslint.vuejs.org/rules/custom-event-name-casing

  describe('Valid event name tests', () => {
    const validKeys = [
      { key: 'onKeyUp', description: 'camelCase event name "onKeyUp"' },
      { key: 'onkeyup', description: 'lowercase event name "onkeyup"' }
    ];

    Arr.each(validKeys, ({ key, description }) => {
      it(`should validate ${description}`, () => {
        checkValidKey(key, true);
      });
    });
  });

  it('should invalidate unknown event name "onDisable"', () => {
    checkValidKey('onDisable', false);
  });
});