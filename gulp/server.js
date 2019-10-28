'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});
//  server.middleware = proxyMiddleware('/mobile', {target: 'http://api04.aliyun.venuscn.com', changeOrigin: true});
  var ip = "http://10.16.8.142:8088/";
  var localip = "http://localhost:8088/";
  var uatip = " http://10.16.8.180:8088/";
  server.middleware = [
    // proxyMiddleware('/crm/ecif', {target: 'http://10.32.20.127:8080', changeOrigin: true}),
    // proxyMiddleware('/crm/scheduler', {target: 'http://10.16.8.142:8000', changeOrigin: true}),
    // proxyMiddleware('/crm/query', {target: 'http://10.32.17.71:8085', changeOrigin: true}),
    // proxyMiddleware('/crm/manage', {target: 'http://10.16.8.142:8082', changeOrigin: true}),
    // proxyMiddleware('/crm/ocrm', {target: 'http://10.16.8.142:8083', changeOrigin: true}),
    // proxyMiddleware('/crm/supply', {target: 'http://10.16.8.142:8086', changeOrigin: true}),
    proxyMiddleware('/crm/ecif', {target: 'http://127.0.0.1:8080', changeOrigin: true}),
    proxyMiddleware('/crm/scheduler', {target: 'http://127.0.0.1:8000', changeOrigin: true}),
    proxyMiddleware('/crm/query', {target: 'http://127.0.0.1:8085', changeOrigin: true}),
    proxyMiddleware('/crm/manage', {target: 'http://127.0.0.1:8082', changeOrigin: true}),
    proxyMiddleware('/crm/ocrm', {target: 'http://127.0.0.1:8083', changeOrigin: true}),
    proxyMiddleware('/crm/supply', {target: 'http://127.0.0.1:8086', changeOrigin: true}),
  ];
  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    ghostMode: false,
    // 自动打开浏览器
    open: 'http://localhost:3000/',// Stop the browser from automatically opening
  });

}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
