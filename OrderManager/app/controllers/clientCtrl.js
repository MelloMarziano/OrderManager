(function () {
    'use strict'
    angular.module('app')
        .controller('clientCtrl', ['$scope', '$location', 'clientService', function ($scope, $location, clientService) {
            $scope.title = "Listado de Clientes";
            $scope.disabledForm = false;
            $scope.data = [];
            $scope.typeSubmit = "";
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.isForEdit = false;
            $scope.modalTitle = '';
            $scope.formBuilder = {
                Id: 0,
                Name: '', Email: '', Phone: '', 
            }

            getData();
            function getData() {
                clientService.getClients().then(function (result) {
                    $scope.data = result;
                });
            };

            $scope.submitClient = function (client) {
                switch ($scope.typeSubmit) {
                    case "Edit":
                        $scope.updateClient(client);
                        break;
                    case "Create":
                        $scope.createClient(client);
                        break;
                    default:
                        $scope.typeSubmit = "";
                }
                console.log(client);
            }

            $scope.openForEdit = function (client) {
                $scope.typeSubmit = 'Edit';
                $scope.disabledForm = false;
                $scope.modalTitle = "Editar Cliente";
                $scope.formBuilder = {
                    Id: client.Id,
                    Name: client.Name,
                    Email: client.Email,
                    Phone: client.Phone,
                };
                $('#myModal').on('shown.bs.modal', function () {
                    $('#myInput').trigger('focus')
                })
            }

            $scope.openModal = function () {
                $scope.typeSubmit = 'Create';
                $scope.disabledForm = false;
                $scope.modalTitle = "Nuevo Cliene";
                $scope.formBuilder = {
                    Id: 0,
                    Name: '', Email: '', Phone: '',
                }
                $('#myModal').on('shown.bs.modal', function () {
                    $('#myInput').trigger('focus')
                })
            }

            $scope.openForDetail = function (client) {
                $scope.typeSubmit = '';
                $scope.disabledForm = true;
                $scope.modalTitle = "Detalle de Cliente";
                $scope.formBuilder = {
                    Id: client.Id,
                    Name: client.Name,
                    Email: client.Email,
                    Phone: client.Phone,
                };
                $('#myModal').on('shown.bs.modal', function () {
                    $('#myInput').trigger('focus')
                })
            }

            $scope.createClient = function (client) {
                clientService.addClient(client).then(function () {
                    toastr.success('Client created successfully');
                    getData();
                    $('#exampleModal').modal('hide');
                }, function () {
                    toastr.error('Error in creating Client');
                });
            };

            $scope.updateClient = function (client) {
                clientService.editClient(client).then(function () {
                    toastr.success('Client updated successfully');
                    getData();


                    $('#exampleModal').modal('hide');
                }, function () {
                    toastr.error('Error in updating client');
                });
            };
            $scope.deleteClient = function (id) {
                clientService.deleteClient(id).then(function () {
                    toastr.success('Client deleted successfully');
                    getData();
                }, function () {
                    toastr.error('Error in deleting client with Id: ' + id);
                });
            };

            

          
            

           




           
           

            

          
        }]);

})();