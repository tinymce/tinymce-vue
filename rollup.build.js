const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');

const browserBuildOptions = { 
  file: 'lib/browser/tinymce-vue.js',
  format: 'iife',
  name: 'Editor', 
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
    file: 'lib/browser/tinymce-vue.min.js'
  }
].forEach((opts) => build({
    input: './src/index.ts',
    plugins: [
      typescript({
        tsconfig: './tsconfig.browser.json'
      }),
      opts.file.endsWith('min.js') ? uglify() : {}
    ]
  }, opts).then(() => console.log(`bundled: ${opts.file}`))
);