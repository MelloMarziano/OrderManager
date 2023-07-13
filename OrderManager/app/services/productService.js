(function () {
    angular.module('app')
        .factory('productService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getProducts = function () {
                var deferred = $q.defer();
                $http.get('/Product/GetProduct').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addProduct = function (product, images) {
                var deferred = $q.defer();
                $http.post('/Product/SaveProduct', product, images).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteProduct = function (id) {
                var deferred = $q.defer();
                $http.post('/Product/Delete', { id: id }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editProduct = function (producto, images) {
                var deferred = $q.defer();
                $http.post('/Product/Edit', producto, images).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            return service;
        }]);
})();