﻿(function () {
    angular.module('app')
        .factory('orderService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getOrders = function () {
                var deferred = $q.defer();
                $http.get('/Order/GetOrders').then(function (result) {
                    console.log(result);
                    deferred.resolve(result.data);
                }, function () {
                    console.log('Error');
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.getOrderById = function (id) {
                var deferred = $q.defer();
                $http.get('/Order/GetOrderById/' + id).then(function (result) {
                    console.log(result);
                    deferred.resolve(result.data);
                }, function () {
                    console.log('Error');
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.getCustomer = function () {
                var deferred = $q.defer();
                $http.get('/Customer/GetClients').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            return service;
        }]);
})();