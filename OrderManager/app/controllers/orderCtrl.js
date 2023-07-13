(function () {
    'use strict'
    angular.module('app')
        .controller('orderCtrl', ['$scope', 'orderService', function ($scope, orderService ) {
            $scope.title = "Ordenes";
            $scope.data = [];
            $scope.customers = [];
            $scope.selectedCustomer = [];

            getData();
            function getData() {
                orderService.getOrders().then(function (result) {
                    $scope.data = result;
                });
            }

            getCustomers();
            function getCustomers() {
                orderService.getCustomer().then(function (result) {
                    $scope.customers = result;
                    console.log(result);
                });
            };
        }])
})();