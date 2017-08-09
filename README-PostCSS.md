## PostCSS in Gulp

This branch adds a number of PostCSS modules to improve the current `gulp styles` task.

### Optimization

#### Autoprefixer

"Wait," you ask, "weren't we already using Autoprefixer?" Yes, we were using the `gulp-autoprefixer` module. But Autoprefixer is currently designed to be run primarily as a PostCSS plugin and the previous module was a wrapper around what amounted to a PostCSS clone for the sake of Autoprefixer. Using it in PostCSS is the most "native" way to run it, and in fact, Autoprefixer actually outputs more thorough fallbacks as a PostCSS plugin than in the gulp wrapper.

#### CSSNano

This is a better minifier than the Sass `outputStyle: compressed` option. This new gulpfile runs CSSNano as its own task inside an `is_prod` test and the Sass option no longer needs to be toggled.

#### MQ-Packer

We like putting media query mixins inside of each selector that needs them. This, of course, means a lot of repetititive `@media` blocks. The mq-packer plugin combines all identical media queries and can lower the output. It deserves mentioning that gzip already crushes most of the weight that came from that repetition. Feel free to test the gzipped size of your stylesheet with & without this function to make sure your CSS benefits from it.

#### Order

The order plugin sorts all the CSS properties within a selector block. This allows devs to follow any consistent ordering pattern they prefer (and even to make mistakes in their ordering!) and cleans up the output for every declaration set. Consistent property order can give gzip more opportunities to abbreviate repeated strings.

### Analysis

Ever wish you had more information about your CSS? This gulpfile includes a new task called `analyze-css`. It returns several pieces of information about the CSS you've been authoring.

#### CSSStats

This plugin crawls through your CSS and dumps a big array into console. The array will give you average selector specificity, average ruleset length, size (inc. gzipped) and a list of all selectors, rulesets, declarations, & MQs written. In console, this is informative, but feel free to write it to a file for more detailed analysis.

#### ListSelectors

As you might guess, list-selectors lists all the selectors you've written. It prints a large array to Terminal (again, feel free to write this to a file), allowing you to debug too-long & too-specific selectors.

#### ImmutableCSS

This isn't required by our coding style guide, but may be a helpful guideline. This plugin helps CSS authors follow the philosophy that a CSS component should be defined once and not re-defined, modified, or contextualize with in late selectors or Sass partials. The more frequently you modify the CSS inside a given selector, the harder it is to troubleshoot across an entire project. Again, this package's advice isn't policy/standard, but it does help enforce a philosophy that makes maintenance/troubleshooting easier.