(function () {
    'use strict';

    angular
        .module('onecoreadminApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', 'securityFactory', '$log', '$window', '$sessionStorage', '$q'];

    function indexController($scope, securityFactory, $log, $window, $sessionStorage, $q) {

        if ($sessionStorage.authorizationData == null) {
            $window.location.href = '/login';
        }
        else {
            loadPage();
        }

        function loadPage() {
            $scope.userInfo = $sessionStorage.authorizationData;
            $scope.total = 0;
            $scope.activos = 0;
            $scope.inactivos = 0;
            $scope.percactivos = 0.00;
            $scope.percinactivos = 0.00;
            $scope.perctotal = 0;

            securityFactory.obtenerUsuarios()
                .then(function (data) {
                    $scope.dataUsuarios = data;

                    angular.forEach($scope.dataUsuarios.data.listaUsuarios, function (value, key) {

                        if (value.estatus) {
                            $scope.activos = $scope.activos + 1;
                        }
                        else {
                            $scope.inactivos = $scope.inactivos + 1;
                        }
                    });

                    if ($scope.dataUsuarios.data.listaUsuarios.length > 0) {
                        $scope.total = $scope.activos + $scope.inactivos;
                        $scope.percactivos = (($scope.activos / $scope.total) * 100).toFixed(2);
                        $scope.percinactivos = (($scope.inactivos / $scope.total) * 100).toFixed(2);
                        $scope.perctotal = 100;
                    }
                    else {
                        $scope.total = 0;
                        $scope.percactivos = 0;
                        $scope.percinactivos = 0;
                        $scope.perctotal = 0;
                    }

                    
                })
                .catch(function (error) {
                    $log.error(error);
                });
        }
    }
})();