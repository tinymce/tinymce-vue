import { Assertions, Keyboard, Keys, Waiter } from '@ephox/agar';
import { pRender } from '../alien/Loader';
import { SugarElement } from '@ephox/sugar';
import { describe, it, afterEach } from '@ephox/bedrock-client';
import { cleanupTinymce, VALID_API_KEY } from '../alien/TestHelper';

describe('Editor Component Initialization Tests', () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  const pFakeType = async (str: string, vmContext: any) => {
    vmContext.editor.getBody().innerHTML = '<p>' + str + '</p>';
    Keyboard.keystroke(Keys.space(), {}, SugarElement.fromDom(vmContext.editor.getBody()) as SugarElement<Node>);
  };
  afterEach(() => {
    cleanupTinymce();
  });
  it('should not be inline by default', async () => {
    const vmContext = await pRender({}, `
      <editor
        :init="init"
        ></editor>`);
    Assertions.assertEq('Editor should not be inline', false, vmContext.editor.inline);
  });

  it('should be inline with inline attribute in template', async () => {
    const vmContext = await pRender({}, `
      <editor
        :init="init"
        :inline="true"
        ></editor>`);
    Assertions.assertEq('Editor should be inline', true, vmContext.editor.inline);
  });

  it('should be inline with inline option in init', async () => {
    const vmContext = await pRender({ init: { inline: true }});
    Assertions.assertEq('Editor should be inline', true, vmContext.editor.inline);
  });
  it('should handle one-way binding with output-format="text"', async () => {
    const vmContext = await pRender({
      content: undefined,
    }, `
      <editor
        :init="init"
        api-key="${VALID_API_KEY}"
        @update:modelValue="content =$event"
        output-format="text"
      ></editor>
    `);
    await pFakeType('A', vmContext);
    await Waiter.pWait(100);
    Assertions.assertEq('Content emitted should be of format="text"', 'A', vmContext.vm.content);
  });

  it('should handle one-way binding with output-format="html"', async () => {
    const vmContext = await pRender({
      content: undefined,
    }, `
      <editor
        :init="init"
        api-key="${VALID_API_KEY}"
        @update:modelValue="content =$event"
        output-format="html"
      ></editor>
    `);
    await pFakeType('A', vmContext);
    await Waiter.pWait(100);
    Assertions.assertEq('Content emitted should be of format="html"', '<p>A</p>', vmContext.vm.content);
  });
});