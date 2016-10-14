const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");

gulp.task('mini', () => (
  gulp.src('src/word-table.js')
  .pipe(gulp.dest('dist/'))
  .pipe(uglify())    //uglify
  .pipe(rename("word-table.min.js"))
  .pipe(gulp.dest('dist/'))
));