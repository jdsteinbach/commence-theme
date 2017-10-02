# Commence Theme

This is not a normal WP theme. It doesn't come with styles or scripts or carousels or galleries or anything. It's a starter theme for you to build whatever you need from. It's a developer's starting place, not a user theme. It supports Sass, PostCSS, ES6 transpiling, image compression, and live reloading. It serves dev files locally and creates optimized assets for deploy.

* [Getting Started](#getting-started)
* [Theme Dependencies](#theme-dependencies)
* [Naming Conventions](#naming-conventions)
* [Using Gulp](#using-gulp)
* [PHP Constants](#php-constants)

## Getting Started

1. This repo depends on a git submodule, so when you clone it, add the `--recursive` flag to the clone command. That will clone the Sass submodule as well.
2. Copy over the theme files to your current site's WP theme folder (typically `/wp-content/theme/THEME_NAME`)
3. Rename the theme folder: an abbreviation of the site name + `-theme`. So, the theme folder name for reallycoolsite.com might be `rcs-theme`. Leave the most recent default WordPress theme as a safe fallback in the `/themes/` folder.
4. Add/replace the new theme folder name in `package.json` for the `shortName`
5. In the theme directory, install the necessary dependencies with `npm install; bower install`.

## Theme Dependencies

### Sass Deps

We use [Susy 2](http://susy.oddbird.net/) for grids and [Breakpoint-Sass](http://breakpoint-sass.com/) for media queries.

These are installed via Bower and the theme's Sass library imports them optionally (per their current versions' file structure). Comment out the needed lines in `assets/src/scss/vendor/_vendor.scss`

### JS Deps

**Modernizr** is added in `assets/src/js/header/libs/`.

**jQuery** is loaded from WP.

## Naming Conventions

@TODO write these

## Using Gulp

### Main Tasks

#### Build: Dev

```
gulp build --dev
```

To start our new project we need to run the `build` task with the `--dev` flag. When running our project locally we want to build and concatenate our assets but not minify them. This task creates a `dev` directory and runs all the tasks required to build the assets.

*Since these unminified files are only used locally, we also want to be sure we don't track these files in Git.*

The WP theme automatically toggles between assets in `assets/dev/` and `assets/dist/` for local work vs prod based on the site URL. If you're using a `.dev` domain, the theme will load the `assets/dev/` assets; otherwise it will load the `assets/dist/` assets. *If your local environment doesn't use a `.dev` domain, edit `functions/functions-constants.php` so that `WP_ENV` is set correctly.*

#### Watch: Dev

```
gulp watch --dev
```

After our `dev` directory is created, we can run the `watch` task with the `--dev` flag to set Gulp to automatically build the `dev` assets and reload the browser when necessary with BrowserSync.

*After running `watch` refresh the browser once, BrowserSync will launch a browser window at the addres of http://localhost:3000/ and will refresh automatically when changes to the theme are made.*

#### Build: Production

```
gulp build
```

This task builds our production assets concatonating and minifying all the necessary files to `/assets/dist/`. These are the files used in production.

**Always run `gulp build` before committing your work.**

### Additional Gulp tasks

Although `watch`, `build` should get you through 90% of your workflow there are other tasks (and subtasks) you can run in the current Gulp setup.

```
gulp clean    # Clean the dist/dev directories
gulp lint     # Lints all js files (including the gulpfile) for errors
gulp scripts  # Concatenates, minifies and renames the source JS files for dist/dev
gulp styles   # Compiles and compresses the source Sass files for dist/dev
gulp images   # Minimizes all the images
```

Each of these tasks (except for `images`) can be run with the `--dev` flag appended to them to create expanded files in the `dev` directory.

**Note:** The `images` task expects all your original image files to be in `/assets/src/img/`. It will non-destructively create the optimized copies in `/assets/img/`.

## PHP Constants

@TODO write these: `functions/functions-constants.php`
