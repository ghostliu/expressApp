var gulp = require('gulp');
//var livereload = require('gulp-livereload');
var server = require('gulp-express');

gulp.task('server',function(){

	server.run(['./bin/www']);//start
	//server.run(['app.js']);

	gulp.watch('public/**/*.css',server.notify);
	gulp.watch('public/**/*.js',server.notify);
	gulp.watch('views/**/*.jade',server.notify);
	
	gulp.watch(['app.js','routes/**/*.js'],[server.run]);

});

gulp.task('default',['server']);