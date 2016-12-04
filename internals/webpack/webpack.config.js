var webpack = require('webpack'); // eslint-disable-line

var env = process.env.NODE_ENV;   // eslint-disable-line
var config = {                    // eslint-disable-line
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  output: {
    library: 'ethUtil',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.BannerPlugin({ banner: ' /* eslint-disable */ ', raw: true, entryOnly: true }),
    new webpack.BannerPlugin({ banner: ' /* eslint-disable */ ', raw: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins
  .push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
      screw_ie8: false,
    },
    mangle: {
      screw_ie8: false,
    },
    output: {
      screw_ie8: false,
    },
  }));
  config.plugins.push(new webpack.optimize.DedupePlugin());
}

module.exports = config;
