const gulp = require('gulp');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

//File paths
let DIST_PATH = 'public/dist';
let SCRIPTS_PATH = 'public/scripts/**/*.js';
let STYLES_PATH = 'public/css/**/*.css';

//Styles
gulp.task('styles', () => {
    console.log(`Starting styles task`);
    
    return gulp.src(['public/css/reset.css', STYLES_PATH]) //use an array of paths to get specify which should come first
        .pipe(plumber( (err) => {
            console.log(`Styles task error!`);
            console.log(err);
            this.emit('end'); //this is an internal method that tells gulp to stop running the processes but to still keep gulp up
        }))
        .pipe(autoprefixer()) //should be added before concat
        .pipe(concat('styles.css'))
        .pipe(minifyCss())//minify css after concatenating the files
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
   gulp.watch(STYLES_PATH, ['styles']);
});