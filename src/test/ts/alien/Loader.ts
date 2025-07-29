import { Fun } from '@ephox/katamari';
import { Attribute, SugarBody, SugarElement, Insert, Remove, SelectorFind } from '@ephox/sugar';
import Editor from 'src/main/ts/index';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler.js'; // Use runtime compiler

export interface Context {
  editor: any;
  vm: any;
}

const getRoot = () => SelectorFind.descendant(SugarBody.body(), '#root').getOrThunk(() => {
  const root = SugarElement.fromTag('div');
  Attribute.set(root, 'id', 'root');
  Insert.append(SugarBody.body(), root);
  return root;
});

// eslint-disable-next-line max-len
const pRender = (data: Record<string, any> = {}, template: string = `<editor :init="init"></editor>`): Promise<Record<string, any>> => new Promise((resolve) => {
  const root = getRoot();
  const mountPoint = SugarElement.fromTag('div');
  Insert.append(root, mountPoint);

  const originalInit = data.init || {};
  const originalSetup = originalInit.setup || Fun.noop;

  const vm = createApp({
    template,
    components: {
      Editor
    },
    data: () => ({
      ...data,
      outputFormat: 'text',
      init: {
        ...originalInit,
        setup: (editor: any) => {
          originalSetup(editor);
          editor.on('SkinLoaded', () => {
            // This is a workaround to avoid a race condition occurring in tinymce 8 where licenseKeyManager is still validating the license key
            // after global tinymce is removed in a clean up. Specifically, it happens when unloading/loading different versions of TinyMCE
            if (editor.licenseKeyManager) {
              editor.licenseKeyManager.validate({}).then(() => {
                resolve({ editor, vm });
              });
            } else {
              resolve({ editor, vm });
            }
          });
        }
      }
    }),
  }).mount(mountPoint.dom);
});

const remove = () => {
  Remove.remove(getRoot());
};

export { pRender, remove, getRoot };