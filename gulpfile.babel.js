import gulp from 'gulp';

let $ = require('gulp-load-plugins')();
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import sass from 'gulp-sass';
import size from 'gulp-size';

import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import del from 'del';

let dirNode = './node_modules';
let dirWebStatic = './web/static';
let dirDestStatic = './priv/static';

let dirWebJs = dirWebStatic + '/js',
  dirDestJs = dirDestStatic + '/js',
  dirWebCss = dirWebStatic + '/css',
  dirDestCss = dirDestStatic + '/css';

let sourceFile = dirWebJs + '/app.js',
  destFolder = dirDestJs,
  destFileName = 'app.js';

// Styles
gulp.task('styles', ['sass']);

gulp.task('sass', () => {
  return gulp.src(dirWebCss + '/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        dirWebCss,
        dirNode + '/bootstrap-sass/assets/stylesheets',
        dirNode + '/font-awesome/scss/'
      ]
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dirDestCss))
    .pipe(size());
});

let bundler = watchify(browserify({
  entries: [sourceFile],
  paths: ['.'],
  debug: true,
  insertGlobals: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
  transform: [babelify]
}));

bundler.on('update', rebundle);
bundler.on('log', $.util.log);

function rebundle() {
  return bundler.bundle()
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source(destFileName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destFolder));
}

// Scripts
gulp.task('scripts', rebundle);

gulp.task('buildScripts', () => {
  return browserify({
    entries: sourceFile,
    paths: ['.'],
    transform: [babelify]
  })
    .bundle()
    .pipe(source(destFileName))
    .pipe(gulp.dest(dirDestJs));
});

// Clean
gulp.task('clean', cb => {
  $.cache.clearAll();
  del.sync([dirDestStatic]);
  cb();
});

// Bundle
gulp.task('bundle', ['styles', 'scripts']);

gulp.task('buildBundle', ['styles', 'buildScripts']);

gulp.task('json', () => {
  gulp.src(dirWebJs + '/json/**/*.json', {
    base: dirWebJs
  })
    .pipe(gulp.dest(dirDestJs));
});

gulp.task('assets', ['assets:font-awesome', 'assets:bootstrap'], () => {
  return gulp.src([dirWebStatic + '/assets/**/*'])
    .pipe(gulp.dest(dirDestStatic))
    .pipe(size());
});

gulp.task('assets:font-awesome', () => {
  gulp.src([dirNode + '/font-awesome/fonts/**/*'], {base: dirNode + '/font-awesome/'})
    .pipe(size({title: 'font-awesome'}))
    .pipe(gulp.dest(dirDestStatic));
});

gulp.task('assets:bootstrap', () => {
  gulp.src([dirNode + '/bootstrap-sass/assets/fonts/**/*'], {base: dirNode + '/bootstrap-sass/assets/'})
    .pipe(size({title: 'bootstrap'}))
    .pipe(gulp.dest(dirDestStatic));
});

gulp.task('watch', ['bundle', 'assets'], () => {
  gulp.watch(dirWebJs + '/**/*.json', ['json']);
  gulp.watch([dirWebCss + '/**/*.scss', dirWebCss + '/**/*.css'], ['styles', 'scripts']);
  gulp.watch(dirWebStatic + '/assets/**/*', ['assets']);
});

gulp.task('build', ['buildBundle', 'assets'], () => {
  gulp.src(dirDestJs + '/app.js')
    .pipe($.uglify())
    .pipe($.stripDebug())
    .pipe(gulp.dest(dirDestJs));
});

// Default task
gulp.task('default', ['clean', 'build']);
