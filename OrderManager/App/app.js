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
           
            .otherwise({ redirectTo: '/' });
    }]);
      

})();
 