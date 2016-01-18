var gulp = require('gulp');
var sass = require ('gulp-sass');
var autoprefixer = require ('gulp-autoprefixer');
var eslint = require('gulp-eslint');

gulp.task('default', ['styles', 'lint'], function() {
    gulp.watch('./app/styles/sass/**/*.scss', ['styles']);
    gulp.watch('app/js/**/*.js', ['lint']);
});

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['app/js/**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});


gulp.task('styles', function() {
    gulp.src('./app/styles/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({browsers: ['last 3 versions']}))
            .pipe(gulp.dest('./app/styles/css'));
});
