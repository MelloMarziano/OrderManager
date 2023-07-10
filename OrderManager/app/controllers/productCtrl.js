var app = angular.module('app', '');


app.controller("productCtrl", [
    '$scope',
    function ($scope) {
        $scope.titulo = "Productos";
    },
])