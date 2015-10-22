import gulp from 'gulp';

let $ = require('gulp-load-plugins')();
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import sass from 'gulp-ruby-sass';

import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import del from 'del';

let dirWebStatic = './web/static';
let dirDestStatic = './priv/static';

let dirWebJs = dirWebStatic + '/js',
  dirDestJs = dirDestStatic + '/js',
  dirWebCss = dirWebStatic + '/css',
  dirDestCss = dirDestStatic + '/css'
  ;

let sourceFile = dirWebJs + '/app.js',
  destFolder = dirDestJs,
  destFileName = 'app.js';

// Styles
gulp.task('styles', ['sass'/*, 'moveCss'*/]);

gulp.task('moveCss', ['clean'], function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src([dirWebCss + '/**/*.css'], {base: dirWebCss})
    .pipe(gulp.dest(dirDestCss));
});

gulp.task('sass', () => {
  return sass(dirWebCss + '/app.scss', {
    style: 'expanded',
    precision: 10,
    loadPath: ['node_modules/']
  })
    //.pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest("priv/static/css/"))
    .pipe($.size());
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
gulp.task('bundle', ['styles', 'scripts', 'bower']);

gulp.task('buildBundle', ['styles', 'buildScripts', /*'moveLibraries',*/ 'bower']);

// Move JS Files and Libraries
gulp.task('moveLibraries', ['clean'], () => {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src([dirWebJs + '' + '/**/*.js'], {base: dirWebJs})
    .pipe(gulp.dest(dirDestJs));
});


// Bower helper
gulp.task('bower', () => {
  gulp.src('bower_components/**/*.js', {
    base: 'bower_components'
  })
    .pipe(gulp.dest(dirDestStatic + '/bower_components/'));

});

gulp.task('json', () => {
  gulp.src(dirWebJs + '/json/**/*.json', {
    base: dirWebJs
  })
    .pipe(gulp.dest(dirDestJs));
});

gulp.task('assets', ['bootstrap_fonts'], () => {
  return gulp.src([dirWebStatic + '/assets/**/*'])
    .pipe(gulp.dest(dirDestStatic))
    .pipe($.size());
});

gulp.task('bootstrap_fonts', () => {
  return gulp.src(['./node_modules/bootstrap-sass/assets/fonts/bootstrap/*'])
    .pipe(gulp.dest(dirDestStatic + '/fonts/bootstrap/'))
    .pipe($.size());
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
gulp.task('default', ['clean', 'build'/*, 'jest'*/]);
