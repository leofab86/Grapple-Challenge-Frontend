"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var eslint = require('gulp-eslint'); //Lint JS files, including JSX

var config = require('./config');


gulp.task('default', ['frontend']);



// ------------------------------------ FRONT END ----------------------------------------
// ----------------------------------------------------------------------------------------

gulp.task('frontend', ['js', 'css', 'lint', 'watch']);


gulp.task('js', function () {
	return browserify({
			entries: config.paths.mainJs,
			debug: true
		})
		.transform("babelify", {presets: ["node6", "react", "stage-0"]}, {plugins: ["transform-object-rest-spread"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.assets + '/javascripts'))
		.pipe(connect.reload())	
});

gulp.task('css', function() {
	return gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.assets + '/stylesheets'))
		.pipe(connect.reload())
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('watch', function () {
	gulp.watch(config.paths.js, ['js', 'lint'])
	gulp.watch(config.paths.css, ['css'])
});
