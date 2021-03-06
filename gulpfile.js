const gulp = require('gulp');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const del = require('del');
const zip = require('gulp-zip')

//Handlebars plugins
const handlebars = require('gulp-handlebars');
const handlebarsLib = require('handlebars');
const declare = require('gulp-declare');
const wrap = require('gulp-wrap');

//Image compression
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

//File paths
let DIST_PATH = 'public/dist';
let SCRIPTS_PATH = 'public/scripts/**/*.js';
let STYLES_PATH = 'public/css/**/*.css';
let TEMPLATES_PATH = 'templates/**/*.hbs';
let IMAGES_PATH = 'public/images/**/*.{png, jpeg, jpg, svg gif}'; //{} at end adds spport for all included file types

//Styles - for regular CSS
// gulp.task('styles', () => {
//     console.log(`Starting styles task`);
    
//     return gulp.src(['public/css/reset.css', STYLES_PATH]) //use an array of paths to get specify which should come first
//         .pipe(plumber( (err) => {
//             console.log(`Styles task error!`);
//             console.log(err);
//             this.emit('end'); //this is an internal method that tells gulp to stop running the processes but to still keep gulp up
//         }))
//         .pipe(sourcemaps.init())//should be called right before concat and minify
//         .pipe(autoprefixer()) //should be added before concat
//         .pipe(concat('styles.css'))
//         .pipe(minifyCss())//minify css after concatenating the files
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH))
//         .pipe(livereload());
// });

//Styles - for SCSS
gulp.task('styles', () => {
    console.log(`Starting styles task`);
    
    return gulp.src('public/scss/styles.scss')//this is path the scss file
        .pipe(plumber( (err) => {
            console.log(`Styles task error!`);
            console.log(err);
            this.emit('end'); //this is an internal method that tells gulp to stop running the processes but to still keep gulp up
        }))
        .pipe(sourcemaps.init())//should be called right before concat and minify
        .pipe(autoprefixer()) //should be added before concat
        .pipe(sass({
            outputStyle: 'compressed'
        })) //sass takes care of concatenation and minification
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//Scripts
gulp.task('scripts', () => {
    console.log(`Starting scripts task`);
    
    return gulp.src(SCRIPTS_PATH) //This can be either SCRIPTS_PATH or 'public/scripts/*.js'
        .pipe(plumber( (err) => {
            console.log('Scripts task error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())  //this pipe calls uglify
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH)) //this saves contents root of dist
        .pipe(livereload()); //this triggers the reload as soon as something gits compressed
});


//Images
gulp.task('images', () => {
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imagemin.gifsicle(), //default that needs to be called to use plugins
                imagemin.jpegtran(), //default that needs to be called to use plugins
                imagemin.optipng(), //default that needs to be called to use plugins
                imagemin.svgo(), //default that needs to be called to use plugins
                imageminPngquant(), //plugin
                imageminJpegRecompress() //plugin
                
            ]
        ))
        .pipe(gulp.dest(DIST_PATH + '/images'));
});

//Templates task
gulp.task('templates', () => {
    return gulp.src(TEMPLATES_PATH)
        .pipe(handlebars({
            handlebars: handlebarsLib
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(DIST_PATH))
        .pipe(livereload());
});

//Clean task
gulp.task('clean', () => {
    return del.sync([
       DIST_PATH
    ]); 
});

//Default
gulp.task('default', ['images', 'templates', 'styles', 'scripts'], () =>{
   console.log(`Starting default task`); 
});

gulp.task('export', () => {
   return gulp.src('public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'));
});

//Watch  --- gulp watch is built into gulp
gulp.task('watch', ['default'], () => { 
   console.log('Starting gulp watch...watching everyting!'); 
   require('./server.js');
   livereload.listen();
   gulp.watch(SCRIPTS_PATH, ['scripts']); //gulp watch needs an array of tasks that need to be run
   //gulp.watch(STYLES_PATH, ['styles']);
   gulp.watch('public/scss/**/*.scss', ['styles']); //gulp watch for scss
   gulp.watch(TEMPLATES_PATH, ['templates']);
});