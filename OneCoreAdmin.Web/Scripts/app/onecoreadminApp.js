(function () {
    'use strict';

    angular
        .module('onecoreadminApp')
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

    function config($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider

            .when('/login', {
                controller: 'loginController',
                templateUrl: 'Views/Login/Index.cshtml'
            })

            .when('/index', {
                controller: 'indexController',
                templateUrl: 'Views/Home/Index.cshtml'
            })

            .when('/usuarios', {
                controller: 'indexController',
                templateUrl: 'Views/Usuarios/Index.cshtml'
            })
             
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    run.$inject = ['$rootScope', '$location', '$http'];

    function run($rootScope, $location, $http) {
        $rootScope.AppTitle = "OneCore Admin 1.0.0.0";
        $rootScope.CurrentUser = {
            userName: 'Administrador',
            user_cve: 'admin',
            password: 'admin'
        };

        $rootScope.version = '1.0.0.0'

        // Local
        $rootScope.URLApis = 'http://localhost:59770/api/';
        $rootScope.ClientId = 'onecoreadminApp';
    }
})();