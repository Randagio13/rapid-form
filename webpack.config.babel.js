import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import Visualizer from 'webpack-visualizer-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'release'
process.env.BABEL_ENV = LAUNCH_COMMAND

console.log('LAUCH_COMMAND --> 🐵', LAUNCH_COMMAND)
console.log('Is production? --> 🐵', LAUNCH_COMMAND === 'release')
console.log('BABEL_ENV --> 🐵', LAUNCH_COMMAND)

const PATHS = {
  app: path.join(__dirname, 'src'),
  components: path.join(__dirname, 'src', 'components'),
  containers: path.join(__dirname, 'src', 'containers'),
  constants: path.join(__dirname, 'src', 'constants'),
  settings: path.join(__dirname, 'src', 'settings'),
  build: path.join(__dirname, 'dist'),
  reducers: path.join(__dirname, 'src', 'reducers'),
  styles: path.join(__dirname, 'src', 'styles'),
  helpers: path.join(__dirname, 'src', 'helpers')
}

const devtool = isProduction ? 'source-map' : 'eval-source-map'
const mode = isProduction ? 'production' : 'development'

const base = {
  mode: mode,
  devtool: devtool,
  context: PATHS.app,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { transpileOnly: true }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ],
    extensions: ['.js', '.scss', '.ts', '.tsx', '.json'],
    alias: {
      src: PATHS.app,
      components: PATHS.components,
      containers: PATHS.containers,
      constants: PATHS.constants,
      settings: PATHS.settings,
      reducers: PATHS.reducers,
      styles: PATHS.styles,
      helpers: PATHS.helpers
    }
  }
}

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:1313',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'develop')
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    // contentBase: PATHS.build,
    publicPath: '/',
    historyApiFallback: true,
    port: 1313,
    compress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(LAUNCH_COMMAND)
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new Visualizer({
      filename: '../statistics.html'
    })
  ]
}

const productionConfig = {
  entry: {
    rapidForm: 'index'
  },
  output: {
    path: PATHS.build,
    libraryTarget: 'umd',
    library: 'RapidForm',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
    // umdNamedDefine: true
    // jsonpScriptType: 'module',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
      // cacheGroups: {
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendors',
      //     priority: -10
      //   }
      // }
      // cacheGroups: {
      //   commons: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendors',
      //     chunks: 'all'
      //   }
      // }
    },
    runtimeChunk: false
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production')
        }
      }
    }),
    // new webpack.NamedModulesPlugin(),
    new Visualizer({
      filename: '../statistics.prod.html'
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['reactVendor', 'materialUI'],
    //   children: true,
    //   async: true,
    //   minChunks: 3
    // }),
    // new UglifyJSPlugin({
    //   minimize: true
    // })
  ]
}

const config = isProduction === true ? 'Production' : 'Development'
console.log('Webpack config --> 🐵', config)

export default Object.assign(
  {}, base, isProduction === true ? productionConfig : developmentConfig
)
