import del from "del";
import path from "path";
import gulp from "gulp";
//import open from "open";
import gulpLoadPlugins from "gulp-load-plugins";
import packageJson from "../package.json";
import runSequence from "run-sequence";
import settings from "./settings"
import webpack from "webpack";
import webpackConfig from "./webpack.config";
import WebpackDevServer from "webpack-dev-server";
import yargs from 'yargs';

const SETTINGS = settings();
const PRODUCTION = yargs.argv.p;
const TARGET = PRODUCTION ? SETTINGS.production.target_dir : SETTINGS.development.dir_target;

const PORT = process.env.PORT || SETTINGS.ports.backend;
const plugins = gulpLoadPlugins({camelize: true});

gulp.task('default', () => {

    if (PRODUCTION) {

        runSequence('clean', 'build', 'index:prod');

    } else {

        runSequence('clean', /*'static',*/ 'index:dev', 'serve');

    }
});


// Remove all built files
gulp.task('clean', cb => del(TARGET, {dot: true}, cb));


// Copy static assets
/*gulp.task('static', () =>
    gulp.src(['src/static/**'])
        .pipe(plugins.changed(TARGET))
        .pipe(gulp.dest(TARGET))
        .pipe(plugins.size({title: 'static'}))
);*/


// Copy our index file and inject css/script imports for this build
gulp.task('index:dev', () =>
        gulp.src('src/index.html')
            .pipe(plugins.injectString.after('<!-- build:js -->', '<script src="'+ SETTINGS.development.scripts_target +'.js"></script>'))
            .on("error", plugins.util.log)
            .pipe(gulp.dest(TARGET))
);

gulp.task('index:prod', () =>
        gulp.src('src/index.html')
            .pipe(plugins.injectString.after('<!-- build:css -->', '<link rel="stylesheet" href="'+ SETTINGS.production.styles_target +'.css">'))
            .pipe(plugins.injectString.after('<!-- build:js -->', '<script src="'+ SETTINGS.production.scripts_target +'.js"></script>'))
            .on("error", plugins.util.log)
            .pipe(gulp.dest(TARGET))
);


// Create a distributable package
gulp.task('build', cb => {
    const config = webpackConfig(!PRODUCTION, TARGET, PORT);

    webpack(config, (err, stats) => {
        if (err) throw new plugins.util.PluginError(TARGET, err);
        plugins.util.log(`[${packageJson.name} ${TARGET}]`, stats.toString({colors: true}));
        cb();
    });
});

gulp.task('static-serve', () =>
    runSequence('static', 'serve')
);

// Start a livereloading development server
gulp.task('serve', () => {
    const config = webpackConfig(!PRODUCTION, TARGET, PORT);

    return new WebpackDevServer(webpack(config), {
        contentBase: TARGET,
        publicPath: config.output.publicPath,
        watchDelay: 100
    })
        .listen(PORT, '0.0.0.0', (err) => {
            if (err) throw new plugins.util.PluginError('webpack-dev-server', err);
            plugins.util.log(`[${packageJson.name} serve]`, `Listening at localhost:${PORT}`);
        });
});