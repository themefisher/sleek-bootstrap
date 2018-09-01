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
    data         : 'src/assets/data/*.*',
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
  return del([demo, dist])
});


/* =====================================================
    HTML
    ===================================================== */

gulp.task('html', function() {
  return gulp.src( path.html )
    .pipe(customPlumber('Error Running html-include'))
    .pipe(fileinclude({ basepath: path.incdir }))
    .pipe(gulp.dest(demo))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    CSS
    ===================================================== */

gulp.task('scss', function() {
  return gulp.src( path.scss )
    .pipe(customPlumber('Error Running Sass'))
    .pipe(gulp.dest(dist + 'scss/'))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(assets + 'css/'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('rtl', function() {
  return gulp.src('dist/css/sleek.css')
    .pipe(customPlumber('Error Running RTL'))
    .pipe(rtlcss())
    .pipe(rename({suffix: '.rtl'}))
    .pipe(gulp.dest(assets + 'css/'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('minifycss', function() {
  return gulp.src(['dist/css/sleek.css', 'dist/css/sleek.rtl.css'])
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets + 'css/'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    JS
    ===================================================== */

gulp.task('js', function() {
  return gulp.src( path.js )
    .pipe(customPlumber('Error Running JS'))
    .pipe(gulp.dest(assets + 'js/'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(assets + 'js/'))
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    IMAGE
    ===================================================== */

gulp.task('img', function() {
  return gulp.src( path.img )
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest(assets + 'img/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


/* =====================================================
    PLUGINS
    ===================================================== */

gulp.task('plugins', function() {
  return gulp.src( path.plugins )
    .pipe(gulp.dest(assets + 'plugins/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


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
};


/* =====================================================
    WATCH
    ===================================================== */

gulp.task('watch', gulp.series('html', 'scss', 'rtl', 'minifycss', 'js', 'img', 'plugins', function() {
  gulp.watch( path.html, gulp.series('html'));
  gulp.watch( path.htminc, gulp.series('html'));
  gulp.watch( path.scss, gulp.series('scss'));
  gulp.watch( path.scss, gulp.series('rtl'));
  gulp.watch( path.scss, gulp.series('minifycss'));
  gulp.watch( path.js, gulp.series('js'));
  gulp.watch( path.img, gulp.series('img'));
  browserSync.init({
    server: {
      baseDir: demo
    },
    port: port
  });
}));


/* =====================================================
    DEFAULT
    ===================================================== */

gulp.task('default', gulp.series('clean','watch'));
