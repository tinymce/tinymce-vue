import { Assertions } from '@ephox/agar';
import { context, describe, it } from '@ephox/bedrock-client';
import { Global } from '@ephox/katamari';
import { pRender } from '../alien/Loader';
import { cleanupTinymce } from '../alien/TestHelper';

describe('LoadTinyTest', () => {

  const AssertTinymceVersion = (version: '4' | '5' | '6' | '7') => {
    Assertions.assertEq(`Loaded version of TinyMCE should be ${version}`, version, Global.tinymce.majorVersion);
  };

  context('LoadTinyTest', () => {
    it('Should be able to load local version of TinyMCE using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-7/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('7');
      cleanupTinymce();
    });
  });
});



  // TODO: Add the below tests for loading TinyMCE from Cloud
  // Pipeline.async({}, [
  //   Log.chainsAsStep('Should be able to load local version of TinyMCE using the tinymceScriptSrc prop', '', [
  //     cDeleteTinymce,

  //     cRender({}, `
  //       <editor
  //         :init="init"
  //         tinymce-script-src="/project/node_modules/tinymce-7/tinymce.min.js"
  //       ></editor>
  //     `),
  //     cAssertTinymceVersion('7'),
  //     cRemove,
  //     cDeleteTinymce,

  //     cRender({}, `
  //       <editor
  //         :init="init"
  //         tinymce-script-src="/project/node_modules/tinymce-6/tinymce.min.js"
  //       ></editor>
  //     `),
  //     cAssertTinymceVersion('6'),
  //     cRemove,
  //     cDeleteTinymce,

  //     cRender({}, `
  //       <editor
  //         :init="init"
  //         tinymce-script-src="/project/node_modules/tinymce-5/tinymce.min.js"
  //       ></editor>
  //     `),
  //     cAssertTinymceVersion('5'),
  //     cRemove,
  //     cDeleteTinymce,

  //     cRender({}, `
  //       <editor
  //         :init="init"
  //         tinymce-script-src="/project/node_modules/tinymce-4/tinymce.min.js"
  //       ></editor>
  //     `),
  //     cAssertTinymceVersion('4'),
  //     cRemove,
  //     cDeleteTinymce,
  //   ]),
  //   Log.chainsAsStep('Should be able to load TinyMCE from Cloud', '', [
  //     cRender({}, `
  //       <editor
  //         :init="init"
  //         api-key="a-fake-api-key"
  //         cloud-channel="7-stable"
  //       ></editor>
  //     `),
  //     cAssertTinymceVersion('7'),
  //     Chain.op(() => {
  //       Assertions.assertEq(
  //         'TinyMCE should have been loaded from Cloud',
  //         'https://cdn.tiny.cloud/1/a-fake-api-key/tinymce/7-stable',
  //         Global.tinymce.baseURI.source
  //       );
  //     }),
  //     cRemove,
  //     cDeleteTinymce,
  //     cRender({}, `
  //       <editor
  //         :init="init"
  //         api-key="a-fake-api-key"
  //         cloud-channel="6-stable"
  //       ></editor>
  //     `),
  //     cAssertTinymceVersion('6'),
  //     Chain.op(() => {
  //       Assertions.assertEq(
  //         'TinyMCE should have been loaded from Cloud',
  //         'https://cdn.tiny.cloud/1/a-fake-api-key/tinymce/6-stable',
  //         Global.tinymce.baseURI.source
  //       );
  //     }),
  //     cRemove,
  //     cDeleteTinymce,
  //     cRender({}, `
  //       <editor
  //         :init="init"
  //         api-key="a-fake-api-key"
  //         cloud-channel="5-stable"
  //       ></editor>
  //     `),
  //     cAssertTinymceVersion('5'),
  //     Chain.op(() => {
  //       Assertions.assertEq(
  //         'TinyMCE should have been loaded from Cloud',
  //         'https://cdn.tiny.cloud/1/a-fake-api-key/tinymce/5-stable',
  //         Global.tinymce.baseURI.source
  //       );
  //     }),
  //     cRemove,
  //     cDeleteTinymce,
  //   ]),
  // ], success, failure);
