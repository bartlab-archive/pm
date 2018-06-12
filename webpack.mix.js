const {mix} = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.js('resources/assets/js/app.js', 'public/js')
    .extract([
        'angular',
        'angular-animate',
        'angular-aria',
        'angular-file-saver',
        'angular-material',
        'angular-messages',
        'angular-moment',
        'angular-sanitize',
        'babel-polyfill',
        'ng-showdown',
        'satellizer',
        'simplemde',
        'lodash',
        'moment'
    ])
    .sass('resources/assets/sass/app.scss', 'public/css')
    .sourceMaps()
    .options({
        uglify: {
            uglifyOptions: {
                keep_fnames: true,
            }
        }
    })
    .webpackConfig({
        resolve: {
            modules: [
                path.resolve('./resources/assets/js'),
                path.resolve('./node_modules')
            ]
        },
        plugins: []
    })
    .version()
    .browserSync({
        port: process.env.MIX_PORT || 3000,
        proxy: process.env.APP_URL || 'localhost'
    });