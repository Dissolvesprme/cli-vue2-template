module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        libraryDirectory: 'es',
        styleLibraryName: 'theme-chalk',
        style: true
      }
    ]
  ]
};
