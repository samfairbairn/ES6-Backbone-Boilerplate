import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
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
        publicPath: DEV ? false : BUILD_PATH
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
                    `style!css!autoprefixer?browsers=last 2 version!sass?includePaths[]=${APP_PATH}` :
                    ExtractTextPlugin.extract("style-loader", `css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?includePaths[]=${APP_PATH}`)
            },
            // Load images
            { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
            { test: /\.svg/, loader: "url-loader?limit=10000&mimetype=image/svg" },
            // Load fonts
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: (DEV ? [
    ] : [
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new ExtractTextPlugin(SETTINGS.production.styles_target + ".css", {allChunks: true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
            mangle: {screw_ie8: true, keep_fnames: true}
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]).concat([
        new webpack.ProvidePlugin({
            _: "lodash",
            $: "jquery",
            "Marionette": "backbone.marionette",
            "Backbone": "backbone"
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