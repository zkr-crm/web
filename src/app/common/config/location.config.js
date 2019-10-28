(function () {
  'use strict';

  angular.module('BlurAdmin.common.config')
    .service('LocationConfig', LocationConfig);
  
  function LocationConfig($rootScope, $http, $location, GlobalConfig, CookieService, AuthService){
    var services = {};
    services.addEventHandle = function(){
      var isExist = AuthService.checkTokenExist();
      var toPath = $location.path();
      if ( ['/login','/logout',''].indexOf(toPath) >= 0 && isExist) $location.path('/home');

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          var toPath = $location.path();
          var isExist = AuthService.checkTokenExist();
          if( toPath === '/logout' || !isExist){
              CookieService.clearCookie('global');
              $rootScope.global = {};
              $http.defaults.headers.common.Authorization = 'Basic';
              $location.path('/login');
              return;
          }
          var restrictedPage = ['/login', '/register'].indexOf(toPath) === -1;
          var loggedIn = $rootScope.global && $rootScope.global.user ? true: false;
          if (restrictedPage && !loggedIn) {
              return $location.path('/login');
          }
          if (!restrictedPage && loggedIn) {
              return $location.path('/home');
          }
      });
    }
    return services;
  }

})();



    