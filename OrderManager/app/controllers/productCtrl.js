(function () {
        'use strict'
    angular.module('app')
        .controller('productCtrl', ['$scope', 'productService', function ($scope,  productService) {
            $scope.title = "Listado de productos";
            $scope.disabledForm = false;
            $scope.data = [];
            $scope.rows = [{ name: 'images[]', name: 'remove' }];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.isForEdit = false;
            $scope.modalTitle = '';
            $scope.formBuilder = {
                ProductName: '', ProductDescription: '', Stock: 0, Price: 0, Images: [],  }

            getData();
            function getData() {
                productService.getProducts().then(function (result) {
                    $scope.data = result;
                });
            };

            $scope.openForEdit = function (producto) {
                $scope.disabledForm = false;
                $scope.modalTitle = "Editar producto";
                $scope.formBuilder = {
                    ProductName: producto.ProductName,
                    ProductDescription: producto.ProductDescription,
                    Stock: producto.Stock,
                    Price: producto.Price,
                    Images: producto.Images,
                };
                $scope.addRowOnCharge();
                $('#myModal').on('shown.bs.modal', function () {
                    $('#myInput').trigger('focus')
                })
            }
            $scope.addRow = function () {
                var id = $scope.rows.length + 1;
                $scope.rows.push({ 'id': 'dynamic' + id });
            };

            $scope.addRowOnCharge = function () {
                $scope.rows.splice(0, $scope.rows.length);
                var id = $scope.rows.length + 1;
                if ($scope.formBuilder.Images.length > 0) {
                    for (var i = 0; i < $scope.formBuilder.Images.length; i++) {
                        $scope.rows.push({ 'id': 'dynamic' + id });
                    }
                }
            };



            $scope.removeRow = function (row) {
                var index = $scope.rows.indexOf(row);
                $scope.rows.splice(index, 1);
            };

            $scope.openModal = function () {
                $scope.disabledForm = false;
                $scope.modalTitle = "Nuevo producto";
                $scope.formBuilder = {
                    ProductName: '',
                    ProductDescription: '',
                    Stock: 0,
                    Price: 0,
                    Images: [],
                }
                $('#myModal').on('shown.bs.modal', function () {
                    $('#myInput').trigger('focus')
                })
            }
            $scope.openForDetail = function (producto) {
                $scope.disabledForm = true;
                $scope.modalTitle = "Detalle de producto";
                $scope.formBuilder = {
                    ProductName: producto.ProductName,
                    ProductDescription: producto.ProductDescription,
                    Stock: producto.Stock,
                    Price: producto.Price,
                    Images: producto.Images,
                };
                $scope.addRowOnCharge();
                $('#myModal').on('shown.bs.modal', function () {
                    $('#myInput').trigger('focus')
                })
            }
        }]);

 })();