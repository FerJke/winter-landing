const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


/* ----------- Server ----------- */
gulp.task('server', function(){
  browserSync.init({
    server : {
      port : 9000,
      baseDir : "build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* -------------- Sass --------------- */
gulp.task('sass', function(){
  return gulp.src('src/sass/style.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 8 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('build/css'));
});

/* ---------------- Html ------------------ */
gulp.task('copy:html', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('build/css'));
});

/* ------------- Copy Fonts -------------- */
gulp.task('copy:fonts', function(){
  return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

/* ------------- Copy img -------------- */
gulp.task('copy:img', function(){
  return gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('build/img'));
});

/* -------------- Copy ---------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:img', 'copy:html'));

/* ---------------- Watchers ----------------- */
gulp.task('watch', function(){
  gulp.watch('src/index.html', gulp.series('copy:html'));
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
});

/* ---------------- Default ----------------- */
gulp.task('default', gulp.series(
    gulp.parallel('sass', 'copy'),
    gulp.parallel('watch', 'server')
  )
);
