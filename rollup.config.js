import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',
  output: {
    file: './public/bundle.js',
    format: 'iife',
    name:'bundle'
  },
  plugins: [json()]
};