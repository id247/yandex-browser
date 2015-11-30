var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
var fileinclude = require('gulp-file-include');
var strip = require('gulp-strip-comments');

//compile sass
gulp.task('sass', function () {
	gulp.src('./sass/style.scss')
    	.pipe(sass({outputStyle: 'expanded'})) // Converts Sass to CSS with gulp-sass      
        .on('error', console.log)
        .pipe(gulp.dest('./app/css'))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./app/css'));;
});

//autoprefixer
gulp.task('autoprefixer', function () {
	gulp.src('./app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/css'));
});

// generate sprite.png and _sprite.scss
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./app/images/sprite/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprites.scss',
                imgPath: '../images/sprite.png' 
            }));

    spriteData.img.pipe(gulp.dest('./app/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./sass/')).pipe(strip()).pipe(gulp.dest('./sass/')); // путь, куда сохраняем стили
});

// copy js file to app
gulp.task('copy-js', function() {
	gulp.src('./js/*.js')
   		.pipe(gulp.dest('./app/js'));
});

// include htmls
gulp.task('include', function() {
	gulp.src(['html/*.html', '!html/_*.html', '!html/* *.html'])
    .pipe(fileinclude({
      	prefix: '@@',
      	basepath: '@file',
        indent: true
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./app'));
});

gulp.task('default', function () {
	gulp.src('./app')
	    .pipe(server({
	      livereload: true,
	      directoryListing: false,
	      open: false,
	      port: 9000
	    }));
  	gulp.watch('./sass/**/*.scss', ['sass']);
  	gulp.watch('./app/images/sprite/*.png', ['sprite']);
  	gulp.watch('./js/**/*.js', ['copy-js']);
  	gulp.watch('./html/**/*.html', ['include']);
});
