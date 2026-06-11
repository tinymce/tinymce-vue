import { Assertions, Keyboard, Keys, Waiter } from '@ephox/agar';
import { Arr } from '@ephox/katamari';
import { SugarElement } from '@ephox/sugar';
import { after, afterEach, before, context, describe, it } from '@ephox/bedrock-client';
import { VersionLoader } from '@tinymce/miniature';
import { getRoot, pRender, remove } from '../alien/Loader';
import { cleanupGlobalTinymce } from '../alien/TestHelper';

// Regression tests for https://github.com/tinymce/tinymce-vue/issues/131 and
// https://github.com/tinymce/tinymce-vue/issues/230.
//
// When an iframe editor is moved in the DOM (for example by a modal that relocates
// its content to <body> on open, or by Vue re-ordering the surrounding elements)
// the browser discards and recreates the iframe's document, leaving the editor
// blank and unresponsive. No Vue lifecycle hook fires for that move, so the
// component has to recover on its own. These tests move the editor and assert that
// it re-initializes and keeps its content.
describe('Editor reattach (modal "zombie") recovery tests', () => {

  // Move the node that hosts the editor (and therefore its iframe) under a new,
  // still-connected parent. Per the HTML specification this re-runs the iframe's
  // load steps, which is exactly what happens inside a modal.
  const reparentEditor = (editor: any) => {
    const mountPoint = editor.getElement().parentElement as HTMLElement;
    const newParent = document.createElement('div');
    getRoot().dom.appendChild(newParent);
    newParent.appendChild(mountPoint);
  };

  Arr.each([ '4', '5', '6', '7', '8' ], (version) => {
    context(`Version: ${version}`, () => {

      before(async () => {
        await VersionLoader.pLoadVersion(version);
      });

      after(() => {
        cleanupGlobalTinymce();
      });

      afterEach(() => {
        remove();
      });

      it('should re-initialize an iframe editor after it is detached and re-attached to the DOM', async () => {
        const editors: any[] = [];
        const vmContext = await pRender({
          init: {
            setup: (editor: any) => {
              editors.push(editor);
            }
          }
        }, `
          <editor
            :init="init"
            license-key="gpl"
          ></editor>`);

        const firstEditor = vmContext.editor;
        await Waiter.pTryUntil('The editor should be fully initialized', () => {
          Assertions.assertEq('Editor is initialized', true, firstEditor.initialized);
        });
        Assertions.assertEq('Only one editor should exist before re-attaching', 1, editors.length);

        firstEditor.setContent('<p>persisted content</p>');

        reparentEditor(firstEditor);

        await Waiter.pTryUntil('A new, fully initialized editor should be created after re-attaching', () => {
          Assertions.assertEq('A second editor was created', true, editors.length >= 2);
          Assertions.assertEq('The recovered editor is initialized', true, editors[editors.length - 1].initialized);
        });

        const recoveredEditor = editors[editors.length - 1];
        Assertions.assertEq('The recovered editor is a new instance', false, recoveredEditor === firstEditor);
        Assertions.assertEq('The original editor was removed', true, Boolean(firstEditor.removed));

        const body = recoveredEditor.getBody();
        Assertions.assertEq('The recovered editor has a body', true, Boolean(body));
        Assertions.assertEq('The recovered editor body is connected to the document', true, body.isConnected);
        Assertions.assertEq('The recovered editor body is editable', 'true', body.contentEditable);

        Assertions.assertEq(
          'Content is preserved across the recovery',
          '<p>persisted content</p>',
          recoveredEditor.getContent()
        );
      });

      it('should keep recovering across repeated detach/re-attach cycles', async () => {
        const editors: any[] = [];
        const vmContext = await pRender({
          init: {
            setup: (editor: any) => {
              editors.push(editor);
            }
          }
        }, `
          <editor
            :init="init"
            license-key="gpl"
          ></editor>`);

        await Waiter.pTryUntil('The editor should be fully initialized', () => {
          Assertions.assertEq('Editor is initialized', true, vmContext.editor.initialized);
        });
        vmContext.editor.setContent('<p>round trip</p>');

        for (let cycle = 1; cycle <= 3; cycle++) {
          const priorCount = editors.length;
          const current = editors[editors.length - 1];
          reparentEditor(current);
          await Waiter.pTryUntil(`A new, initialized editor should exist after cycle ${cycle}`, () => {
            Assertions.assertEq('A new editor was created', true, editors.length > priorCount);
            Assertions.assertEq('The newest editor is initialized', true, editors[editors.length - 1].initialized);
          });
          const recovered = editors[editors.length - 1];
          Assertions.assertEq(`Cycle ${cycle}: editor body is editable`, 'true', recovered.getBody().contentEditable);
          Assertions.assertEq(`Cycle ${cycle}: content is preserved`, '<p>round trip</p>', recovered.getContent());
        }
      });

      it('should preserve v-model content and re-bind model handlers after re-attaching', async () => {
        const editors: any[] = [];
        const vmContext = await pRender({
          content: '<p>model content</p>',
          init: {
            setup: (editor: any) => {
              editors.push(editor);
            }
          }
        }, `
          <editor
            :init="init"
            license-key="gpl"
            v-model="content"
          ></editor>`);

        const firstEditor = vmContext.editor;
        await Waiter.pTryUntil('The editor should be fully initialized', () => {
          Assertions.assertEq('Editor is initialized', true, firstEditor.initialized);
        });
        Assertions.assertEq('Editor starts with the v-model content', '<p>model content</p>', firstEditor.getContent());

        reparentEditor(firstEditor);

        await Waiter.pTryUntil('A new, fully initialized editor should be created after re-attaching', () => {
          Assertions.assertEq('A second editor was created', true, editors.length >= 2);
          Assertions.assertEq('The recovered editor is initialized', true, editors[editors.length - 1].initialized);
        });

        const recoveredEditor = editors[editors.length - 1];
        Assertions.assertEq(
          'The v-model content is preserved across the recovery',
          '<p>model content</p>',
          recoveredEditor.getContent()
        );

        // The model handlers must be re-bound on the recovered editor: an edit should
        // still flow back out through `update:modelValue` to the bound data.
        recoveredEditor.getBody().innerHTML = '<p>edited after recovery</p>';
        Keyboard.keystroke(Keys.space(), {}, SugarElement.fromDom(recoveredEditor.getBody()) as SugarElement<Node>);
        await Waiter.pTryUntil('Edits on the recovered editor update the v-model', () => {
          Assertions.assertEq('The v-model reflects the recovered editor edit', '<p>edited after recovery</p>', vmContext.vm.content);
        });
      });

      it('should recover when Vue moves the editor in the DOM by re-ordering siblings (#230)', async () => {
        const editors: any[] = [];
        const vmContext = await pRender({
          content: '<p>kept across the move</p>',
          items: [ 'editor', 'a', 'b' ],
          init: {
            setup: (editor: any) => {
              editors.push(editor);
            }
          }
        }, `
          <div>
            <template v-for="item in items" :key="item">
              <div v-if="item === 'editor'"><editor :init="init" license-key="gpl" v-model="content"></editor></div>
              <p v-else>{{ item }}</p>
            </template>
          </div>`);

        const firstEditor = vmContext.editor;
        await Waiter.pTryUntil('The editor should be fully initialized', () => {
          Assertions.assertEq('Editor is initialized', true, firstEditor.initialized);
        });

        // Re-order the list so Vue moves the wrapper holding the editor (and its
        // iframe) to a new position, which is what blanks the editor in #230.
        vmContext.vm.items = [ 'a', 'b', 'editor' ];

        await Waiter.pTryUntil('A new, fully initialized editor should be created after the move', () => {
          Assertions.assertEq('A second editor was created', true, editors.length >= 2);
          Assertions.assertEq('The recovered editor is initialized', true, editors[editors.length - 1].initialized);
        });

        const recoveredEditor = editors[editors.length - 1];
        Assertions.assertEq('The recovered editor body is editable', 'true', recoveredEditor.getBody().contentEditable);
        Assertions.assertEq(
          'Content is preserved across the move',
          '<p>kept across the move</p>',
          recoveredEditor.getContent()
        );
      });

      it('should not register reattach recovery for inline editors', async () => {
        const editors: any[] = [];
        const vmContext = await pRender({
          init: {
            setup: (editor: any) => {
              editors.push(editor);
            }
          }
        }, `
          <editor
            :init="init"
            :inline="true"
            license-key="gpl"
          ></editor>`);

        const firstEditor = vmContext.editor;
        await Waiter.pTryUntil('The inline editor should be fully initialized', () => {
          Assertions.assertEq('Editor is initialized', true, firstEditor.initialized);
        });
        // Structural guarantee: an inline editor has no iframe, so there is nothing for
        // the browser to blank and no `load` listener is ever registered.
        Assertions.assertEq('An inline editor has no iframe element', true, !firstEditor.iframeElement);

        reparentEditor(firstEditor);

        // Give any (incorrect) asynchronous re-init a chance to run before asserting
        // that the inline editor instance is untouched.
        await Waiter.pWait(100);
        Assertions.assertEq('No additional editor should be created for an inline editor', 1, editors.length);
        Assertions.assertEq('The inline editor is the same instance', true, vmContext.editor === firstEditor);
        Assertions.assertEq('The inline editor was not removed', false, Boolean(firstEditor.removed));
      });
    });
  });
});
