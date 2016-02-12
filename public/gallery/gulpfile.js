var gulp = require('gulp');
var eslint = require('gulp-eslint');
var zip = require('gulp-zip');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');


var paths = {
  jslint: [
    'src/js/*.js'
  ],
  backup: ['**/*', '.*',
    '!bower_components/**/*', '!bower_components',
    '!node_modules/**/*', '!node_modules',
    '!backup/**/*', '!backup'
  ]
};


gulp.task('lint', function () {
  return gulp.src(paths.jslint)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});


gulp.task('backup', function () {
  var ts = (new Date()).toJSON().replace(/:/g, '-');
  return gulp.src(paths.backup)
    .pipe(zip('image-cycler-' + ts + '.zip'))
    .pipe(gulp.dest('backup'));
});

gulp.task('sass', function () {
  gulp.src('src/css/cycler.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['src/css/*.scss'], ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(connect.reload());
});

gulp.task('web:watch', function () {
  gulp.watch(['src/*.html', 'src/**/*.js', 'src/**/*.css'], ['html']);
});

gulp.task('default', ['connect', 'web:watch', 'sass:watch']);
