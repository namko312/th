var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var runSequence = require('run-sequence')

/* STYLE */
gulp.task('sass-compile', function() {
    return gulp.src('sass/src/**/*.scss')
        .pipe(concat('all.scss'))
        .pipe(gulp.dest('sass'));
})
gulp.task('sass', function(){
    return gulp.src('sass/all.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/styles'))
})

gulp.task('watch', function(){
    gulp.watch(['sass/src/**/*'], () => runSequence('sass-compile'));
})


gulp.task('default', ['sass-compile','watch'])