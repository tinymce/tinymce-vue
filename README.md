# Official TinyMCE Vue component

## About

Official Vue component for TinyMCE rich text editor. It makes integrating TinyMCE into Vue applications easy and seamless.

## Quickstart

`tinymce-vue` is a thin wrapper for TinyMCE. It automatically pulls TinyMCE from the Tiny Cloud CDN unless configured to use a different setup, such as self-hosting the [tinymce NPM package](https://www.npmjs.com/package/tinymce)


### Cloud CDN

In your Vue project:

1. [Sign up for a Tiny Cloud account](https://www.tiny.cloud/pricing/) to receive a Tiny Cloud API key.
2. `npm install @tinymce/tinymce-vue`
3. Include the following code:

```vue
<template>
  <h1>TinyMCE Vue demo</h1>
  <Editor
    api-key="your-api-key"
    v-model="content"
    :init="{ plugins: 'lists link image table code help wordcount' }"
  />
</template>

<script setup>
import { ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';

const content = ref('<p>Initial value</p>');
</script>
```

4. Update the `api-key` prop on the `Editor` component to include your Tiny Cloud API key.

For more information: [Using TinyMCE with Vue - Cloud CDN](https://www.tiny.cloud/docs/tinymce/latest/vue-cloud/)

### Self hosted via NPM package

Using TinyMCE from NPM in a Vue project requires a couple of extra steps. See the documentation for more information: [Using TinyMCE with Vue - Self hosted via NPM](https://www.tiny.cloud/docs/tinymce/latest/vue-pm/)

## Demos

For our quick demos, check out the TinyMCE Vue [Storybook](https://tinymce.github.io/tinymce-vue/).

## Detailed documentation

* [TinyMCE Vue Technical Reference](https://www.tiny.cloud/docs/tinymce/latest/vue-ref/).
* [TinyMCE Documentation](https://www.tiny.cloud/docs/tinymce/latest/).

## Vue Version Compatibility

| vue     | tinymce-vue             |
| ---     | ---                     |
| 3.x     | 4.0 and above           |
| 2.x     | Versions prior to 4.0   |

## Issues

Have you found an issue with `tinymce-vue` or do you have a feature request? Open up an [issue](https://github.com/tinymce/tinymce-vue/issues) and let us know or submit a [pull request](https://github.com/tinymce/tinymce-vue/pulls). *Note: for issues related to TinyMCE please visit the [TinyMCE repository](https://github.com/tinymce/tinymce).*


## License

`tinymce-vue` is licensed under the MIT License. See the LICENSE.txt file for details.

Depending on use case, the TinyMCE core editor can be used under either GPL-2.0-or-later or a commercial license. See the [tinymce package](https://www.npmjs.com/package/tinymce) for details.
