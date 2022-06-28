"use strict";

const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass");
const gutil = require("gulp-util");
const jshint = require("gulp-jshint");
const clean = require("gulp-clean");
const csso = require("gulp-csso");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const rtlcss = require("gulp-rtlcss");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const webp = require("imagemin-webp");
const fileinclude = require("gulp-file-include");
const inject = require("gulp-inject-string");
const jobs = require("gulp-javascript-obfuscator");
const autoprefixer = require("gulp-autoprefixer");
const gulpif = require("gulp-if");
const argv = require("minimist")(process.argv.slice(2));
const browserSync = require("browser-sync").create();

const path = {
  html: "source/*.html",
  htminc: "source/_inc/**/*.htm",
  incdir: "source/_inc/",
  plugins: "source/assets/plugins/**/*.*",
  js: "source/js/*.*",
  data: "source/assets/data/*.*",
  scss: "source/scss/**/*.scss",
  img: "source/assets/img/**/*.+(png|jpg|gif)",
  options: "source/assets/options/**/*.*",
  manifest: "source/manifest.json",
  sw: "source/pwabuilder-sw.js",
};

const destination = argv.demo
  ? "build/demo/"
  : argv.pub
  ? "build/publish/"
  : "build/development/";

const assets = destination + "assets/";

const sourcemap = argv.demo ? false : argv.pub ? false : true;

const port = argv.demo ? 8002 : argv.pub ? 8003 : 8001;

/* =====================================================
    CLEAN
    ===================================================== */

const cleanit = function () {
  return src(destination, { read: false, allowEmpty: true }).pipe(clean());
};

/* =====================================================
    HTML
    ===================================================== */

const html = function () {
  return (
    src(path.html)
      .pipe(customPlumber("Error Running html-include"))
      .pipe(fileinclude({ basepath: path.incdir }))
      // Inject theme option for TO and DEMO
      .pipe(
        gulpif(
          argv.to || argv.demo,
          inject.before(
            "</body",
            '<link href="assets/options/optionswitch.css" rel="stylesheet">\n'
          )
        )
      )
      .pipe(
        gulpif(
          argv.to || argv.demo,
          inject.before(
            "</body",
            '<script src="assets/options/optionswitcher.js"></script>\n'
          )
        )
      )
      .pipe(gulpif(argv.demo, inject.replace(".jpg", ".webp")))
      .pipe(gulpif(argv.demo, inject.replace(".png", ".webp")))
      .pipe(dest(destination))
      .pipe(
        browserSync.reload({
          stream: true,
        })
      )
  );
};

/* =====================================================
    SCSS
    ===================================================== */

const scss = function () {
  const ignoreNotification = false;
  return (
    src(path.scss)
      .pipe(customPlumber("Error Running Sass"))
      // sourcemaps for Development
      .pipe(gulpif(sourcemap, sourcemaps.init()))
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(
        gulpif(
          argv.demo,
          csso({
            restructure: false,
            sourceMap: true,
            debug: true,
          })
        )
      )
      .pipe(gulpif(sourcemap, sourcemaps.write(".")))
      .pipe(dest(assets + "css/"))
      .pipe(
        browserSync.reload({
          stream: true,
        })
      )
  );
};

const rtl = function () {
  const ignoreNotification = false;
  return src(assets + "css/sleek.css")
    .pipe(customPlumber("Error Running RTL"))
    .pipe(rtlcss())
    .pipe(rename({ suffix: ".rtl" }))
    .pipe(dest(assets + "css/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};

/* =====================================================
    JS
    ===================================================== */

const js = function () {
  return (
    src(path.js)
      .pipe(customPlumber("Error Running JS"))
      .pipe(jshint("./.jshintrc"))
      .pipe(
        notify(function (file) {
          if (!file.jshint.success) {
            return (
              file.relative + " (" + file.jshint.results.length + " errors)\n"
            );
          }
        })
      )
      // .pipe(jshint.reporter('jshint-stylish'))
      .pipe(
        gulpif(
          argv.demo,
          inject.append(`
    
    \n`)
        )
      )
      .on("error", gutil.log)
      // .pipe(gulpif(argv.demo, uglify()))
      .pipe(
        gulpif(
          argv.demo,
          jobs({
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: true,
            identifierNamesGenerator: "hexadecimal",
            log: false,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            shuffleStringArray: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 10,
            stringArray: true,
            stringArrayEncoding: ["base64"],
            stringArrayThreshold: 0.75,
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
          })
        )
      )
      .pipe(dest(assets + "js/"))
      .pipe(
        browserSync.reload({
          stream: true,
        })
      )
  );
};

/* =====================================================
    IMAGE
    ===================================================== */

const img = function () {
  return src(path.img)
    .pipe(
      gulpif(
        argv.demo,
        imagemin([
          webp({
            quality: 75,
          }),
        ])
      )
    )
    .pipe(gulpif(argv.demo, rename({ extname: ".webp" })))
    .pipe(dest(assets + "img/"))
    .pipe(gulpif(argv.demo, inject.replace(".jpg", ".webp")))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};

/* =====================================================
    PLUGINS
    ===================================================== */

const plugins = function () {
  return src(path.plugins)
    .pipe(dest(assets + "plugins/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};

/* =====================================================
    PWA
    ===================================================== */

const pwa = function () {
  return src([path.manifest, path.sw])
    .pipe(dest(destination))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};

/* =====================================================
    DATA
    ===================================================== */

const data = function () {
  return src(path.data)
    .pipe(dest(assets + "data/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
};

/* =====================================================
    OPTIONS
    ===================================================== */

const options = function () {
  return src(path.options)
    .pipe(gulpif(argv.to || argv.demo, dest(assets + "options/")))
    .pipe(
      gulpif(
        argv.to || argv.demo,
        browserSync.reload({
          stream: true,
        })
      )
    );
};

/* =====================================================
    ERROR MESSAGE
    ===================================================== */

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      // Customizing error title
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Glass",
    }),
  });
}

/* =====================================================
    BUILD
    ===================================================== */

const build = series(
  cleanit,
  html,
  scss,
  js,
  img,
  plugins,
  data,
  pwa,
  options,
  rtl
);
exports.build = build;

/* =====================================================
    WATCH
    ===================================================== */

const watcher = function () {
  watch(path.html, html);
  watch(path.htminc, html);
  watch(path.scss, scss);
  watch(path.js, js);
  watch(path.data, data);
  watch(path.img, img);
  watch(path.options, options);
  watch(assets + "css/sleek.css", rtl);
  browserSync.init({
    server: {
      baseDir: destination,
    },
    port: port,
  });
};

/* =====================================================
    TASKS
    ===================================================== */

exports.default = series(build, watcher);

/* =====================================================
    COMMANDS
    ===================================================== */

// gulp         : Development
// gulp --to    : Development with Theme Option

// gulp build --demo  : Live Preview Demo
// gulp build --pub   : Publishable
