(function () {
    'use strict'
    angular.module('app')
        .controller('orderDetailCtrl', ['$scope', '$routeParams', 'orderService', function ($scope, $routeParams, orderService) {
            $scope.title = "Detalle de la orden #" + $routeParams.id;
            $scope.data = [];

            getData();

            function getData() {
                orderService.getOrderById($routeParams.id).then(function (result) {
                    $scope.data = result;
                    console.log(result);
                }, function () {
                    toastr.error('Error in fetching user with Id: ' + $routeParams.id);
                });

            }
            
            
        }])
})();