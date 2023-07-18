(function () {
    angular.module('app')
        .factory('orderService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getOrders = function () {
                var deferred = $q.defer();
                $http.get('/Order/GetOrders').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.getOrderById = function (id) {
                var deferred = $q.defer();
                $http.get('/Order/GetOrderById/' + id).then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
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

            service.getProducts = function () {
                var deferred = $q.defer();
                $http.get('/Product/GetProduct').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addOrder = function (CustomerId, OrderTracking, Items) {
                var deferred = $q.defer();
                $http.post('/Order/saveOrder', { customerId: CustomerId, OrderTracking: OrderTracking, Items: Items }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.orderTrackingUpdate = function (id, OrderTracking) {
                var deferred = $q.defer();
                $http.post('/Order/updateOrderTracking', { orderId: id, newTracking:OrderTracking }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();