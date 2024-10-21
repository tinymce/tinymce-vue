import { Global, Strings, Arr } from '@ephox/katamari';
import { SugarElement, Attribute, SelectorFilter, Remove } from '@ephox/sugar';
import { ScriptLoader } from '../../../main/ts/ScriptLoader';

const VALID_API_KEY = 'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc';

// Function to clean up and remove TinyMCE-related scripts and links from the document
const cleanupGlobalTinymce = () => {
  ScriptLoader.reinitialize();
  // This deletes global references to TinyMCE, to ensure a clean slate for each initialization when tests are switching to a different editor versions.
  delete Global.tinymce;
  delete Global.tinyMCE;
  // Helper function to check if an element has a TinyMCE-related URI in a specific attribute
  const hasTinymceUri = (attrName: string) => (elm: SugarElement<Element>) =>
    Attribute.getOpt(elm, attrName).exists((src) => Strings.contains(src, 'tinymce'));
  // Find all script and link elements that have a TinyMCE-related URI
  const elements = Arr.flatten([
    Arr.filter(SelectorFilter.all('script'), hasTinymceUri('src')),
    Arr.filter(SelectorFilter.all('link'), hasTinymceUri('href')),
  ]);
  Arr.each(elements, Remove.remove);
};

export {
  VALID_API_KEY,
  cleanupGlobalTinymce,
};