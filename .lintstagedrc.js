module.exports = {
  '**/*.{vue,js,jsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{css,less,scss}': ['stylelint', 'prettier --write'],
  '**/*.{json,html}': ['prettier --write']
};
