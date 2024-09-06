import { Assertions, Keyboard, Keys } from '@ephox/agar';
import { pRender, remove } from '../alien/Loader';
import { SugarElement } from '@ephox/sugar';
import { Assert, describe, it } from '@ephox/bedrock-client';

describe('Editor Component Initialization Tests', () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  const cFakeType = async (str: string, context: any) => {
    context.editor.getBody().innerHTML = '<p>' + str + '</p>';
    Keyboard.keystroke(Keys.space(), {}, SugarElement.fromDom(context.editor.getBody()) as SugarElement<Node>);
  };

  const testVersion = (version: '4' | '5' | '6' | '7') => {
    describe(`Editor Initialization for Version ${version}`, () => {
      it('should not be inline by default', async () => {
        const context = await pRender();
        Assertions.assertEq('Editor should not be inline', false, context.editor.inline);
        remove();
      });

      it('should be inline with inline attribute in template', async () => {
        const context = await pRender({}, `<editor :init="init" :inline="true"></editor>`);
        Assertions.assertEq('Editor should be inline', true, context.editor.inline);
        remove();
      });

      it('should be inline with inline option in init', async () => {
        const context = await pRender({ init: { inline: true }});
        Assertions.assertEq('Editor should be inline', true, context.editor.inline);
        remove();
      });

      it('should handle one-way binding with output-format="text"', async () => {
        const context = await pRender({
          content: ''
        }, `
          <editor
            :init="init"
            @update:modelValue="content = $event"
            output-format="text"
          ></editor>
        `);
        // Should we use type instead of cFakeType?
        await cFakeType('A', context);
        Assertions.assertEq('Content emitted should be of format="text"', 'A', context.vm.content);
        remove();
      });

      it('should handle one-way binding with output-format="html"', async () => {
        const context = await pRender({
          content: ''
        }, `
          <editor
            :init="init"
            v-model="content"
            output-format="html"
          ></editor>
        `);
        await cFakeType('A', context);
        Assertions.assertEq('Content emitted should be of format="html"', '<p>A</p>', context.vm.content);
        remove();
      });
      // Original test
      // it('should handle one-way binding with output-format="text"', async () => {
      //   const context = await pRender({
      //     content: ''
      //   }, `
      //     <editor
      //       :init="init"
      //       @update:modelValue="content = $event"
      //       output-format="text"
      //     ></editor>
      //   `);
      //   await cFakeType('A', context);
      //   Assertions.assertEq('Content emitted should be of format="text"', 'A', context.vm.content);
      //   remove();
      // });

      // it('should handle one-way binding with output-format="html"', async () => {
      //   const context = await pRender({
      //     content: ''
      //   }, `
      //     <editor
      //       :init="init"
      //       v-model="content"
      //       output-format="html"
      //     ></editor>
      //   `);
      //   await cFakeType('A', context);
      //   Assertions.assertEq('Content emitted should be of format="html"', '<p>A</p>', context.vm.content);
      //   remove();
      // });
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