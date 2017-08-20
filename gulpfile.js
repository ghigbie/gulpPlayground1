const gulp = require('gulp');
const uglify = require('gulp-uglify');

//File paths
let SCRIPTS_PATH = 'public/scripts/**/*.js';

//Styles
gulp.task('styles', () => {
    console.log(`Starting styles task`);
});

//Scripts
gulp.task('scripts', () => {
    console.log(`Starting scripts task`);
    
    return gulp.src(SCRIPTS_PATH) //This can be either SCRIPTS_PATH or 'public/scripts/*.js'
        .pipe(uglify())  //this pipe calls uglify
        .pipe(gulp.dest('public/dist')); //this saves contents root of dist
});


//Images
gulp.task('images', () => {
    console.log(`Startng images task`);
});

//Default
gulp.task('default', () => {
   console.log(`Starting default task`); 
});

//Watch
gulp.task('watch', () => {
   console.log('Starting gulp watch...watching everyting!'); 
   gulp.watch(SCRIPTS_PATH);
});