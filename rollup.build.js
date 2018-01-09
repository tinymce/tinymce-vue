const rollup = require('rollup');
const pkg = require('./package.json');
const typescript = require('rollup-plugin-typescript2');
const uglify = require('rollup-plugin-uglify');

const browserBuildOptions = { 
  file: 'lib/browser/tinymce-vue.js',
  format: 'iife',
  name: 'TinymceVue', 
  globals: {
    vue: 'Vue'
  } 
};

const build = async (input, output)  => {
  const bundle = await rollup.rollup(input);
  await bundle.write(output);
}

[
  browserBuildOptions,
  { ...browserBuildOptions,
    file: 'lib/browser/tinymce-vue.min.js', 
    minify: true
  }
].forEach(async function (o) {
  console.log(o.file)
  await build({
    input: './src/index.ts',
    plugins: [
      typescript({
        tsconfig: './tsconfig.browser.json'
      }),
      o.minify ? uglify() : {}
    ]
  }, o);
  console.log('done: ' + o.file)
});