(function () {
    'use strict';

    angular
        .module('onecoreadminApp')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', 'securityFactory', '$log', '$window', '$sessionStorage', '$q', 'blockUI'];

    function loginController($scope, securityFactory, $log, $window, $sessionStorage, $q, blockUI) {
        var full = $q.defer();
        loadDataPage();

        function loadDataPage() {
            $scope.LoginModel = {
                'usuario': '',
                'contrasena': ''
            }

            $sessionStorage.authorizationData = null;
            sessionStorage.removeItem('authorizationData');
        }
        $scope.login = function () {

            blockUI.start('Procesando Solicitud...');

            var usuario = jQuery('#usuario').val();
            var contrasena = jQuery('#contrasena').val();

            if (usuario == '') {
                blockUI.stop();
                swal('Proporcione un usuario', '', 'warning');
                return false;
            }

            if (contrasena == '') {
                swal('Proporcione una contraseña', 'Verifique', 'warning');
                full.resolve();
                return false;
            }

            if (usuario.length < 7 || usuario.length > 50) {
                blockUI.stop();
                swal('La longuitud del campo usuario debe ser de 7 a 50 elementos', '', 'warning');
                return false;
            }

            if (contrasena.length < 10 || contrasena.length > 50) {
                blockUI.stop();
                swal('La longuitud del campo contraseña debe ser de 10 a 50 elementos', '', 'warning');
                return false;
            }

            if ($scope.loginForm.$invalid) {
                swal('Información Inválida', 'Verifique', 'warning');
                full.resolve();
                return false;
            }

            $scope.process = true;
            $scope.isDisabled = true;

            securityFactory.autenticar($scope.LoginModel.usuario, $scope.LoginModel.contrasena)
                .then(function (data) {
                    $log.info(data.data);

                    $scope.data = data;

                    if ($scope.data.data.mensaje == 'success') {
                        $sessionStorage.authorizationData = $scope.data.data;
                        $scope.completed = true;
                        $window.location.href = '/home';
                    }
                    else {
                        $sessionStorage.authorizationData = null;
                        $scope.completed = false;
                        swal('Usuario / Contraseña no válidos', 'Verifique', 'warning');
                    }

                    
                })
                .catch(function (error) {

                    $log.error(error);

                    swal('Ocurrio un error al intentar autenticar', 'Verifique', 'error');

                    full.resolve();
                });
        }
        $scope.recuperarContrasena = function () {
            alert('Su contraseña fue enviada al correo proporcionado');
            $window.location.href = '/login';
        }
        $('[name=usuario]').keypress(function (e) {
            var v = this.value;
            if (v.length < 50) {
                var code = e.charCode || e.keyCode;
                if (String.fromCharCode(code).match(/^[0-9A-Za-z _]*[0-9A-Za-z][0-9A-Za-z _]*$/))
                    return;
                else
                    if (code === 32)
                        return;
            }
            return false;
        });
    }
})();