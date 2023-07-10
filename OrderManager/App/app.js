(function () {
    "use strict";

    angular.module('app', ['ngRoute',])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $routeProvider
            .when('/', {
            controller: 'homeCtrl',
            templateUrl: '/app/template/home-view.html',
        })
           
            .otherwise({ redirectTo: '/' });
    }]);
      

})();
 