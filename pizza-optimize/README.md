## Website Performance Optimization portfolio project

Try the best to optimize the critical rendering path and make this page render as quickly as possible.

To get started, check out the repository and inspect the code.

### Getting started

###Run the site

Download the repository and unzip it. Open the index.html with your browser.

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Optimization Lists

##### main.js

- Use getElementById & getElementByClassName instead of querySelecteAll and move these lines out of loop.
- Simplify the caculation in the loop by define and calculate variables out of loops.(function updatePositions)
- Caculate number of sliding pizzas dynamoically according to the screen height and width rather than generate 200 pizzas rudely.

##### style.css

- Add `transform: translateZ(0);`and `backface-visibility:hidden` to the class `mover`. Enable hardware accelerated CSS.
- [Autoprefier CSS](autoprefixer.github.io)

##### pizza.html

- Add `media` attribute of print.
- Add `async` attribute to googleAnalytics.js and perfmatters.js.
- Inline the style css as in this case css is not complicated.

##### images

- Minify.

### Customization with Bootstrap

The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>



### Grunt

The project used grunt. To know more about [grunt](gruntjs.com).

Plug-ins:

- [uglify](https://www.npmjs.com/package/grunt-contrib-uglify)
- [cssmin](https://www.npmjs.com/package/grunt-contrib-cssmin)
- [imagemin](https://www.npmjs.com/package/grunt-contrib-imagemin)

node_modules has been ignored.