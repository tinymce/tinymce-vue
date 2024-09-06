import { Assertions, UiFinder, Waiter } from '@ephox/agar';
import { describe, beforeEach, afterEach, it } from '@ephox/bedrock-client';
import { Context } from 'vm';
import { getRoot, pRender, remove } from '../alien/Loader';

describe('Editor Component Tests', () => {
  let context: Context;

  beforeEach(async () => {
    context = await pRender();
  });

  afterEach(() => {
    remove();
  });

  it('should render the editor with the given data and template', async () => {
    Assertions.assertEq('Vue instance should exist', true, !!context.vm);
    Assertions.assertEq('Vue instance should have a DOM element', true, context.vm.$el instanceof window.HTMLElement);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const textareaResult = UiFinder.findIn(context.vm.$el, 'textarea');
    textareaResult.fold(
      () => Assertions.assertEq('Textarea element should exist', true, false),
      () => Assertions.assertEq('Textarea element should exist', true, true)
    );

    await Waiter.pTryUntil('Wait for the editor to load the skin', () => {
      Assertions.assertEq('Editor instance should exist', true, !!context.editor);
    });
  });

  it('should remove the editor component from the DOM', () => {
    remove();
    const root = getRoot();
    Assertions.assertEq(
      'Root element should not contain any child nodes after removal',
      true,
      root.dom.childNodes.length === 0
    );
  });
});
