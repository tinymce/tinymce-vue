import vue from '@vitejs/plugin-vue';
import path from 'path';

export default {
  root: 'src/demo',
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '/@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
  server: {
    port: 3001
  }
};