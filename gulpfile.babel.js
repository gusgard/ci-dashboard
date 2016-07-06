'use strict';

import gulp from 'gulp';
import sequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import gulpif       from 'gulp-if';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import debowerify   from 'debowerify';
// import ngAnnotate   from 'browserify-ngannotate';
import generateProjects from './api-projects.js';
import jsonServer from 'json-server';

let isProd = false;

let plugins = gulpLoadPlugins();

const DIRS = {
  src: 'app',
  dest: 'build',
  js: { app: 'js/app.js', libs: 'js/libs.js' }
};

const JS_DEPENDENCIES = [
  'node_modules/angular/angular.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-aria/angular-aria.js',
  'node_modules/angular-material/angular-material.js',
  'node_modules/d3/index-browserify.js',
  'node_modules/moment/min/moment.min.js'
];

const CSS_DEPENDENCIES = [
  'node_modules/angular-material/angular-material.css'
];

const PATHS = {
  sass: [`${DIRS.src}/scss/*.scss`, `${DIRS.src}/scss/**/*.scss`],
  js: [`${DIRS.src}/js/*.js`, `${DIRS.src}/js/**/*.js`],
  html: [`${DIRS.src}/templates/*.html`, `${DIRS.src}/templates/**/*.html`]
};

// Handle sass changes.
gulp.task('sass', () => {
  return gulp.src(PATHS.sass)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.concat('css/main.min.css'))
    .pipe(plugins.cleanCss())
    .pipe(plugins.sourcemaps.write(`../${DIRS.dest}`))
    .pipe(gulp.dest(DIRS.dest))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .on('end', () => {
      gulp
        .src(CSS_DEPENDENCIES)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.cleanCss())
        .pipe(plugins.concat('css/libs.min.css'))
        .pipe(plugins.sourcemaps.write(`../${DIRS.dest}`))
        .pipe(gulp.dest(DIRS.dest))
        .pipe(browserSync.stream({match: '**/*.css'}));
    });
});

// Handle html changes.
gulp.task('html', () => {
  return gulp.src(PATHS.html)
    .pipe(gulp.dest(`${DIRS.dest}/templates`))
    .pipe(browserSync.stream({match: '**/*.html'}));
});

// Handle assets changes.
gulp.task('assets', () => {
  return gulp.src(`${DIRS.src}/assets/*`)
    .pipe(gulp.dest(`${DIRS.dest}/assets`));
});

// Icons
gulp.task('font', () => {
  return gulp.src(`${DIRS.src}/font/*`)
    .pipe(gulp.dest(`${DIRS.dest}/font`));
});

// Minify js
gulp.task('minifyJS', () => {
  return gulp
    .src(PATHS.js)
    .pipe(plugins.concat(DIRS.js.app))
    .pipe(plugins.babel())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(DIRS.dest))
    .on('end', () => {
      gulp
        .src(JS_DEPENDENCIES)
        .pipe(plugins.concat(DIRS.js.libs))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(DIRS.dest));
    });
});

// Start the development sever task.
gulp.task('server', () => {
  browserSync({
    notify: false,
    server: DIRS.dest,
    // tunnel: 'angularseedes6',
    browser: 'google chrome',
    port: 8000
  });
});

// Task for watching file changes and livereloading the development server.
gulp.task('watch', cb => {
  sequence(['sass', 'browserify', 'html', 'assets', 'font'], 'revision', ['server', 'watching'], cb);
});

gulp.task('watching', () => {
  gulp.watch(PATHS.sass, ['sass']);
  gulp.watch(PATHS.html, ['html']);
});

// Gulp default task.
gulp.task('default', ['watch']);

gulp.task('revision', () => {
  return gulp.src(`${DIRS.src}/index.html`)
    .pipe(gulp.dest(DIRS.dest))
    .pipe(plugins.revAppend())
    .pipe(gulp.dest(DIRS.dest));
});

gulp.task('minifyHTML', function() {
  return gulp.src(PATHS.html)
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(`${DIRS.dest}/templates`));
});

gulp.task('eslint', () => {
  return gulp.src(PATHS.js)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

// gulp.task('test', () => {
//   console.log('TODO test');
// });

// Build command
gulp.task('build', cb => {
  isProd = true;
  sequence(['sass', 'browserify', 'minifyHTML', 'assets', 'font'], 'revision', cb);
});

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/

function buildScript(file) {
  const shouldCreateSourcemap = true;
  let bundler = browserify({
    entries: ['./app/js/' + file],
    debug: shouldCreateSourcemap,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  if (!isProd) {
    bundler = watchify(bundler);

    bundler.on('update', rebundle);
  }

  const transforms = [
    { name: babelify, options: {}},
    { name: debowerify, options: {}},
    // { name: ngAnnotate, options: {}},
    { name: 'brfs', options: {}},
    { name: 'bulkify', options: {}}
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform.name, transform.options);
  });

  function rebundle() {
    const stream = bundler.bundle();
    const sourceMapLocation = '';

    return stream
      // .on('error', handleErrors)
      // .on('end', bundleLogger.end)
      .pipe(source(file))
      .pipe(gulpif(shouldCreateSourcemap, buffer()))
      .pipe(gulpif(shouldCreateSourcemap, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(isProd, streamify(plugins.uglify({
        compress: { drop_console: true } // eslint-disable-line camelcase
      }))))
      .pipe(gulpif(shouldCreateSourcemap, sourcemaps.write(sourceMapLocation)))
      .pipe(gulp.dest(DIRS.dest))
      .pipe(browserSync.stream());
  }
  return rebundle();
}

gulp.task('browserify', function() {
  return buildScript('app.js');
});

gulp.task('generateProjects', function () {
  generateProjects(20).then(function (projects) {
    var server = jsonServer.create();
    var middlewares = jsonServer.defaults();

    // Set default middlewares (logger, static, cors and no-cache)
    server.use(middlewares);

    // Add custom routes before JSON Server router
    server.get('/projects', function (req, res) {
      res.jsonp(projects);
    });

    server.listen(3000, function () {
      console.log('JSON Server is running');
    });
  });
});
