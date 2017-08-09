<?php

/**
 * Load Development Styles/Scripts (for local)
 */
function cmmc_load_dev_styles_scripts() {
  // Theme styles
  wp_enqueue_style( 'main-css', SS_URI . '/assets/dev/style.css', false, null, 'all' );
  // Header Scripts
  wp_enqueue_script( 'header-scripts', SS_URI . '/assets/dev/header.js', array(), null, false );
  // Footer Scripts
  wp_enqueue_script( 'footer-scripts', SS_URI . '/assets/dev/footer.js', array( 'jquery' ), null, true );
}
if ( !is_admin() && 'local' == WP_ENV ) add_action( 'wp_enqueue_scripts', 'cmmc_load_dev_styles_scripts' );

/**
 * Load Distribution Styles/Scripts (for staging and production)
 */
function cmmc_load_prod_styles_scripts() {
  // Theme styles
  wp_enqueue_style( 'main-css', SS_URI . '/assets/dist/style.min.css', false, null, 'all' );
  // Header Scripts
  wp_enqueue_script( 'header-scripts', SS_URI . '/assets/dist/header.min.js', array(), null, false );
  // Footer Scripts
  wp_enqueue_script( 'footer-scripts', SS_URI . '/assets/dist/footer.min.js', array( 'jquery' ), null, true );
}
if ( !is_admin() && 'local' != WP_ENV ) add_action( 'wp_enqueue_scripts', 'cmmc_load_prod_styles_scripts' );
