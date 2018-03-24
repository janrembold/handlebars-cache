const gulp = require('gulp');
const hb = require('gulp-hb');
const watch = require('gulp-watch');
const handlebars = require('handlebars');
const globule = require('globule');
const fs = require('fs');
const path = require('path');



// Initially load and register all partials
const paths = globule.find([
    'src/*.hbs',
    '!src/index.hbs'
]);

for(let filePath of paths) {
    const parsedPath = path.parse(filePath);
    handlebars.registerPartial(parsedPath.name, fs.readFileSync(filePath, 'utf8'));
}



gulp.task('hb', () => {
    console.log('### Initial compilation of index.hbs ###');
    console.log(handlebars.compile(fs.readFileSync('src/index.hbs', 'utf8'))());
});

gulp.task('hb:watch', () => {
    watch('src/*.hbs', {}, (vinyl) => {

        const parsedPath = path.parse(vinyl.path);

        // Update partial on-the-fly
        handlebars.registerPartial(parsedPath.name, fs.readFileSync(vinyl.path, 'utf8'));

        console.log(`### Updated ${parsedPath.name} from ${vinyl.path} ###`);
        console.log(handlebars.compile(fs.readFileSync('src/index.hbs', 'utf8'))());

    });
});

gulp.task('default', ['hb', 'hb:watch']);