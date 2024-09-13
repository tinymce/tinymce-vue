import { Assertions } from '@ephox/agar';
import { context, describe, it } from '@ephox/bedrock-client';
import { Global } from '@ephox/katamari';
import { pRender } from '../alien/Loader';
import { cleanupGlobalTinymce, VALID_API_KEY } from '../alien/TestHelper';

describe('LoadTinyTest', () => {

  const AssertTinymceVersion = (version: '4' | '5' | '6' | '7') => {
    Assertions.assertEq(`Loaded version of TinyMCE should be ${version}`, version, Global.tinymce.majorVersion);
  };

  context('LoadTinyTest', () => {
    it('Should be able to load local version of TinyMCE 7 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-7/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('7');
      cleanupGlobalTinymce();
    });

    it('Should be able to load local version of TinyMCE 6 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-6/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('6');
      cleanupGlobalTinymce();
    });

    it('Should be able to load local version of TinyMCE 5 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-5/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('5');
      cleanupGlobalTinymce();
    });

    it('Should be able to load local version of TinyMCE 4 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-4/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('4');
      cleanupGlobalTinymce();
    });

    it('Should be able to load TinyMCE 7 from Cloud', async () => {
      await pRender({}, `
        <editor
          :init="init"
          api-key="${VALID_API_KEY}"
          cloud-channel="7-stable"
        ></editor>
      `);
      AssertTinymceVersion('7');
      Assertions.assertEq(
        'TinyMCE 7 should have been loaded from Cloud',
        `https://cdn.tiny.cloud/1/${VALID_API_KEY}/tinymce/7-stable`,
        Global.tinymce.baseURI.source
      );
      cleanupGlobalTinymce();
    });

    it('Should be able to load TinyMCE 6 from Cloud', async () => {
      await pRender({}, `
        <editor
          :init="init"
          api-key="${VALID_API_KEY}"
          cloud-channel="6-stable"
        ></editor>
      `);
      AssertTinymceVersion('6');
      Assertions.assertEq(
        'TinyMCE 6 should have been loaded from Cloud',
        `https://cdn.tiny.cloud/1/${VALID_API_KEY}/tinymce/6-stable`,
        Global.tinymce.baseURI.source
      );
      cleanupGlobalTinymce();
    });

    it('Should be able to load TinyMCE 5 from Cloud', async () => {
      await pRender({}, `
        <editor
          :init="init"
          api-key="${VALID_API_KEY}"
          cloud-channel="5-stable"
        ></editor>
      `);
      AssertTinymceVersion('5');
      Assertions.assertEq(
        'TinyMCE 5 should have been loaded from Cloud',
        `https://cdn.tiny.cloud/1/${VALID_API_KEY}/tinymce/5-stable`,
        Global.tinymce.baseURI.source
      );
      cleanupGlobalTinymce();
    });
  });
});