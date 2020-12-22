/*
 * @Author: your name
 * @Date: 2020-01-04 21:50:26
 * @LastEditTime: 2020-12-22 16:03:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /talkBox/gulpfile.js
 */
var gulp = require('gulp');
var uglify=require('gulp-uglify');//js压缩
var less=require('gulp-less');//编译less
var connect=require('gulp-connect');//引入gulp-connect模块 
var proxy = require("http-proxy-middleware");
 
gulp.task('connect',function(){
    connect.server({
        root:'.',//根目录
        // ip:'192.168.1.14',//默认localhost:8080
        host: '172.16.5.4',
        livereload: true,//自动更新
        port: 5210,//端口
        middleware: function (connect, opt) {
          return [
            proxy("/front/", {
              target: "http://49.232.203.212:81",
              // target: "http://47.110.155.20:81",
              // target: "http://127.0.0.1:81",
              changeOrigin: true,
              pathRewrite: {
                // "server/": ""
              }
            })
          ];
        }
    })
})
 
 //gulp.series|4.0 依赖
 //gulp.parallel|4.0 多个依赖嵌套
gulp.task('default',gulp.series(gulp.parallel('connect')));