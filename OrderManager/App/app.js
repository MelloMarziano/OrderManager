(function () {
    "use strict";

    angular.module('app', ['ngRoute', 'ui.bootstrap'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $routeProvider
            .when('/', {
                controller: 'homeCtrl',
                templateUrl: '/app/template/home-view.html',
            })
             .when('/Product', {
                 controller: 'productCtrl',
                 templateUrl: '/app/template/product-view.html',
             })
            .when('/Customer', {
                 controller: 'clientCtrl',
                 templateUrl: '/app/template/client-page.html',
             })
            .when('/Order', {
                 controller: 'orderCtrl',
                 templateUrl: '/app/template/order-view.html',
            })
            .when('/Order-detail/:id', {
                 controller: 'orderDetailCtrl',
                 templateUrl: '/app/template/order-detail.html',
            })
           
            .otherwise({ redirectTo: '/' });
    }]);
      

})();
 