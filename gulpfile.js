'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var sass = require('gulp-ruby-sass');

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var del = require('del');

var dirWebStatic = './web/static';
var dirDestStatic = './priv/static';

var dirWebJs = dirWebStatic + '/js',
  dirDestJs = dirDestStatic + '/js',
  dirWebCss = dirWebStatic + '/css',
  dirDestCss = dirDestStatic + '/css'
  ;

var sourceFile = dirWebJs + '/app.js',
  destFolder = dirDestJs,
  destFileName = 'app.js';

// Styles
gulp.task('styles', ['sass', 'moveCss']);

gulp.task('moveCss', ['clean'], function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src([dirWebCss + '/**/*.css'], {base: dirWebCss})
    .pipe(gulp.dest(dirDestCss));
});

gulp.task('sass', function () {
  return sass(dirWebCss, {style: 'expanded'})
    .pipe(gulp.dest(dirDestCss));
});


var bundler = watchify(browserify({
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

gulp.task('buildScripts', function () {
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
gulp.task('clean', function (cb) {
  $.cache.clearAll();
  del.sync([dirDestStatic]);
  cb();
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower']);

gulp.task('buildBundle', ['styles', 'buildScripts', /*'moveLibraries',*/ 'bower']);

// Move JS Files and Libraries
gulp.task('moveLibraries', ['clean'], function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src([dirWebJs + '' + '/**/*.js'], {base: dirWebJs})
    .pipe(gulp.dest(dirDestJs));
});


// Bower helper
gulp.task('bower', function () {
  gulp.src('bower_components/**/*.js', {
    base: 'bower_components'
  })
    .pipe(gulp.dest(dirDestStatic + '/bower_components/'));

});

gulp.task('json', function () {
  gulp.src(dirWebJs + '/json/**/*.json', {
    base: dirWebJs
  })
    .pipe(gulp.dest(dirDestJs));
});

gulp.task('assets', function () {
  return gulp.src([dirWebStatic + '/assets/**/*'])
    .pipe(gulp.dest(dirDestStatic))
    .pipe($.size());
});

gulp.task('watch', ['bundle', 'assets'], function () {
  gulp.watch(dirWebJs + '/**/*.json', ['json']);
  gulp.watch([dirWebCss + '/**/*.scss', dirWebCss + '/**/*.css'], ['styles', 'scripts']);
  gulp.watch(dirWebStatic + '/assets/**/*', ['assets']);
});

gulp.task('build', ['buildBundle', 'assets'], function () {
  gulp.src(dirDestJs + '/app.js')
    .pipe($.uglify())
    .pipe($.stripDebug())
    .pipe(gulp.dest(dirDestJs));
});

// Default task
gulp.task('default', ['clean', 'build'/*, 'jest'*/]);
