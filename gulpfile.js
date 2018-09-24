'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var del          = require('del');
var cleanCSS     = require('gulp-clean-css');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var rtlcss       = require('gulp-rtlcss');
var notify       = require('gulp-notify');
var imagemin     = require('gulp-imagemin');
var fileinclude  = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();


var path         = {
    html         : 'src/*.html',
    htminc       : 'src/_inc/**/*.htm',
    incdir       : 'src/_inc/',
    plugins      : 'src/assets/plugins/**/*.*',
    js           : 'src/assets/js/*.js',
    scss         : 'src/assets/scss/**/*.scss',
    img          : 'src/assets/img/**/*.+(png|jpg|gif)'
};

var demo         = 'demo/';

var dist         = 'dist/'

var assets       = demo + 'assets/';

var port         = 8080;


/* =====================================================
    CLEAN
    ===================================================== */

gulp.task('clean', function() {
  return del( demo )
});


/* =====================================================
    HTML
    ===================================================== */

gulp.task('html', function() {
  return gulp.src( path.html )
    .pipe(plumber())
    .pipe(fileinclude({ basepath: path.incdir }))
    .pipe(gulp.dest(demo))
    .pipe(browserSync.stream())
});


/* =====================================================
    CSS
    ===================================================== */

gulp.task('scss', function() {
  return gulp.src( path.scss )
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(assets + 'css/'))
    .pipe(browserSync.stream())
});

gulp.task('rtl', function() {
  return gulp.src( 'demo/assets/css/sleek.css' )
    .pipe(plumber())
    .pipe(rtlcss())
    .pipe(rename({suffix: '.rtl'}))
    .pipe(gulp.dest(assets + 'css/'))
    .pipe(browserSync.stream())
});

gulp.task('minifycss', function() {
  return gulp.src(['demo/assets/css/sleek.css', 'demo/assets/css/sleek.rtl.css'])
    .pipe(plumber())
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets + 'css/'))
    .pipe(browserSync.stream())
});


/* =====================================================
    JS
    ===================================================== */

gulp.task('js', function() {
  return gulp.src( path.js )
    .pipe(plumber())
    .pipe(gulp.dest(assets + 'js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets + 'js/'))
    .pipe(browserSync.stream())
});


/* =====================================================
    IMAGE
    ===================================================== */

gulp.task('img', function() {
  return gulp.src( path.img )
    .pipe(plumber())
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(assets + 'img/'))
    .pipe(browserSync.stream())
});


/* =====================================================
    PLUGINS
    ===================================================== */

gulp.task('plugins', function() {
  return gulp.src( path.plugins )
    .pipe(plumber())
    .pipe(gulp.dest(assets + 'plugins/'))
    .pipe(browserSync.stream())
});



/* =====================================================
    WATCH
    ===================================================== */

gulp.task('watch', gulp.series('html', 'scss', 'rtl', 'minifycss', 'js', 'img', 'plugins', function() {
  gulp.watch( path.html, gulp.series('html')).on('change', browserSync.reload)
  gulp.watch( path.htminc, gulp.series('html')).on('change', browserSync.reload)
  gulp.watch( path.scss, gulp.series('scss', 'rtl', 'minifycss')).on('change', browserSync.reload)
  gulp.watch( path.js, gulp.series('js')).on('change', browserSync.reload)
  gulp.watch( path.img, gulp.series('img')).on('change', browserSync.reload)
  browserSync.init({
    server: {
      baseDir: demo
    },
    port: port
  })
}));


/* =====================================================
    DIST
    ===================================================== */
gulp.task('dist', gulp.series('clean', 'html', 'scss', 'rtl', 'minifycss', 'js', 'img', 'plugins', function() {
  return gulp.src( [assets, path.scss] )
    .pipe(plumber())
    .pipe(gulp.dest( dist ))
}));


/* =====================================================
    DEFAULT
    ===================================================== */

gulp.task('default', gulp.series('clean','watch'));
