(function() {
    'use strict';

    angular
        .module('pando-3d.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    /**
     * @name config
     * @desc Define valid application routes
     */
    function config($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/main.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        }).when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/register.html'
        }).when('/notfound', {
            templateUrl: '/static/templates/404.html'
        })
        .otherwise({ redirectTo: '/notfound' });
    }
})();
