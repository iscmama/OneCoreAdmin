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
            }
        };
    }
})();