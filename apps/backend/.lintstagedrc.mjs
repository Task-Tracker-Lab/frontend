export default {
  '*.{ts,js}': ['eslint --fix --no-warn-ignored', 'prettier --write'],
  '*.{json,css,md}': ['prettier --write'],
};
