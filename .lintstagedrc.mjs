export default {
  '*.{ts,js,mjs}': ['eslint --fix --no-warn-ignored', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
};
