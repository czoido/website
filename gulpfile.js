'use strict';

const gulp         = require('gulp');
const terser       = require('gulp-terser');
const htmlmin      = require('gulp-html-minifier-terser');
const concat       = require('gulp-concat');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const cssnano      = require('cssnano');
const autoprefixer = require('autoprefixer');
const image        = require('gulp-image');
const sass         = require('gulp-sass');
sass.compiler      = require('node-sass');

const {src, series, parallel, dest, watch} = require('gulp');

//functions
function htmlTask() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
}

function jsTask() {
  return src('src/js/*.js')
    .pipe(sourcemaps.init('.'))
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('js'));
}

function scssTask() {
  return src('src/scss/*.scss')
    .pipe(sourcemaps.init('.'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(sourcemaps.write('.'));
}

function cssTask() {
  return src('src/css/*.css')
    .pipe(sourcemaps.init('.'))
    .pipe(concat('all.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('css'));
}

function imgTask() {
  return src('./src/img/*')
  .pipe(image())
  .pipe(gulp.dest('./'));
}

exports.scssTask = scssTask;
exports.cssTask  = cssTask;
exports.jsTask   = jsTask;
exports.htmlTask = htmlTask;
exports.imgTask  = imgTask;
exports.default  = series(scssTask, cssTask, jsTask, htmlTask);

