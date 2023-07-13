(function () {
    'use strict'
    angular.module('app')
        .controller('orderCtrl', ['$scope', 'orderService', function ($scope, orderService ) {
            $scope.title = "Ordenes";
            $scope.data = [];
            $scope.customers = [];
            $scope.products = [];
            $scope.formBuilder = { selectedCustomer: {}, OrderTracking: {}, selectedProducts: {}, Quantity: 0 };
            $scope.forTable = [];
            $scope.disabledCustomer = false;
            $scope.forSubmit = [];

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
            getProducts()
            function getProducts() {
                orderService.getProducts().then(function (result) {
                    $scope.products = result;
                });
            }
            $scope.closeModal = function () {
                $scope.formBuilder = {
                    selectedCustomer: {}, OrderTracking: {}, selectedProducts: {}, Quantity: 0 };
                $scope.forTable = [];
                $('#exampleModal').modal('hide');
            }

            $scope.addNewProduct = function () {
                $scope.disabledCustomer = true;
                var selectedValue = $scope.formBuilder.selectedProducts; 
                var selectedOption = $scope.products.find(function (option) {
                    return option.ProductId === selectedValue;
                });
                $scope.forTable.push({
                    ProductId: selectedValue,
                    Name: selectedOption.ProductName,
                    Quantity: $scope.formBuilder.Quantity,
                    Price: selectedOption.Price,
                })
                $scope.formBuilder = { selectedCustomer: $scope.formBuilder.selectedCustomer, OrderTracking: $scope.formBuilder.OrderTracking, selectedProducts: {}, Quantity: 0 };
            }

            $scope.submitOrder = function (formBuilder) {
                const CustomerId = $scope.formBuilder.selectedCustomer;
                const OrderTracking = $scope.formBuilder.OrderTracking;
                const Items = $scope.forTable;

                orderService.addOrder(CustomerId, OrderTracking, Items).then(function () {
                    toastr.success('Order created successfully');
                    getData();
                    $('#exampleModal').modal('hide');
                }, function () {
                    toastr.error('Error in creating Order');
                });
            }

            $scope.createOrder = function (product) {
                
            };
        }])
})();