(function () {
    'use strict'
    angular.module('app')
        .filter('dateFromJson', function () {
            return function (jsonDate) {
                var timestamp = parseInt(jsonDate.replace(/[^0-9]/g, ''));
                var date = new Date(timestamp);
                return date.toLocaleDateString(); // Formato legible de fecha
            };
        });
})();