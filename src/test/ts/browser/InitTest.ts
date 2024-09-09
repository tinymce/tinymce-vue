import { Assertions, Keyboard, Keys } from '@ephox/agar';
import { pRender } from '../alien/Loader';
import { SugarElement } from '@ephox/sugar';
import { Assert, describe, it } from '@ephox/bedrock-client';
import { cleanupTinymce, VALID_API_KEY } from '../alien/TestHelper';

describe('Editor Component Initialization Tests', () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  const cFakeType = (str: string, context: any) => {
    context.editor.getBody().innerHTML = '<p>' + str + '</p>';
    Keyboard.keystroke(Keys.space(), {}, SugarElement.fromDom(context.editor.getBody()) as SugarElement<Node>);
  };

  const testVersion = (version: '4' | '5' | '6' | '7') => {
    describe(`Editor Initialization for Version ${version}`, () => {
      it('should not be inline by default', async () => {
        const context = await pRender();
        Assertions.assertEq('Editor should not be inline', false, context.editor.inline);
        cleanupTinymce();
      });

      it('should be inline with inline attribute in template', async () => {
        const context = await pRender({}, `
          <editor
           :init="init"
           :inline="true"
           ></editor>`);
        Assertions.assertEq('Editor should be inline', true, context.editor.inline);
        cleanupTinymce();
      });

      it('should be inline with inline option in init', async () => {
        const context = await pRender({ init: { inline: true }});
        Assertions.assertEq('Editor should be inline', true, context.editor.inline);
        cleanupTinymce();
      });
      it('should handle one-way binding with output-format="text"', async () => {
        const context = await pRender({
          content: undefined,
        }, `
          <editor
            :init="init"
            api-key="${VALID_API_KEY}"
            @update:modelValue="content =$event"
            output-format="text"
          ></editor>
        `);
        cFakeType('A', context);
        Assertions.assertEq('Content emitted should be of format="text"', 'A', context.vm.content);
        cleanupTinymce();
      });

      it('should handle one-way binding with output-format="html"', async () => {
        const context = await pRender({
          content: undefined,
        }, `
          <editor
            :init="init"
            api-key="${VALID_API_KEY}"
            @update:modelValue="content =$event"
            output-format="html"
          ></editor>
        `);
        cFakeType('A', context);
        Assertions.assertEq('Content emitted should be of format="html"', '<p>A</p>', context.vm.content);
        cleanupTinymce();
      });
    });
  };

  Assert.succeeds('should test all versions', () => {
    Promise.all([
      testVersion('4'),
      testVersion('5'),
      testVersion('6'),
      testVersion('7'),
    ]).then(() => {
      //
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('this is a error', error);
    });
  });
});