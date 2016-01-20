import BrowserSyncPlugin from "browser-sync-webpack-plugin";
import connectRewrite from "connect-modrewrite";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import ModernizrWebpackPlugin from "modernizr-webpack-plugin";
import path from "path";
import webpack from "webpack";

import settings from "./settings"

const SETTINGS = settings();
const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'src');

export default (DEV, BUILD_PATH, PORT) => ({
    entry: (DEV ? [
        `webpack-dev-server/client?http://localhost:${PORT}`
    ] : []).concat([
        SETTINGS.source.dir_target + SETTINGS.source.styles_target,
        'babel-polyfill',
        SETTINGS.source.dir_target + SETTINGS.source.scripts_target
    ]),
    output: {
        path: path.resolve(ROOT_PATH, BUILD_PATH),
        filename: DEV ? SETTINGS.development.scripts_target + ".js" : SETTINGS.production.scripts_target + ".js",
        //publicPath: DEV ? false : BUILD_PATH
    },
    cache: DEV,
    debug: DEV,
    devtool: DEV && "eval",
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: APP_PATH,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.ejs$/,
                loader: "ejs-loader"
            },
            // for suit css base
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            // for custom styles
            {
                test: /\.scss$/,
                loader: DEV ?
                    `style!css!autoprefixer?browsers=last 3 version!sass?includePaths[]=${APP_PATH}` :
                    ExtractTextPlugin.extract("style-loader", `css-loader!autoprefixer-loader?browsers=last 3 version!sass-loader?includePaths[]=${APP_PATH}`)
            },
            // Load images
            {
                test: /\.(jpe?g|png|svg)$/i,
                loaders: [
                    `url-loader?hash=sha512&digest=hex&limit=10000&name=${SETTINGS.common.images_dir}[hash].[ext]`,
                    `image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false`
                ]
            },
            {
                test: /\.gif/,
                loader: `file-loader?name=${SETTINGS.common.images_dir}[hash].[ext]`
            },
            // Load fonts
            { test: /\.(woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `url-loader?name=${SETTINGS.common.fonts_dir}[hash].[ext]&limit=10000&mimetype=application/font-woff` },
            { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: `file-loader?name=${SETTINGS.common.fonts_dir}[hash].[ext]` }
        ]
    },
    plugins: (DEV ? [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: SETTINGS.ports.frontend,
            proxy: `${SETTINGS.development.root}:${PORT}/`,
            middleware: [
                connectRewrite([
                    '^[^\\.]*$ /index.html [L]'
                ])
            ]
        })
    ] : [
        new ExtractTextPlugin(SETTINGS.production.styles_target + ".css", {allChunks: true}),
        //new webpack.optimize.DedupePlugin(),
        /*new webpack.optimize.UglifyJsPlugin({
            compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
            mangle: {screw_ie8: true, keep_fnames: true}
        }),*/
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]).concat([
        new webpack.DefinePlugin({DEBUG: DEV}),
        new ModernizrWebpackPlugin({
            filename: `${SETTINGS.common.scripts_dir}modernizr`,
            noChunk: true,
            'feature-detects': [
                'css/transforms3d',
                'css/transforms'
            ]
        }),
        new webpack.ProvidePlugin({
            _: "lodash",
            $: "jquery",
            "Marionette": "backbone.marionette",
            "Backbone": "backbone",
            "Radio": "backbone.radio"
        })
    ]),
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },
    resolve: {
        root: path.join(__dirname, "node_modules"),
        modulesDirectories: ["src", "node_modules"],
        alias: {
            environment: DEV
                ? path.resolve(__dirname, 'config', 'development.js')
                : path.resolve(__dirname, 'config', 'production.js')
        },
        extensions: ["", ".js", ".scss"]
    }
});