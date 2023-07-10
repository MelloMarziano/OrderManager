(function(){
    'use strict'
    angular.module('app')
        .controller('homeCtrl', ['$scope', 'homeService', function ($scope, homeService) {
            $scope.title = "Sistema de Ordenes Otega v 1.0";
            $scope.data = [];

            getData();
            function getData() {
                homeService.getProducts().then(function (result) {
                    $scope.data = result;
                });
            }
        }])
}) ();