(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',

        'BlurAdmin.pages.home',
        'BlurAdmin.pages.myCalendar',
        'BlurAdmin.pages.profile',
        'BlurAdmin.pages.myHome',
        'BlurAdmin.pages.portrayal',
        'BlurAdmin.pages.busiopp',
        'BlurAdmin.pages.mgrcenter',
        'BlurAdmin.pages.interactmarket',
        'BlurAdmin.pages.cusService',
        'BlurAdmin.pages.customer',
        'BlurAdmin.pages.product',
        'BlurAdmin.pages.similar',
        'BlurAdmin.pages.personalInfo',
        'BlurAdmin.pages.taskService',
        'BlurAdmin.pages.scheduler',
        'BlurAdmin.pages.custGroup',
        'BlurAdmin.pages.market',
        'BlurAdmin.pages.knowledge'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/home');

        /* console.log("-------------routeConfig-----------");
           $.ajax({
               url:'/crm/manage/getAllMenus',
               type:'GET',
               async:false,
               dataType:'json',
               success:function(data,textStatus,jqXHR){
                   console.log(data)
                   console.log(textStatus)
                   console.log(jqXHR)
               }
           });

           $stateProvider
               .state('xxxx', {
                   url: '/xxxx',
                   template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                   abstract: true,
                   title: 'xxxx',
                   sidebarMeta: {
                       icon: 'ion-compose',
                       order: 0,
                   },
               });*/
        /*baSidebarServiceProvider.addStaticItem({
          title: 'Pages',
          icon: 'ion-document',
          subMenu: [{
            title: 'Sign In',
            fixedHref: 'auth.html',
            blank: true
          }, {
            title: 'Sign Up',
            fixedHref: 'reg.html',
            blank: true
          }, {
            title: 'User Profile',
            stateRef: 'profile'
          }, {
            title: '404 Page',
            fixedHref: '404.html',
            blank: true
          }]
        });
        baSidebarServiceProvider.addStaticItem({
          title: 'Menu Level 1',
          icon: 'ion-ios-more',
          subMenu: [{
            title: 'Menu Level 1.1',
            disabled: true
          }, {
            title: 'Menu Level 1.2',
            subMenu: [{
              title: 'Menu Level 1.2.1',
              disabled: true
            }]
          }]
        });*/
    }

})();
