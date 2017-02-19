const gulp = require('gulp');
const typescript = require('gulp-typescript');
const typescriptProject = typescript.createProject('tsconfig.json');
const nodemon = require('gulp-nodemon');

gulp.task('typescript', function() {
    var typescriptResult = gulp.src('src/**/*.ts')
        .pipe(typescriptProject())
    return typescriptResult.js.pipe(gulp.dest('release'));
});

gulp.task('watch', ['typescript'], function() {
    return nodemon({
        script: 'release/',
        watch: 'src',
        ext: 'ts',
        tasks: ['typescript']
    })
});