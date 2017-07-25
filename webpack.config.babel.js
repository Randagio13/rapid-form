import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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

const devtool = isProduction ? 'source-map' : 'cheap-module-eval-source-map'

const base = {
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
      // {
      //   test: /\.js?$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader'
      // },
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
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:1313',
    'webpack/hot/only-dev-server',
    'index'
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
    })
  ]
}

const productionConfig = {
  entry: [
    'index'
  ],
  output: {
    path: PATHS.build,
    libraryTarget: 'commonjs',
    library: 'RapidForm',
    filename: 'rapidForm.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production')
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'index.html')
    // })
  ]
}

const config = isProduction === true ? 'Production' : 'Development'
console.log('Webpack config --> 🐵', config)

export default Object.assign(
  {}, base, isProduction === true ? productionConfig : developmentConfig
)
