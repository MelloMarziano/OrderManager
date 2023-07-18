(function () {
    angular.module('app')
        .factory('homeService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getProducts = function () {
                var deferred = $q.defer();
                $http.get('/Home/GetProductsStock').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            return service;
        }]);
})();