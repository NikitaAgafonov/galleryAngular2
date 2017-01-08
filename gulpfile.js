const gulp                 = require('gulp'),
	sass                   = require('gulp-sass'),
	cleanCSS               = require('gulp-clean-css'),
	rename                 = require('gulp-rename'),
	autoprefixer           = require('gulp-autoprefixer'),
	browserSync            = require('browser-sync').create(),
	uncss                  = require('gulp-uncss'),
	concat                 = require('gulp-concat'),
	uglify                 = require('gulp-uglify'),
	wiredep                = require('wiredep').stream,
	useref                 = require('gulp-useref'),
	gulpif                 = require('gulp-if'),
	babel                  = require('gulp-babel'),
	clean                  = require('gulp-clean'),
	del                    = require('del'),
	imagemin               = require('gulp-imagemin'),
	pngquant               = require('imagemin-pngquant'),
	imageminJpegoptim      = require('imagemin-jpegoptim'),
	babelify               = require('babelify'),
	browserify             = require('browserify'),
	source                 = require('vinyl-source-stream'),
	buffer                 = require('vinyl-buffer'),
    ts                     = require('gulp-typescript'),
	tsProject              = ts.createProject("tsconfig.json");
    tsConfig               = require('./tsconfig.json'),
    sourcemaps             = require('gulp-sourcemaps'),
	libsAngularJs          = [
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/@angular/**'
    ],
	config                 = {
		modules: true,
		typeScript: true,
		project: 'src/',
		img: 'src/img',
		buildProject: 'build/',
		buildImg: 'build/img',
		sass: 'src/sass',
		indexHTML: 'src/index.html',
		styleCSS: 'src/css',
		scripts: 'src/scripts',
		libs: 'src/libs',
		mainCSS: 'src/css/style.css',
		bower: 'bower.json',
		babelES: 'src/babel',
		mainJS: 'src/babel/main.js'
	};

gulp.task('clearNotUsingCSS', function () {
    return gulp.src(config.mainCSS)
        .pipe(uncss({
            html: [config.indexHTML]
        }))
        .pipe(gulp.dest(config.buildProject+'css'));
});

gulp.task('sass', function () {
	gulp.src(config.sass+'/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(config.styleCSS))
});

gulp.task('img', function () {
	//imagemin([config.img+'/**/*.jpg'], config.buildImg, {use: [imageminJpegtran()]});
	return gulp.src(config.img+'/**/*')
		.pipe(imagemin({
			arithmetic: true,
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox:false}],
			use: [pngquant(),imageminJpegoptim()]
		}))
		.pipe(gulp.dest(config.buildImg))
});

gulp.task('copyLibs', function() {
	return gulp.src(libsAngularJs).pipe(gulp.dest(config.libs))
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: config.project
		},
		notify: false,
		open: true
	})
});

gulp.task('bower', function () {
	gulp.src(config.indexHTML)
		.pipe(wiredep({
			directory: config.libs
		}))
		.pipe(gulp.dest(config.project));
});

gulp.task('babel', () => {
    return gulp.src(config.babelES+'/**/*.+(js|jsx)')
        .pipe(babel())
        .pipe(gulp.dest(config.scripts));
});

gulp.task('es6', (config.typeScript) ? ['typeScript']:[], () => {
    browserify(config.mainJS)
        .transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest(config.scripts));
});

gulp.task('typeScript', function () {
    let tsResult = gulp.src(config.babelES+"/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: config.project}))
        .pipe(gulp.dest(config.babelES));
});

gulp.task('watch', ['browser-sync', 'sass', 'es6'], function () {
    gulp.watch(config.babelES+'/**/*.ts', ['typeScript']);
	gulp.watch(config.sass+'/**/*.+(scss|sass)', ['sass']);
	(config.modules) ? gulp.watch(config.babelES+'/main.+(js|jsx)', ['es6']): gulp.watch(config.babelES+'/**/*.+(js|jsx)', ['babel']);
	gulp.watch(config.project+'**/*.+(css|html|js)').on('change', browserSync.reload);
	gulp.watch(config.bower, ['bower']);
});

gulp.task('cleanProj', function () {
	return del([config.buildProject+'**/*'])
});

gulp.task('build', ['cleanProj', 'img', 'sass', (config.modules) ? 'es6' : 'babel'], function () {

	return gulp.src(config.project+'*.html')
        .pipe(useref(config.project))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest(config.buildProject));
});