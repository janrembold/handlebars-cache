const gulp = require('gulp');
const hb = require('gulp-hb');
const handlebars = require('handlebars');
const pump = require('pump');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');
const path = require('path');
const fs = require('fs');

// Initially load all partials
const hbStream = hb({
    bustCache: true,
    handlebars: handlebars
}).partials('src/*.hbs');


gulp.task('hb', (cb) => {

    // Render root templates only
    pump([
        gulp.src('src/index.hbs'),
        hbStream,
        rename({extname: ".html"}),
        gulp.dest('dist')
    ], cb);

});

gulp.task('hb:watch', () => {
    watch('src/*.hbs', {}, (vinyl) => {

        console.log(`Change partial ${vinyl.path}`);
        const parsedPath = path.parse(vinyl.path);
        handlebars.registerPartial(parsedPath.name, fs.readFileSync(vinyl.path, 'utf8'));
        runSequence('hb');

    });
});

gulp.task('default', ['hb', 'hb:watch']);