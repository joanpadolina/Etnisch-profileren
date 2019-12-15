import json from '@rollup/plugin-json';

export default {
  input: 'src/main.js',
  external:['d3'],
  output: {
    file: './public/bundle.js',
    format: 'iife',
    name:'bundle'
  },
  plugins: [json()]
};