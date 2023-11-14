const gulp = require("gulp");
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

/*
    -- Top Level Functions --
    gulp.task - define task
    gulp.src - point to files to use
    gulp.dest - point to folder to output
    gulp.watch - watch files and folders for changes
*/

function message() {
    return console.log('Gulp is running.');
};

function copyHTML() {
    return gulp.src('./src/*.html').pipe(gulp.dest('./dist'))
}

function imageMinify() {
    return gulp.src('./src/images/*')
    .pipe(imageMin())
    .pipe(gulp.dest('./dist/images'))
}

function sassCovert() {
    return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
}

function concatJSFiles() {
    return gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

function watchTask(){
    gulp.watch('./src/js/*.js', concatJSFiles)
    gulp.watch('./src/*.html', copyHTML)
    gulp.watch('./src/images/*', imageMinify)
    gulp.watch('./src/sass/*.scss', sassCovert)
}

exports.default = gulp.series(
    concatJSFiles,
    copyHTML,
    imageMinify,
    sassCovert,
    watchTask
);

// gulp.task('message', () => {
//     return console.log('Gulp is running.');
// })

// gulp.task('copyHTML', () => {
//     gulp.src('./src/*.html').pipe(gulp.dest('./dist'))
// })

// gulp.task('imageMin', () => {
//     gulp.src('./src/images/*')
//     .pipe(imageMin())
//     .pipe(gulp.dest('./dist/images'))
// })

// gulp.task('sass', () => {
//     gulp.src('./src/sass/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./dist/css'))
// })

// gulp.task('concat', () => {
//     gulp.src('./src/js/*.js')
//     .pipe(concat('main.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist/js'))
// })

// gulp.task('watch', () => {
//     gulp.watch('./src/js/*.js', gulp.series('concat'))
//    gulp.watch('./src/*.html', gulp.series('copyHTML'))
//     gulp.watch('./src/images/*', gulp.series('imageMin'))
//      gulp.watch('./src/sass/*.scss', gulp.series('sass'))
// })



// gulp.task('default', gulp.parallel(['message', 'copyHTML', 'imageMin', 'sass', 'concat', 'watch']));

