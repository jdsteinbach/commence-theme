<?php

if ( !defined( 'WP_ENV' ) ) {
// Run local variations for `.dev` domains
  define( 'WP_ENV', ( array_pop( explode( '.', $_SERVER['HTTP_HOST'] ) ) == 'dev' ) ? 'local' : 'prod' );
}
define( 'WWW_URL',       site_url() );
define( 'TMPL_URI',      get_template_directory_uri() );
define( 'TMPL_DIR',      get_template_directory() );
define( 'IMG_DIR',       TMPL_DIR . '/assets/img/' );
define( 'SITE_NAME',     get_option( 'blogname' ) );
define( 'SITE_TAGLINE',  get_option( 'blogdescription' ) );
define( 'AUTHOR',        SITE_NAME . ' - '. WWW_URL );
define( 'SS_URI',        get_stylesheet_directory_uri() );
define( 'SS_DIR',        get_stylesheet_directory() );
define( 'DEFAULT_PHOTO', '//placehold.it/300x200/222/fff/&text=Photo+Not+Available' );
define( 'ALLOW_COMMENTS', true );
//define( 'TYPEKIT',      '123456' );
//define( 'FB_APP_ID',    '' );
//define( 'FB_PAGE',      '' );
//define( 'TWITTER_USERNAME',       '' );
//define( 'GOOGLE_PLUS_AUTHOR',     '' );
//define( 'GOOGLE_PLUS_PUBLISHER',  '' );
