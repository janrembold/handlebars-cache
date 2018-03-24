const gulp = require('gulp');
const hb = require('gulp-hb');
const watch = require('gulp-watch');
const handlebars = require('handlebars');
const handlebarsWax = require('handlebars-wax');
const fs = require('fs');


// Initially load and register all partials
const wax = handlebarsWax(handlebars)
    .partials([
        'src/*.hbs',
        '!src/index.hbs'
    ]);

gulp.task('hb', () => {
    console.log('### Initial compilation of index.hbs ###');
    console.log(wax.compile(fs.readFileSync('src/index.hbs', 'utf8'))());
});

gulp.task('hb:watch', () => {
    watch('src/*.hbs', {}, (vinyl) => {

        // Update partial on-the-fly
        wax.partials(vinyl.path);

        console.log(`### Updated ${vinyl.path} ###`);
        console.log(wax.compile(fs.readFileSync('src/index.hbs', 'utf8'))());

    });
});

gulp.task('default', ['hb', 'hb:watch']);