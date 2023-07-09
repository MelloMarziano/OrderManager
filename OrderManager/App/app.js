(function () {
    "use strict";
    angular.module("app", ["ngRoute"]).config([
        "$routeProvider",
        function ($routeProvider) {
            $routeProvider
                .when("/", {
                    controller: "homeCtrl",
                    templateUrl: "/app/template/home-view.html",
                })
                .otherwise({ redirecTo: "/" });
        },
    ]);
})();
