// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  parser: false,
  plugins: [
    // 需要把browsers 改成 overrideBrowserslist https://github.com/browserslist/browserslist#readme
    require('autoprefixer')({ overrideBrowserslist: ['last 10 Chrome versions', 'last 5 Firefox versions', 'ios > 7.0', 'ie >= 9'] }),
  ],
};
