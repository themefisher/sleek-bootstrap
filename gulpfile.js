'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var clean        = require('gulp-clean');
var csso         = require('gulp-csso');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');
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
    data         : 'src/assets/data/*.*',
    scss         : 'src/assets/scss/**/*.scss',
    img          : 'src/assets/img/**/*.+(png|jpg|gif)'
};

var demo         = 'demo/';

var dist         = 'dist/'

var assets       = demo + 'assets/';

var port         = 8000;


/* =====================================================
    CLEAN
    ===================================================== */

gulp.task('clean', function() {
  return gulp.src(demo, {read: false})
  .pipe(clean());
});


/* =====================================================
    HTML
    ===================================================== */

var html = function() {
  return gulp.src( path.html )
    .pipe(customPlumber('Error Running html-include'))
    .pipe(fileinclude({ basepath: path.incdir }))
    .pipe(gulp.dest(demo))
    .pipe(browserSync.reload({
      stream: true
    }));
};

gulp.task('html', ['clean'], html);
gulp.task('html-watch', html);


/* =====================================================
    SCSS
    ===================================================== */

var scss = function() {
  var ignoreNotification = false;
  return gulp.src( path.scss )
    .pipe(customPlumber('Error Running Sass'))
    // sourcemaps for Development
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csso({
        restructure: false,
        sourceMap: true,
        debug: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(assets + 'css/'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
};

gulp.task('scss', ['clean'], scss);
gulp.task('scss-watch', scss);


/* =====================================================
    JS
    ===================================================== */

var js = function() {
  return gulp.src( path.js )
    .pipe(customPlumber('Error Running JS'))
    .pipe(uglify())
    .pipe(gulp.dest(assets + 'js/'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
};

gulp.task('js', ['clean'], js);
gulp.task('js-watch', js);


/* =====================================================
    IMAGE
    ===================================================== */

var image = function() {
  return gulp.src( path.img )
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(assets + 'img/'))
    .pipe(browserSync.reload({
      stream: true
    }));
};

gulp.task('img', ['clean'], image);
gulp.task('img-watch', image);


/* =====================================================
    PLUGINS
    ===================================================== */

var plugins = function() {
  return gulp.src( path.plugins )
    .pipe(gulp.dest(assets + 'plugins/'))
    .pipe(browserSync.reload({
      stream: true
    }));
};

gulp.task('plugins', ['clean'], plugins);
gulp.task('plugins-watch', plugins);


/* =====================================================
    ERROR MESSAGE
    ===================================================== */

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      // Customizing error title
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Glass"
    })
  });
}


/* =====================================================
    BUILD
    ===================================================== */

gulp.task('build', [
  'html',
  'scss',
  'js',
  'img',
  'plugins'
], function() {
  browserSync.init({
    server: {
      baseDir: demo
    },
    port: port
  });
});


/* =====================================================
    WATCH
    ===================================================== */

gulp.task('watch', ['build'], function() {
  gulp.watch( path.html, ['html-watch'] );
  gulp.watch( path.htminc, ['html-watch'] );
  gulp.watch( path.scss, ['scss-watch'] );
  gulp.watch( path.js, ['js-watch'] );
  gulp.watch( path.img, ['img-watch'] );
});


/* =====================================================
    TASKS
    ===================================================== */

gulp.task('default', ['watch']);
