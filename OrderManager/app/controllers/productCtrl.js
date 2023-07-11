(function () {
        'use strict'
        angular.module('app')
            .controller('productCtrl', ['$scope', 'productService', function ($scope, productService) {
                console.log("Hola mundo");
                $scope.title = "Listado de productos";
                $scope.data = [];

                getData();
                function getData() {
                    productService.getProducts().then(function (result) {
                        $scope.data = result;
                    });
                }
            }])
 })();