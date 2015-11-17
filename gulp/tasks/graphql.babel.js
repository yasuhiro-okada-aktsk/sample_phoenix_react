import gulp from 'gulp';

let $ = require('gulp-load-plugins')();
import sourcemaps from 'gulp-sourcemaps';

import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import fs from 'fs';
import path from 'path';

let getbabelRelayPlugin = require('babel-relay-plugin');
let schema = require('../../web/static/js/schema/schema.json');

let dirWebStatic = './web/static';
let dirDestStatic = './priv/static';

let dirWebJs = dirWebStatic + '/js/graphql',
  dirDestJs = dirDestStatic + '/js';

let sourceFile = dirWebJs + '/app.js',
  destFolder = dirDestJs,
  destJsRest = 'graphql.js';

let bundler = watchify(browserify({
  entries: [sourceFile],
  paths: ['.'],
  debug: true,
  insertGlobals: true,
  cache: {},
  packageCache: {},
  fullPaths: true,
  transform: [ babelify.configure( {plugins: [getbabelRelayPlugin(schema.data)]} ) ]
}));

bundler.on('update', rebundle);
bundler.on('log', $.util.log);

function rebundle() {
  return bundler.bundle()
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source(destJsRest))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destFolder));
}

// Scripts
gulp.task('scriptsGraphQl', rebundle);

gulp.task('buildScriptsGraphQl', () => {
  return browserify({
    entries: sourceFile,
    paths: ['.'],
    transform: [babelify]
  })
    .bundle()
    .pipe(source(destJsRest))
    .pipe(gulp.dest(dirDestJs));
});

import { Schema } from '../../web/static/js/schema';

gulp.task('generate-schema', () => {
  return graphql(Schema, introspectionQuery)
    .then(result => {
      if (result.errors)
        return console.error('[schema]: ERROR --', JSON.stringify(result.errors, null, 2));
      fs.writeFileSync(
        path.join(__dirname, '../../web/static/js/schema/schema.json'),
        JSON.stringify(result, null, 2)
      );
      return null;
    });
});
