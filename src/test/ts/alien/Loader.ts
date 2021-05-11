import { Chain } from '@ephox/agar';
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

const cRender = (data: Record<string, any> = {}, template: string = `<editor :init="init" ></editor>`) =>
  Chain.async<Context, Context>((_value, next, _die) => {
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
              setTimeout(() => {
                next({ editor, vm });
              }, 0);
            });
          }
        }
      }),
    }).mount(mountPoint.dom);
  });

const cRemove = Chain.op(() => {
  Remove.remove(getRoot());
});

export { cRender, cRemove };