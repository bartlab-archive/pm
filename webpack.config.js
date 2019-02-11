require('dotenv').load();

const path = require('path');
const {DefinePlugin} = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {AngularCompilerPlugin} = require('@ngtools/webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const root = (dir) => path.join(__dirname, ...dir.split('/'));

const PATHS = {
    root: root('resources'),
    src: root('resources/src'),
    app: root('resources/src/app'),
    modules: root('resources/src/modules'),
    dist: root('public/pm'),
    assets: root('public/pm/assets'),
    node_modules: root('node_modules'),
};

const getEnv = (prefix) => {
    const env = {};

    Object.keys(process.env).forEach((key) => {
        if (key.startsWith(prefix)) {
            env[key] = process.env[key];
        }
    });

    return env;
};

const {NODE_ENV, BROWSER_PORT, APP_URL} = process.env;

const isDevMode = NODE_ENV === 'development';

const config = {
    context: PATHS.root,
    target: 'web',
    entry: {
        polyfills: './src/polyfills.ts',
        vendor: './src/vendor.ts',
        app: './src/main.ts',
        styles: './sass/styles.scss',
    },
    output: {
        path: PATHS.dist,
        publicPath: '/pm/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[id].[hash].chunk.js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [PATHS.src, PATHS.node_modules],
    },
    mode: NODE_ENV,
    // stats: 'errors-only',
    stats: !isDevMode
        ? 'errors-only'
        : {
              all: undefined,
              entrypoints: false,
              children: false,

              // chunks: false,
              // chunkGroups: false,
              // chunkModules: false,
              // chunkOrigins: false,

              reasons: false,
              modules: false,
              warnings: false,
          },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack',
                exclude: [/node_modules/],
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|gif|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    context: PATHS.assets,
                    name: 'assets/[path][name].[ext]',
                },
                exclude: [/node_modules/],
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|gif|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    context: PATHS.node_modules,
                    name: 'assets/[path][name].[ext]',
                },
                include: [/node_modules/],
            },
            {
                test: /\.(scss|sass)$/,
                exclude: [PATHS.app, PATHS.modules],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                include: [PATHS.app, PATHS.modules],
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: 'raw-loader',
                    },
                    {
                        // compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: !isDevMode,
        // minimizer: [],
        minimizer: [].concat(
            !isDevMode
                ? [
                      new UglifyJsPlugin({
                          uglifyOptions: {
                              keep_fnames: true,
                          },
                      }),

                      new OptimizeCSSAssetsPlugin({}),
                  ]
                : [],
        ),
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
        }),

        new DefinePlugin({
            'process.env': JSON.stringify({
                ...getEnv('NG_'),
                NODE_ENV,
            }),
        }),

        new AngularCompilerPlugin({
            tsConfigPath: root('tsconfig.json'),
            // basePath: root('resources'),
            // tsConfigPath: root('resources/tsconfig.json'),
            entryModule: root('resources/src/app/app.module#AppModule'),
            platform: 0,
            sourceMap: true,
            skipCodeGeneration: true,
        }),

        new ManifestPlugin({
            basePath: '/',
            publicPath: '/',
            // fileName: root('public', 'mix-manifest.json'),
            fileName: 'mix-manifest.json',
            filter: (fd) => !fd.isAsset,
        }),

        new BrowserSyncPlugin(
            // BrowserSync options
            {
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: BROWSER_PORT,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:3100/)
                // through BrowserSync
                proxy: APP_URL,
                open: false,
            },

            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                // reload: false,
            },
        ),
    ],
};

// if (isDevMode) {
//     // config.plugins.push(
//     //     new HtmlWebpackPlugin({
//     //         template: 'src/index.html',
//     //     }),
//     // );
// } else {
//     config.optimization.minimizer.push(
//         new UglifyJsPlugin({
//             uglifyOptions: {
//                 keep_fnames: true,
//             },
//         }),
//
//         new OptimizeCSSAssetsPlugin({}),
//     );
// }

module.exports = config;
