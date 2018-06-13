var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglifyes"); //gulp-uglify-ecmascript/js6
var cssnano = require("gulp-cssnano");
var gulpIf = require("gulp-if");
var del = require("del");
var nunjucks = require("gulp-nunjucks");
var nunjucks_config = require("./nunjucks-data");
var nunjucksModule = require("nunjucks");
var merge = require('merge-stream');
var changed = require('gulp-changed');


var nunjucksEnv = new nunjucksModule.Environment(new nunjucksModule.FileSystemLoader("app/templates"));



gulp.task("sass", function () {
    return gulp.src("./app/css/*.+(scss|sass)")
        .pipe(plumber())
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(cssnano())
        .pipe(gulp.dest("./docs/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task("css", function () {
    return gulp.src(["./app/css/*.css", "!./app/css/*.min.css"])
        .pipe(plumber())
        .pipe(cssnano())
        .pipe(gulp.dest("./docs/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task("styles", gulp.parallel("sass", "css"), function (callback) {

    callback();
});
gulp.task("scripts", function () {
    return gulp.src(["./app/js/*.js", "!./app/js/*.min.js"])
        .pipe(plumber())
        .pipe(uglify()) // minify js
        .pipe(gulp.dest("./docs/js/"))
        .pipe(browserSync.reload({
            stream: true
        }));
})
gulp.task("clean:docs", function (callback) {
    del.sync("./docs", callback);
    callback();
});
gulp.task("html", function () {
    return gulp.src("./app/**/*.html")
        .pipe(plumber())
        .pipe(nunjucks.compile(nunjucks_config, {
            env: nunjucksEnv
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task("assets", function () {
    var fonts = gulp.src("./app/fonts/**/*")
        .pipe(gulp.dest("./docs/fonts/"));
    var img = gulp.src("./app/img/**/*")
        .pipe(gulp.dest("./docs/img/"));
    var jsmap = gulp.src("./app/js/**/*.js.map")
        .pipe(gulp.dest("./docs/js/"));
    var cssmap = gulp.src("./app/css/**/*.css.map")
        .pipe(gulp.dest("./docs/js/"));
    var jsmin = gulp.src("./app/js/**/*.min.js")
        .pipe(gulp.dest("./docs/js/"));
    var cssmin = gulp.src("./app/css/**/*.min.css")
        .pipe(gulp.dest("./docs/css/"));
    var favicons = gulp.src("./app/favicons/**/*")
        .pipe(gulp.dest("./docs/favicons/"));


    return merge(fonts, img, jsmap, cssmap, jsmin, jsmap, favicons);
});
gulp.task('libraries', function() {

    // Bootstrap
    var scripts = gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
        "./node_modules/jquery/dist/jquery.min.js",
        "./node_modules/jquery/dist/jquery.min.map",
        "./node_modules/popper.js/dist/umd/popper.min.js",
        "./node_modules/popper.js/dist/umd/popper.min.js.map"
        
      ])
      .pipe(gulp.dest('./docs/js/'));
      var styles = gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/dist/css/bootstrap.min.css.map'
        
      ])
      .pipe(gulp.dest('./docs/css/'));
  
   
      return merge(scripts, styles);
  });
gulp.task("build", gulp.series("clean:docs",
    gulp.parallel("styles", "html", "assets", "scripts", "libraries")
), function (callback) {
    callback();
});
gulp.task("default", gulp.series("build"));
gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "./docs/"
        },
    });
});

gulp.task("watch", gulp.parallel("build", "browserSync", function () {

    gulp.watch("app/css/*.+(scss|sass)", gulp.parallel("sass"));
    gulp.watch("app/css/*.css", gulp.parallel("css"));
    gulp.watch(["app/js/*.js", "!app/js/*.min.js"], gulp.parallel("scripts"));
    gulp.watch("app/**/*.html", gulp.parallel("html"));
    gulp.watch(["app/fonts/**/*", "app/js/**/*.js", "app/css/**/*.css", "app/js/**/*.map", "app/css/**/*.map", "app/img/**/*"], gulp.parallel("assets"));

}));
