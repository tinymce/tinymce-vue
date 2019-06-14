import { Step } from '@ephox/agar';
import { Fun } from '@ephox/katamari';
import { Body, Element, Insert, Remove } from '@ephox/sugar';
import { IPropTypes } from 'src/main/ts/components/EditorPropTypes';
import Editor from 'src/main/ts/index';
import { getTinymce } from 'src/main/ts/TinyMCE';
import 'tinymce';
import Vue from 'vue';

const setTinymceBaseUrl = (baseUrl: string) => {
  const tinymce = getTinymce();
  const prefix = document.location.protocol + '//' + document.location.host;
  tinymce.baseURL = baseUrl.indexOf('://') === -1 ? prefix + baseUrl : baseUrl;
  tinymce.baseURI = new tinymce.util.URI(tinymce.baseURL);
};

type SetupCallback = (editor: any, viewModel: any, done: any) => void;

const setup = (props: Partial<IPropTypes>, onLoaded: SetupCallback) => {
  return Step.async((done) => {
    const root = Element.fromTag('div');
    const mountPoint = Element.fromTag('div');
    Insert.append(root, mountPoint);
    Insert.append(Body.body(), root);

    // TODO: use editor base_url init config
    setTinymceBaseUrl(`/project/node_modules/tinymce`);

    const originalInit = props.init || {};
    const originalSetup = originalInit.setup || Fun.noop;

    const propsData = {
      ...props,
      init: {
        ...originalInit,
        setup: (editor: any) => {
          originalSetup(editor);

          editor.on('SkinLoaded', () => {
            setTimeout(() => {
              onLoaded(editor, viewModel, teardown);
            }, 0);
          });
        }
      }
    };

    const EditorConstructor = Vue.extend(Editor);
    const viewModel = new EditorConstructor({ propsData }).$mount(mountPoint.dom());

    const teardown = () => {
      viewModel.$destroy();
      Remove.remove(root);
      done();
    };
  });
};

export { setup };
