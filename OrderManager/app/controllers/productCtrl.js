(function () {
        'use strict'
    angular.module('app')
        .controller('productCtrl', ['$scope', '$location', 'productService', function ($scope, $location, productService ) {
            $scope.title = "Listado de productos";
            $scope.disabledForm = false;
            $scope.data = [];
            $scope.typeSubmit = "";
            $scope.rows = [{ name: 'images[]', name: 'remove' }];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.isForEdit = false;
            $scope.modalTitle = '';
            $scope.formBuilder = {
                ProductId:0,
                ProductName: '', ProductDescription: '', Stock: 0, Price: 0, Images: [],  }

            getData();
            function getData() {
                productService.getProducts().then(function (result) {
                    $scope.data = result;
                });
            };

            $scope.submitProduct = function (producto) {
                switch ($scope.typeSubmit) {
                    case "Edit":
                        $scope.updateProduct(producto);
                        break;
                    case "Create":
                        $scope.createProduct(producto);
                        break;
                    default:
                        $scope.typeSubmit = "";
                }
                console.log(producto);
            }

            $scope.openForEdit = function (producto) {
                $scope.typeSubmit = 'Edit';
                $scope.disabledForm = false;
                $scope.modalTitle = "Editar producto";
                $scope.formBuilder = {
                    Id: producto.ProductId,
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
                $scope.rows = [{ name: 'images[]', name: 'remove' }];
                $scope.typeSubmit = 'Create';
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
                $scope.typeSubmit = '';
                $scope.disabledForm = true;
                $scope.modalTitle = "Detalle de producto";
                $scope.formBuilder = {
                    Id: producto.ProductId,
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

            $scope.createProduct = function (product) {
                productService.addProduct(product, product.Images).then(function () {
                    toastr.success('Product created successfully');
                    getData();
                    $('#exampleModal').modal('hide');
                }, function () {
                    toastr.error('Error in creating product');
                });
            };

            $scope.updateProduct = function (product) {
                productService.editProduct(product, product.Images).then(function () {
                    toastr.success('product updated successfully');
                    getData();

                    
                    $('#exampleModal').modal('hide');
                }, function () {
                    toastr.error('Error in updating product');
                });
            };
            $scope.deleteProduct = function (id) {
                productService.deleteProduct(id).then(function () {
                    toastr.success('Product deleted successfully');
                    getData();
                }, function () {
                    toastr.error('Error in deleting product with Id: ' + id);
                });
            };
        }]);

 })();