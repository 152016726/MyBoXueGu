var gulp=require('gulp');
var htmlmin=require('gulp-htmlmin');
var uglify=require('gulp-uglify');
var rename=require('gulp-rename');
var cleancss=require('gulp-clean-css');
var less=require('gulp-less');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat=require('gulp-concat');

gulp.task('htmlmin',function () {
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true,//压缩页面JS
            minifyCSS: true,//压缩页面CSS
            removeComments: true//清除HTML注释
        }))
        .pipe(rename({
            dirname:'html',
            suffix:'.min'
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('uglify',function () {
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            dirname:'js',
            suffix:'.min'
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('cleancss',function () {
    gulp.src('./src/**/*.css')
        .pipe(cleancss())
        .pipe(rename({
            dirname:'css',
            suffix:'.min'
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('less',function () {
    gulp.src('./src/less/index.less')
        .pipe(less())
        .pipe(rename({
            dirname:'css'
        }))
        .pipe(gulp.dest('./dist'));
});



// 配置打包的第三方路径
 var jsLibs = [
     'node_modules/art-template/lib/temlate-web.js',
     'node_modules/jquery/dist/jquery.js',
     'node_modules/bootstrap/dist/js/bootstrap.js',
     'node_modules/jquery-form/dist/jquery.form.min.js'
 ];
 //合并所有的第三方包为一个js
gulp.task('jsLib',function () {
    gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'));
});

// 打包commonjs模块
//1.其中src/js/common目录下的文件不要打包,因为将来那个页面脚本需要他，require他即可，
//只要



var jsModules=[
    //首页
    'src/js/index.js',
    //用户
    'src/js/user/login.js',
    'src/js/user/repass.js',
    'src/js/user/profile.js',
    //讲师
    'src/js/teacher/add.js',
    'src/js/teacher/edit.js',
    'src/js/teacher/list.js',
    //课程
    'src/js/course/add.js',
    'src/js/course/edit1.js',
    'src/js/course/edit2.js',
    'src/js/course/edit3.js',
    'src/js/course/list.js',
    //学科分类
    'src/js/category/add.js',
    'src/js/category/edit.js',
    'src/js/category/list.js'
]

gulp.task('js',function () {
    jsModules.forEach(function (jsPath) {
        var pathArr=jsPath.split("/");
        var jsName=pathArr.pop();
        pathArr.shift();
        //browserify不支持通配符*
        browserify(jsPath).bundle()//打包index.js
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(gulp.dest('dist/'+pathArr.join("/")));
    })
});
//添加统一打包的任务
gulp.task('build',function () {
    gulp.run(['htmlmin','cleancss','less','jsLib','uglify','js'])
});

gulp.task('default',function () {
    gulp.run('build');
    gulp.watch('./src/*.html',function () {
        gulp.run('htmlmin');
    });
    gulp.watch('./src/**/*.js',function () {
        gulp.run('uglify');
    });
    gulp.watch('./src/**/*.css',function () {
        gulp.run('cleancss');
    });
    gulp.watch('./src/less/index.less',function () {
        gulp.run('less');
    });
    gulp.watch('./src/**/*.js',function () {
        gulp.run('js');
    });
});
