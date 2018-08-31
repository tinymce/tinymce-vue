# Official TinyMCE Vue component

## About

This package is a thin wrapper around `tinymce` to make it easier to use in a Vue application. 

## Installation
```sh
$ npm install @tinymce/tinymce-vue
```

## Usage

### Loading the component

First you have to load the component and how you do this depends on how the app you are developing is set up. If you are using some kind of bundle loader like `webpack`, `rollup` or `browserify` you can add the import like this:

```js
// es modules
import Editor from '@tinymce/tinymce-vue';
// commonjs require
var Editor = require('@tinymce/tinymce-vue');
```
If you aren't using a module loader and just adding the javascript file imports to your html files you will have to copy the `tinymce-vue.min.js` file, found in the `lib/browser` folder of the npm package, to your app and add something like this:

```js
<script src="path/to/tinymce-vue.min.js"></script>
```

You can then add the editor to the `components` property of your app:

```js
// This might look different depending on how you have set up your app
// but the important part is the components property
var app = new Vue({
  el: '#app',
  data: { /* Your data */ },
  components: {
    'editor': Editor // <- Important part
  },
  methods: { /* Your methods */}
})
```

### Using the component in your templates

Use the editor in your templates like this:

```js
<editor api-key="API_KEY" :init="{plugins: 'wordcount'}"></editor>
```

### Configuring the editor

The editor accepts the following props:
* `id`: An id for the editor so you can later grab the instance by using the `tinymce.get('ID')` method on tinymce, defaults to an automatically generated uuid. 
* `init`: Object sent to the `tinymce.init` method used to initialize the editor.
* `initial-value`: Initial value that the editor will be initialized with.
* `inline`: Shorthand for setting that the editor should be inline, `<editor inline></editor>` is the same as setting `{inline: true}` in the init.
* `tag-name`: Only used if the editor is inline, decides what element to initialize the editor on, defaults to `div`.
* `plugins`: Shorthand for setting what plugins you want to use, `<editor plugins="foo bar"></editor>` is the same as setting `{plugins: 'foo bar'}` in the init.
* `toolbar`: Shorthand for setting what toolbar items you want to show, `<editor toolbar="foo bar"></editor>` is the same as setting `{toolbar: 'foo bar'}` in the init.
* `model-events`: Change on what events you want to trigger the v-model events, defaults to `'change keyup'`. 
* `api-key`: Api key for TinyMCE cloud, more info below.
* `cloud-channel`: Cloud channel for TinyMCE Cloud, more info below.

None of the configuration props are **required** for the component to work - other than if you are using TinyMCE Cloud you will have to specify the `api-key` to get rid of the `This domain is not registered...` warning message.

### `v-model`

You can also use the `v-model` directive (more info in the [VueJS documentation](https://vuejs.org/v2/guide/forms.html)) on the editor to create a two-way data binding:

```js
<editor v-model="content"></editor>
```

### Event binding

You bind editor events via a shorthand prop on the editor, for example:
```js
<editor @onSelectionChange="handlerFunction"></editor>
```
Here is a full list of the events available:
<details>
<summary>All available events</summary>

* `onActivate`
* `onAddUndo`
* `onBeforeAddUndo`
* `onBeforeExecCommand`
* `onBeforeGetContent`
* `onBeforeRenderUI`
* `onBeforeSetContent`
* `onBeforePaste`
* `onBlur`
* `onChange`
* `onClearUndos`
* `onClick`
* `onContextMenu`
* `onCopy`
* `onCut`
* `onDblclick`
* `onDeactivate`
* `onDirty`
* `onDrag`
* `onDragDrop`
* `onDragEnd`
* `onDragGesture`
* `onDragOver`
* `onDrop`
* `onExecCommand`
* `onFocus`
* `onFocusIn`
* `onFocusOut`
* `onGetContent`
* `onHide`
* `onInit`
* `onKeyDown`
* `onKeyPress`
* `onKeyUp`
* `onLoadContent`
* `onMouseDown`
* `onMouseEnter`
* `onMouseLeave`
* `onMouseMove`
* `onMouseOut`
* `onMouseOver`
* `onMouseUp`
* `onNodeChange`
* `onObjectResizeStart`
* `onObjectResized`
* `onObjectSelected`
* `onPaste`
* `onPostProcess`
* `onPostRender`
* `onPreProcess`
* `onProgressState`
* `onRedo`
* `onRemove`
* `onReset`
* `onSaveContent`
* `onSelectionChange`
* `onSetAttrib`
* `onSetContent`
* `onShow`
* `onSubmit`
* `onUndo`
* `onVisualAid`
</details>

## Loading TinyMCE
### Auto-loading from TinyMCE Cloud
The `Editor` component needs TinyMCE to be globally available to work, but to make it as easy as possible it will automatically load [TinyMCE Cloud](https://www.tiny.cloud/docs/cloud-deployment-guide/) if it can't find TinyMCE available when the component has mounted. To get rid of the `This domain is not registered...` warning, sign up for the cloud and enter the api key like this:

```js
<editor api-key='YOUR_API_KEY' :init="{/* your settings */}>"</editor>
```

You can also define what cloud channel you want to use out these three
* `stable` **Default**. The most stable and well tested version that has passed the Ephox quality assurance process.
* `testing` This channel will deploy the current candidate for release to the `stable` channel.
* `dev` The cutting edge version of TinyMCE updated daily for the daring users.

So using the `dev` channel would look like this:

```js
<editor api-key='YOUR_API_KEY' cloud-channel='dev' :init="{/* your settings */}"></editor>
```

For more info on the different versions see the [documentation](https://www.tiny.cloud/docs/cloud-deployment-guide/editor-plugin-version/#devtestingandstablereleases).

### Loading TinyMCE by yourself

To opt out of using TinyMCE cloud you have to make TinyMCE globally available yourself. This can be done either by hosting the `tinymce.min.js` file by youself and adding a script tag to you HTML or, if you are using a module loader, installing TinyMCE with npm. For info on how to get TinyMCE working with module loaders check out [this page in the documentation](https://www.tinymce.com/docs/advanced/usage-with-module-loaders/).

