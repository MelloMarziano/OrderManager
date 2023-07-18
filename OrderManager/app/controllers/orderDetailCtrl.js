(function () {
    'use strict'
    angular.module('app')
        .controller('orderDetailCtrl', ['$scope', '$routeParams', 'orderService', function ($scope, $routeParams, orderService) {
            $scope.title = "Detalle de la orden #" + $routeParams.id;
            $scope.data = [];
            $scope.orderTrackingValue = 0;
            $scope.formBuilder = { OrderTracking: ''};

            getData();

            function getData() {
                orderService.getOrderById($routeParams.id).then(function (result) {
                    $scope.data = result;
                    switch (result.OrderTracking) {
                        case 'Ordenado':
                            $scope.orderTrackingValue = 25;
                            break;
                        case 'Empacado':
                            $scope.orderTrackingValue = 50;
                            break;
                        case 'Enviado':
                            $scope.orderTrackingValue = 75;
                            break;
                        case 'Entregado':
                            $scope.orderTrackingValue = 100;
                            break;
                        default:
                            console.log('No esta en la lista...');
                            break;
                        
                    }
                }, function () {
                    toastr.error('Error in fetching user with Id: ' + $routeParams.id);
                });

            }

            $scope.submitOrder = function (tracking) {
                orderService.orderTrackingUpdate($routeParams.id, tracking.OrderTracking).then(function () {
                    toastr.success('Order updated successfully');
                    getData();
                    $('#exampleModal').modal('hide');
                }, function () {
                    toastr.error('Error in updating order');
                });
            }

            
            
        }])
})();