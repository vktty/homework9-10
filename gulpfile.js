const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Шляхи
const paths = {
  scss: './sass/main.scss',
  css: './css',
  html: './*.html'
};

// Компіляція Sass → CSS
function compileSass() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream()); // автоматичне оновлення
}

// Локальний сервер + вотчер
function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(paths.scss, compileSass);
  gulp.watch(paths.html).on('change', browserSync.reload);
}

// Задачі
exports.sass = compileSass;
exports.default = gulp.series(compileSass, serve);