"use strict";

const sass = require("gulp-sass")(require("sass"));
const gulp = require("gulp");
const gutil = require("gulp-util");
const jshint = require("gulp-jshint");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const bs = require("browser-sync").create();
const rimraf = require("rimraf");
const gm = require("gulp-gm");
const comments = require("gulp-header-comment");

var path = {
  src: {
    // source paths
    html: "source/*.html",
    htminc: "source/partials/**/*",
    incdir: "source/partials/",
    plugins: "source/plugins/**/*",
    js: "source/js/*.js",
    scss: "source/scss/**/*.scss",
    images: "source/images/**/*.+(png|jpg|jpeg|gif|svg|webp|ico)",
    blur: "source/images/**/*.+(jpg|jpeg|webp)",
    fonts: "source/fonts/**/*.+(eot|ttf|woff|woff2|otf)",
    static: "source/static/**/*",
  },
  build: {
    // build paths
    dir: "theme/",
  },
};

// HTML
gulp.task("html", function () {
  return gulp
    .src(path.src.html)
    .pipe(
      fileinclude({
        basepath: path.src.incdir,
        context: {
          version: "premium",
        },
      })
    )
    .pipe(
      comments(`
    WEBSITE: https://themefisher.com
    TWITTER: https://twitter.com/themefisher
    FACEBOOK: https://facebook.com/themefisher
    GITHUB: https://github.com/themefisher/
    `)
    )
    .pipe(gulp.dest(path.build.dir))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// SCSS
gulp.task("scss", function () {
  return gulp
    .src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("/"))
    .pipe(
      comments(`
    WEBSITE: https://themefisher.com
    TWITTER: https://twitter.com/themefisher
    FACEBOOK: https://facebook.com/themefisher
    GITHUB: https://github.com/themefisher/
    `)
    )
    .pipe(gulp.dest(path.build.dir + "css/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

gulp.task("scss-files", function () {
  return gulp.src(path.src.scss).pipe(gulp.dest(path.build.dir + "scss/"));
});

// Javascript
gulp.task("js", function () {
  return gulp
    .src(path.src.js)
    .pipe(jshint("./.jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
    .on("error", gutil.log)
    .pipe(
      comments(`
    WEBSITE: https://themefisher.com
    TWITTER: https://twitter.com/themefisher
    FACEBOOK: https://facebook.com/themefisher
    GITHUB: https://github.com/themefisher/
    `)
    )
    .pipe(gulp.dest(path.build.dir + "js/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Image blur
gulp.task("images-blur", function () {
  return gulp
    .src(path.src.blur)
    .pipe(
      gm(function (gmfile) {
        return gmfile.blur(10, 10);
      })
    )
    .pipe(gulp.dest(path.build.dir + "images/"));
});

// image build
gulp.task("images", function () {
  return gulp
    .src(path.src.images)
    .pipe(gulp.dest(path.build.dir + "images/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// fonts
gulp.task("fonts", function () {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.dir + "fonts/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// Plugins
gulp.task("plugins", function () {
  return gulp
    .src(path.src.plugins)
    .pipe(gulp.dest(path.build.dir + "plugins/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );
});

// static files
gulp.task("static", function () {
  return gulp.src(path.src.static).pipe(gulp.dest(path.build.dir));
});

// Clean Theme Folder
gulp.task("clean", function (cb) {
  rimraf("./theme", cb);
});

// Watch Task
gulp.task("watch", function () {
  gulp.watch(path.src.html, gulp.series("html"));
  gulp.watch(path.src.htminc, gulp.series("html"));
  gulp.watch(path.src.scss, gulp.series("scss"));
  gulp.watch(path.src.js, gulp.series("js"));
  gulp.watch(path.src.images, gulp.series("images"));
  gulp.watch(path.src.fonts, gulp.series("fonts"));
  gulp.watch(path.src.plugins, gulp.series("plugins"));
});

// dev Task
gulp.task(
  "default",
  gulp.series(
    "clean",
    "html",
    "js",
    "scss",
    "images",
    "fonts",
    "plugins",
    "static",
    gulp.parallel("watch", function () {
      bs.init({
        server: {
          baseDir: path.build.dir,
        },
      });
    })
  )
);

// Build Task
gulp.task(
  "build",
  gulp.series(
    "clean",
    "html",
    "js",
    "scss",
    "images",
    "fonts",
    "plugins",
    "static"
  )
);

// Build Download Files Task
gulp.task(
  "download",
  gulp.series(
    "clean",
    "html",
    "js",
    "scss",
    "scss-files",
    "images",
    "images-blur",
    "fonts",
    "plugins",
    "static"
  )
);

// Deploy Task
gulp.task(
  "deploy",
  gulp.series("html", "js", "scss", "images", "fonts", "plugins", "static")
);
