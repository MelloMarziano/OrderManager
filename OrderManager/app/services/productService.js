(function () {
    angular.module('app')
        .factory('productService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getProducts = function () {
                var deferred = $q.defer();
                $http.get('/Product/GetProduct').then(function (result) {
                    console.log(result);
                    deferred.resolve(result.data);
                }, function () {
                    console.log('Error');
                    deferred.reject();
                });
                return deferred.promise;
            };
            return service;
        }]);
})();