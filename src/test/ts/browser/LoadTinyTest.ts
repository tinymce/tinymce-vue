import { Assertions } from '@ephox/agar';
import { beforeEach, context, describe, it } from '@ephox/bedrock-client';
import { Global } from '@ephox/katamari';
import { pRender, remove } from '../alien/Loader';
import { cleanupGlobalTinymce, VALID_API_KEY } from '../alien/TestHelper';

describe('LoadTinyTest', () => {

  const AssertTinymceVersion = (version: '4' | '5' | '6' | '7' | '8') => {
    Assertions.assertEq(`Loaded version of TinyMCE should be ${version}`, version, Global.tinymce.majorVersion);
  };

  context('LoadTinyTest', () => {

    beforeEach(() => {
      remove();
      cleanupGlobalTinymce();
    });

    it('Should be able to load local version of TinyMCE 8 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          license-key="gpl"
          tinymce-script-src="/project/node_modules/tinymce-8/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('8');
    });

    it('Should be able to load local version of TinyMCE 7 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-7/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('7');
    });

    it('Should be able to load local version of TinyMCE 6 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-6/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('6');
    });

    it('Should be able to load local version of TinyMCE 5 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-5/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('5');
    });

    it('Should be able to load local version of TinyMCE 4 using the tinymceScriptSrc prop', async () => {
      await pRender({}, `
        <editor
          :init="init"
          tinymce-script-src="/project/node_modules/tinymce-4/tinymce.min.js"
        ></editor>
      `);

      AssertTinymceVersion('4');
    });

    it('Should be able to load TinyMCE 8 from Cloud', async () => {
      // The 8-dev should be swapped with 8-stable once 8 releases
      await pRender({}, `
        <editor
          :init="init"
          api-key="${VALID_API_KEY}"
          cloud-channel="8-dev"
        ></editor>
      `);

      AssertTinymceVersion('8');
      // The 8-dev should be swapped with 8-stable once 8 releases
      Assertions.assertEq(
        'TinyMCE 8 should have been loaded from Cloud',
        `https://cdn.tiny.cloud/1/${VALID_API_KEY}/tinymce/8-dev`,
        Global.tinymce.baseURI.source
      );
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
    });
  });
});
