(function() {
  'use strict';

  /**
   * Required node plugins
   * NOTE: Be sure to run `npm install` in order to use all the dependencies mentioned in this `gulpfile`
   */
  var gulp         = require('gulp');
  var glob         = require('glob');
  var del          = require('del');
  var browserSync  = require('browser-sync');
  var reload       = browserSync.reload;
  var $            = require('gulp-load-plugins')();
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');
  var cssnano      = require('cssnano');
  var order        = require('postcss-ordered-values');

  /**
   * Set up prod/dev tasks
   */
  var is_prod       = !($.util.env.dev);


  /**
   * Set up project variables
   */
  var pkg           = require('./package.json');
  // The `shortName` in package.json should be the theme dir name
  var _theme_name   = pkg.shortName.toLowerCase();


  /**
   * Set up file paths
   */
  var _bower_dir    = 'bower_components';
  var _theme_dir    = 'wp-content/themes/' + _theme_name;
  var _assets_dir   = _theme_dir + '/assets';
  var _src_dir      = _assets_dir + '/src';
  var _dist_dir     = _assets_dir + '/dist';
  var _dev_dir      = _assets_dir + '/dev';
  var _img_src_dir = _src_dir + '/img';
  var _img_dir      = _assets_dir + '/img';
  var _build_dir    = (is_prod) ? _dist_dir : _dev_dir;


  /**
   * Error notification settings
   */
  function errorAlert(err) {
    $.notify.onError({
      message:  '<%= error.message %>',
      sound:    'Sosumi'
    })(err);
  }


  /**
   * Clean the dist/dev directories
   */
  gulp.task('clean', function() {
    del( _build_dir + '/**/*' );
  });


  /**
   * Lints the gulpfile for errors
   */
  gulp.task('lint:gulpfile', function() {
    gulp.src('gulpfile.js')
      .pipe( $.jshint() )
      .pipe( $.jshint.reporter('default') )
      .on( 'error', errorAlert );
  });


  /**
   * Lints the source js files for errors
   */
  gulp.task('lint:src', function() {
    var _src = [
      _src_dir + '/js/**/*.js',
      '!**/libs/**/*.js'
    ];

    gulp.src(_src)
      .pipe( $.jshint() )
      .pipe( $.jshint.reporter('default') )
      .on( 'error', errorAlert );
  });


  /**
   * Lints all the js files for errors
   */
  gulp.task('lint', [
    'lint:gulpfile',
    'lint:src',
    'lint:sass',
  ]);


  /**
   * Concatenates, minifies and renames the source JS files for dist/dev
   */
  gulp.task('scripts', function() {
    var matches = glob.sync(_src_dir + '/js/*');

    if (matches.length) {
      matches.forEach( function(match) {
        var dir     = match.split('/js/')[1];
        var scripts = [
          _src_dir + '/js/' + dir + '/libs/**/*.js',
          _src_dir + '/js/' + dir + '/**/*.js'
        ];

        if (dir === 'footer') {
          // Add any JS from Bower or another location
          // to this `footer_libs` array to concat it into `footer.js`
          // eg: _bower_dir + '/responsive-nav/responsive-nav.min.js'
          var footer_libs = [
            _bower_dir + '/js-cookie/src/js.cookie.js'
          ];

          scripts = footer_libs.concat(scripts);
        }

        gulp.src(scripts)
          .pipe( $.plumber({ errorHandler: errorAlert }) )
          .pipe( $.concat(dir + '.js') )
          .pipe( $.babel() )
          .pipe( is_prod ? $.uglify() : $.util.noop() )
          .pipe( is_prod ? $.rename(dir + '.min.js') : $.util.noop() )
          .pipe( gulp.dest(_build_dir) )
          .pipe( reload({stream:true}) )
          .on( 'error', errorAlert )
          .pipe(
            $.notify({
              message:  (is_prod) ? dir + ' scripts have been compiled and minified' : dir + ' dev scripts have been compiled',
              onLast:   true
            })
          );
      });
    }
  });


  /**
   * Compiles and compresses the source Sass files for dist/dev
   */
  gulp.task('styles', function() {
    var _sass_opts = {
      outputStyle:    'expanded',
      sourceComments: !is_prod
    };

    var ap_options = autoprefixer({
      cascade:  false
    });

    var _postcss = [
      ap_options,
      order(),
    ];

    gulp.src(_src_dir + '/scss/style.scss')
      .pipe( $.plumber({ errorHandler: errorAlert }) )
      .pipe( $.sass(_sass_opts) )
      .on( 'error', function(err) {
        new $.util.PluginError(
          'CSS',
          err,
          {
            showStack: true
          }
        );
      })
      .pipe( is_prod ? $.rename({ suffix: '.min' }) : $.util.noop() )
      .pipe( postcss(_postcss) )
      .pipe( is_prod ? postcss([cssnano()]) : $.util.noop() )
      .pipe( gulp.dest(_build_dir) )
      .pipe( reload({stream:true}) )
      .on( 'error', errorAlert )
      .pipe(
        $.notify({
          message:  (is_prod) ? 'Styles have been compiled and minified' : 'Dev styles have been compiled',
          onLast:   true
        })
      );
  });


  /**
   * Lint the Sass
   */
  gulp.task('lint:sass', function() {
    gulp.src([_src_dir + '/scss/**/*.scss', '!' + _src_dir + '/scss/vendor/*'])
      .pipe( $.sassLint({
        'merge-default-rules': true
      }) )
      .pipe( $.sassLint.format() )
      .pipe( $.sassLint.failOnError() );
  });

  /**
   * Minimizes all the images
   */
  gulp.task('images', function() {
    var _options = {
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false,
        removeHiddenElems: false
      }]
    };
    return gulp.src(_img_src_dir + '/**/*.{png,jpg,jpeg,gif,svg}')
      .pipe( $.changed(_img_dir) )
      .pipe( $.imagemin(_options) )
      .pipe( gulp.dest(_img_dir) )
      .pipe(
        $.notify({
          message:  'Images have been compressed',
          onLast:   true
        })
      );
  });


  /**
   * Builds for distribution (staging or production)
   */
  gulp.task('build', [
    'clean',
    'lint',
    'scripts',
    'styles',
    'images'
  ]);


  /**
   * Builds assets and reloads the page when any php, html, img or dev files change
   */
  gulp.task('watch', function() {
    browserSync({
      proxy: pkg.name.toLowerCase() + '.dev',
      notify: true,
      port: 3200
    });
    gulp.watch( _src_dir + '/scss/**/*', ['styles'] );
    gulp.watch( _src_dir + '/js/**/*', ['scripts'] );
    gulp.watch( _theme_dir + '/**/*.php' ).on('change', reload );
    gulp.watch( _theme_dir + '/**/*.html' ).on('change', reload );
    gulp.watch( _img_src_dir + '/**/*.{png,jpg,jpeg,gif,svg}', ['images'] );
  });


  /**
   * Backup default task just triggers a build
   */
  gulp.task('default', [ 'build' ]);

}());
