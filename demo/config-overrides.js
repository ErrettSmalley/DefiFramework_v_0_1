const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
  addWebpackExternals,
  // addLessLoader,
  // addPostcssPlugins,
} = require('customize-cra');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';

const addCompression = () => (config) => {
  if (isEnvProduction) {
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        threshold: 1024,
        minRatio: 0.8,
      }),
    );
    config.optimization.splitChunks = {
      cacheGroups: {
        // vendor: {
        //   test: /[\\/]node_modules[\\/](react|react-dom|ethers)[\\/]/,
        //   name: 'vendor',
        //   chunks: 'all', // all, async, and initial
        // },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-redux)[\\/]/,
          name: 'react',
          chunks: 'all', // all, async, and initial
        },
        ethers: {
          test: /[\\/]node_modules[\\/](ethers|@ethersproject)[\\/]/,
          name: 'ethers',
          chunks: 'all', // all, async, and initial
        },
        styles: {
          name: 'styles',
          test: /\.css|less$/,
          chunks: 'all', // merge all the css chunk to one file
          enforce: true,
        },
      },
    };
  }

  return config;
};

const addAnalyzer = () => (config) => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};

const addUglifyJs = () => (config) => {
  if (isEnvProduction) {
    config.plugins.push(
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            pure_funcs: ['console.log'],
            drop_debugger: true,
          },
        },
      }),
    );
  }
  return config;
};

const addPolyfill = () => (config) => {
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    // url: require.resolve('url'),
    // path: require.resolve('path-browserify'),
    // domain: require.resolve('domain-browser'),
    // os: require.resolve('os-browserify/browser'),
    // console: require.resolve('console-browserify'),
    // http: require.resolve('stream-http'),
    // https: require.resolve('https-browserify'),
    // fs: false,
    // zlib: require.resolve('browserify-zlib'),
    // vm: require.resolve('vm-browserify'),
  };
  return config;
};
module.exports = override(
  // fixBabelImports('import', [
  //   {
  //     libraryName: 'chart',
  //     libraryDirectory: 'es',
  //     style: 'css',
  //   },
  // ]),
  // addPostcssPlugins([
  //  require("postcss-pxtorem")({
  //    rootValue: 16,
  //    unitPrecision: 5,
  //    propList: ["*"],
  //    minPixelValue: 2,
  //  selectorBlackList:[/^\.ant-/,"html"]
  //  }),
  // addLessLoader({
  //   javascriptEnabled: true
  //   modifyVars: { '@primary-color': '#1DA57A' },
  // }),
  addPolyfill(),
  addCompression(),
  addAnalyzer(),
  addWebpackPlugin(new ProgressBarPlugin()),
  addUglifyJs(),
  addWebpackAlias({
    // eslint-disable-next-line no-useless-computed-key
    ['@']: path.resolve(__dirname, 'src'),
  }),
  addWebpackExternals({
    // externalsType: 'script',
    // 'chart.js': [
    //   'https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js',
    //   'Chart',
    //   'registerables',
    //   'ChartConfiguration',
    //   'LineController',
    //   'LinearScale',
    //   'BarElement',
    //   'TimeScale',
    //   'Tooltip',
    // ],
    '@toruslabs/torus-embed': 'Torus',
  }),
);
