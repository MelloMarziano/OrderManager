(function () {
    angular.module('app')
        .factory('clientService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getClients = function () {
                var deferred = $q.defer();
                $http.get('/Customer/GetClients').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addClient = function (client) {
                var deferred = $q.defer();
                $http.post('/Customer/SaveClient', client).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.deleteClient = function (id) {
                var deferred = $q.defer();
                $http.post('/Customer/Delete', { id: id }).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editClient = function (client) {
                var deferred = $q.defer();
                $http.post('/Customer/Edit', client).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();