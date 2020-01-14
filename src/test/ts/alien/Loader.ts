import { Chain } from '@ephox/agar';
import { Fun } from '@ephox/katamari';
import { Body, Element, Insert, Remove, SelectorFind } from '@ephox/sugar';
import Editor from 'src/main/ts/index';

// @ts-ignore
import Vue from 'vue/dist/vue.esm.js'; // Use runtime compiler

export interface Context {
  editor: any;
  vm: any;
}

const getRoot = () => {
  return SelectorFind.descendant(Body.body(), '#root').getOrThunk(() => {
    const root = Element.fromHtml('<div id="root"></div>');
    Insert.append(Body.body(), root);
    return root;
  });
};

const cRender = (data: Record<string, any> = {}, template: string = `<editor :init="init" ></editor>`) => {
  return Chain.async<Context, Context>((_, next, die) => {
    const root = getRoot();
    const mountPoint = Element.fromTag('div');
    Insert.append(root, mountPoint);

    const originalInit = data.init || {};
    const originalSetup = originalInit.setup || Fun.noop;

    const vm = new Vue({
      data: {
        ...data,
        outputFormat: 'text',
        init: {
          ...originalInit,
          base_url: '/project/node_modules/tinymce',
          setup: (editor: any) => {
            originalSetup(editor);

            editor.on('SkinLoaded', () => {
              setTimeout(() => {
                next({
                  editor,
                  vm
                });
              }, 0);
            });
          }
        }
      },
      render: Vue.compile(template).render,
      components: {
        editor: Editor
      }
    });

    vm.$mount(mountPoint.dom());
  });
};

const cRemove = Chain.op((context: Context) => {
  context.vm.$destroy();
  Remove.remove(getRoot());
});

export { cRender, cRemove };