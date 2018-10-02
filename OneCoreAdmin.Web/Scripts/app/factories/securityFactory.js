(function () {
    'use strict';

    angular
        .module('onecoreadminApp')
        .factory('securityFactory', securityFactory);

    securityFactory.$inject = ['$http', '$q', '$rootScope', '$sessionStorage', '$window', '$log'];

    function securityFactory($http, $q, $rootScope, $sessionStorage, $window, $log) {
        return {
            autenticar: function (usuario, contrasena) {
                var securityFactory = {};
                var temp = {};
                var defer = $q.defer();
                var apiUrlAutenticar = $rootScope.URLApis + 'Security/Autenticar';

                var requestLogin = {
                    usuario: usuario,
                    contrasena: contrasena
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlAutenticar, requestLogin, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            },
            obtenerUsuarios: function () {
                var securityFactory = {};
                var temp = {};
                var defer = $q.defer();
                var apiUrlObtenerUsuarios = $rootScope.URLApis + 'Security/ObtenerUsuarios';

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.get(apiUrlObtenerUsuarios, null, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            },
            registrar: function (usuario) {
                var securityFactory = {};
                var temp = {};
                var defer = $q.defer();
                var apiUrlRegistrar = $rootScope.URLApis + 'Security/Registrar';

                var requestRegistrar = {
                    idUsuario: usuario.idUsuario,
                    usuario: usuario.usuario,
                    contrasena: usuario.contrasena,
                    estatus: usuario.estatus,
                    sexo: usuario.sexo,
                    correo: usuario.correo
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlRegistrar, requestRegistrar, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            },
            actualizar: function (usuario) {
                var securityFactory = {};
                var temp = {};
                var defer = $q.defer();
                var apiUrlActualizar = $rootScope.URLApis + 'Security/Actualizar';

                var requestActualizar = {
                    idUsuario: usuario.idUsuario,
                    usuario: usuario.usuario,
                    contrasena: usuario.contrasena,
                    estatus: usuario.estatus,
                    sexo: usuario.sexo,
                    correo: usuario.correo
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlActualizar, requestActualizar, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            },
            eliminar: function (idUsuario) {
                var securityFactory = {};
                var temp = {};
                var defer = $q.defer();
                var apiUrlEliminar = $rootScope.URLApis + 'Security/Eliminar';

                var requestEliminar = {
                    idUsuario: idUsuario,
                    usuario: '',
                    contrasena: '',
                    estatus: false,
                    sexo: false,
                    correo: ''
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlEliminar, requestEliminar, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            },
            existe: function (usuario) {
                var securityFactory = {};
                var temp = {};
                var defer = $q.defer();
                var apiUrlExiste = $rootScope.URLApis + 'Security/Existe';

                var requestExiste = {
                    idUsuario: 0,
                    usuario: usuario,
                    contrasena: '',
                    estatus: false,
                    sexo: false,
                    correo: ''
                };

                var config = { headers: { 'Content-Type': 'application/json' } };

                $http.post(apiUrlExiste, requestExiste, config).then(function (response) {
                    defer.resolve(response);
                }).catch(function (error) {
                    defer.reject(error);
                });

                return defer.promise;
            }
        };
    }
})();