const gulp = require('gulp');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');

//File paths
let SCRIPTS_PATH = 'public/scripts/**/*.js';
let STYLES_PATH = 'public/css/**/*.css';

let DIST_PATH = 'public/dist';

//Styles
gulp.task('styles', () => {
    console.log(`Starting styles task`);
    
    return gulp.src(STYLES_PATH)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//Scripts
gulp.task('scripts', () => {
    console.log(`Starting scripts task`);
    
    return gulp.src(SCRIPTS_PATH) //This can be either SCRIPTS_PATH or 'public/scripts/*.js'
        .pipe(uglify())  //this pipe calls uglify
        .pipe(gulp.dest(DIST_PATH)) //this saves contents root of dist
        .pipe(livereload()); //this triggers the reload as soon as something gits compressed
});


//Images
gulp.task('images', () => {
    console.log(`Startng images task`);
});

//Default
gulp.task('default', () => {
   console.log(`Starting default task`); 
});

//Watch  --- gulp watch is built into gulp
gulp.task('watch', () => { 
   console.log('Starting gulp watch...watching everyting!'); 
   require('./server.js');
   livereload.listen();
   gulp.watch(SCRIPTS_PATH, ['scripts']); //gulp watch needs an array of tasks that need to be run
});