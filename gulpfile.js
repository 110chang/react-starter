//gulpfile.js

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browsersync = require('browser-sync')

gulp.task('bundle', function() {
  browserify({
    entries: ['./src/main.jsx'],
    extensions: ['.jsx'],
    debug: !gulp.env.production
  }).transform(babelify, {
    presets: ['es2015', 'react'],
    extensions: ['.jsx']
  })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dest'))
    .pipe(browsersync.stream());
});

gulp.task('server', function() {
  browsersync.init({
    server: {
      baseDir: ['./dest/']
    },
    open: false
  });
});

gulp.task('default', ['server', 'bundle'], function() {
  gulp.watch('./src/**/*.jsx', ['bundle']);
  gulp.watch('./dest/**/*', function() {
    browsersync.reload();
  });
});

