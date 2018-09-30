(function () {
    'use strict';

    angular
        .module('onecoreadminApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', 'securityFactory', '$log', '$window', '$sessionStorage', '$q'];

    function indexController($scope, securityFactory, $log, $window, $sessionStorage, $q) {
        loadPage();

        function loadPage() {
            $scope.userInfo = $sessionStorage.authorizationData;
        }
    }
})();