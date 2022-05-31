const webpack = require('webpack');
const path = require('path');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const SentryWepackePlugin = require('webpack-sentry-plugin');
const pkg = require('./package.json');
// sentry上传版本以及对应的开发者
pkg.version += process.env.VERSION_AUTHOR;

const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isQatest = process.env.RUN_ENV === 'testing';
const baseUrl = './';
const cdnCommon = './';
module.exports = {
  devServer: {
    port: 8000,
    disableHostCheck: true,
    // https: true,
  },
  productionSourceMap: true,
  outputDir: 'www',
  runtimeCompiler: true,
  publicPath: (isProduction && !isQatest) ? baseUrl : '/',
  configureWebpack: {
    module: {
      rules: [
        {
          // test是固定写法，不可修改
          test: /placeholder_module_config[\\/](basic|async)\.js$/,
          use: [
            {
              loader: '@lx-frontend/modularize-loader',
              options: {
                // 模块文件夹路径，必须是绝对路径。
                moduleDir: path.resolve(__dirname, './src/modules'),
                // 基础模块名称列表，即在模块目录之下，模块文件夹的名称。
                basicModules: ['login'],
                only: [],
                // excludes: [],
                showWarning: true,
              },
            },
          ],
        },
      ]
    },
  },
  chainWebpack: (config) => {
    config.plugin('define')
      .use(webpack.DefinePlugin, [{
        'process.env.SENTRY_TEST': JSON.stringify(false), // 控制sentry测试
        'process.env.PROJECT_VERSION': JSON.stringify(pkg.version),
        'process.env.CDN_COMMON': JSON.stringify(cdnCommon),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV), // 将要在gitlab上部署的环境
      }]);

    process.env.ANALYZE === 'TRUE' && config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);

    // 当处于开发环境时，删除prefetch特性：prefetch会使macbook中的clarles无法正常工作。
    if (isDev) {
      config.plugins.delete('prefetch');
    }

    if (isProduction) {
      config.optimization
        .runtimeChunk({
          name: 'runtime',
        })
        .splitChunks({
          cacheGroups: {
          // TODO: app.js中包含很多库文件，可将这些文件抽离出来，利于缓存
            vue: {
              test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
              priority: -8,
              name: 'vue',
              chunks: 'all',
            },
            ele: {
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              priority: -9,
              name: 'ele',
              chunks: 'all',
            },
            echarts: {
              test: /[\\/]node_modules[\\/](vue-echarts|zrender|echarts)[\\/]/,
              priority: -10,
              name: 'echarts',
              chunks: 'all',
            },
            citydata: {
              test: /[\\/]node_modules[\\/]city-data[\\/]/,
              priority: -11,
              name: 'citydata',
              chunks: 'all',
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        });

      config.plugin('hashed')
        .use(webpack.HashedModuleIdsPlugin);

      config.plugin('inlineManifest')
        .use(InlineManifestWebpackPlugin);

      // 如果是正式环境，添加sentry-plugin
      if (isQatest || !process.env.VERSION_AUTHOR) {
        return;
      }
      config.plugin('sentry')
        .use(SentryWepackePlugin, [{
          include: /\.js(\.map)?$/,
          ignore: ['node_modules'],
          project: pkg.name,
          organization: 'lixin',
          apiKey: 'b2737e3121644bbfa8cdbff184c4217160c362fe229544558bfa51d1e64ea501',
          release: pkg.version,
          baseSentryURL: 'https://sentry.lixinio.com/api/0',
          deleteAfterCompile: true, // 编译后是否删除本地的sourcemap
          suppressConflictError: true, // 压制重复上传的冲突，以防抛出错误
          filenameTransform (filename) { // 自定义需要输出的文件名
            var urlObj = require('url').parse(baseUrl) // eslint-disable-line
            return `~${urlObj.pathname.replace(/\/+$/, '')}/${filename}`;
          },
        }]);
    }
  },
};
