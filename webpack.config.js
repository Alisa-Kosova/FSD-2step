const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV == 'development';
const isProd = !isDev;

const filename = expansion => isDev ? `[name].${expansion}` : `[name].[hash].${expansion}`

const optimization = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.s[ac]ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
      chunks: 'all',
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  }

  return config;
}

const HTMLFiles = ['src/pages/UI-kit/colors-type/colors-type.pug',
                   'src/pages/UI-kit/headers-footers/headers-footers.pug']

const multipleHtmlPlugins = HTMLFiles.map(pages => {
  newFileName = path.basename(pages, '.pug');
  return new HtmlWebpackPlugin({
    template: pages,
    filename: `${newFileName}.html`,
    minify: {
      collapseWhitespace: isProd
    }
  })
});

module.exports = {
  entry: {
    colorstype: '@pages/UI-kit/colors-type/colors-type.js',
    headersFooters: '@pages/UI-kit/headers-footers/headers-footers.js',
    normalize: './src/style/main-normalize.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@files': path.resolve(__dirname, 'src/files'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@style': path.resolve(__dirname, 'src/style'),
    }
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/files/images'), to: path.resolve(__dirname, 'dist/images') },
      ]
    }),
  ].concat(multipleHtmlPlugins),
  optimization: optimization(),
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4200,
    index: 'page1.html',
    hot: isDev
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            query: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader:
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime']
          }
        },
      },
    ]
  }
}