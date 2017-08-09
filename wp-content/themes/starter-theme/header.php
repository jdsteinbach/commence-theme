<!doctype html>

<!--[if lt IE 7]> <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie10 lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie10 lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9]> <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="initial-scale=1.0">

  <?php if ( defined( 'TYPEKIT' ) ) : // Typkit Code ?>
    <script type="text/javascript">
      TypekitConfig = {
        kitId: '<?php echo TYPEKIT; ?>'
      };
      (function() {
        var tk = document.createElement('script');
        tk.src = '//use.typekit.com/' + TypekitConfig.kitId + '.js';
        tk.type = 'text/javascript';
        tk.async = 'true';
        tk.onload = tk.onreadystatechange = function() {
          var rs = this.readyState;
          if (rs && rs !== 'complete' && rs !== 'loaded') return;
          try { Typekit.load(TypekitConfig); } catch (e) {}
        };
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(tk, s);
      })();
    </script>
  <?php endif; ?>

  <?php if ( defined( 'GOOGLE_FONTS' ) ) : // Google Fonts Code ?>
    <script type="text/javascript">
      WebFontConfig = {
        google: { families: [ '<? echo GOOGLE_FONTS; ?>' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    </script>

    <noscript>
      <link href="http://fonts.googleapis.com/css?family=<? echo GOOGLE_FONTS; ?>" rel="stylesheet" type="text/css">
    </noscript>
  <?php endif; ?>
  <?php wp_head(); ?>

</head>

<body <?php body_class(); ?> >
  <a class="screen-reader-text skip-link" href="#content">Skip to content</a>

  <header role="banner" class="site-header">

    <a href="<?php echo WWW_URL; ?>" class="site-logo"><?php echo SITE_NAME; ?></a>
    <nav role="navigation" class="nav main-nav">
      <?php wp_nav_menu( array( 'menu' => 'Main-Nav', 'theme_location' => 'primary', 'container' => false ) ); ?>
    </nav>

  </header>
