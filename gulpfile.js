const gulp = require('gulp');
const uglify = require('gulp-uglify');

//Styles
gulp.task('styles', () => {
    console.log(`Starting styles task`);
});

//Scripts
gulp.task('scripts', () => {
    console.log(`Starting scripts task`);
    
    return gulp.src('public/scripts/*.js')
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