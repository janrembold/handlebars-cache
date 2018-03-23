const gulp = require('gulp');
const hb = require('gulp-hb');
const pump = require('pump');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');

// Initially load all partials
const hbStream = hb().partials('src/*.hbs');


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

        console.log(`Add partial ${vinyl.path}`);
        hbStream.partials(vinyl.path);
        runSequence('hb');

    });
});

gulp.task('default', ['hb', 'hb:watch']);