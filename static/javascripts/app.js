(function () {
    'use strict';

    var config = function config($routeProvider, $locationProvider, $httpProvider, routeResolversProvider) {
        var CONTROLLER_VIEW_MODEL_NAME = 'vm';

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: '/static/templates/main.html'
            }).when('/projects', {
                controller: 'ProjectsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                templateUrl: '/static/templates/product/projects.html'
            }).when('/create', {
                controller: 'CreateProjectController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                templateUrl: '/static/templates/product/create-project.html'
            }).when('/view/project', {
                controller: 'SingleProjectController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                templateUrl: '/static/templates/product/single-project.html'
            }).when('/login', {
                controller: 'LoginController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                templateUrl: '/static/templates/authentication/login.html'
            }).when('/register', {
                controller: 'RegisterController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                templateUrl: '/static/templates/authentication/register.html'
            }).when('/admin', {
                controller: 'AdminController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                templateUrl: '/static/templates/admin.html'
            }).when('/user', {
                templateUrl: '/static/templates/user.html'
            }).when('/notfound', {
                    templateUrl: '/static/templates/404.html'
            }).otherwise({ redirectTo: '/notfound' });

        //$httpProvider.interceptors.push('httpResponseInterceptor');
    };

    var run = function run($http, $rootScope, $location, Authentication, notifier) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                notifier.warning('Please log into your account first!');
                $location.path('/');
            }
        });
    };

    angular.module('pando-3d.data', []);
    angular.module('pando-3d.common.services', []);
    angular.module('pando-3d.layout.services', []);
    angular.module('pando-3d.layout.controllers', []);
    angular.module('pando-3d.authentication.services', []);
    angular.module('pando-3d.authentication.controllers', []);
    angular.module('pando-3d.layout.directives', []);

    angular.module('pando-3d', ['ngRoute', 'ngCookies', 'angular-loading-bar', ///'rzModule',
            'pando-3d.authentication',
            'pando-3d.common',
            'pando-3d.layout'])
        .config(['$routeProvider', '$locationProvider', config]) //'$httpProvider',
        .run(['$http', '$rootScope', '$location', 'Authentication', 'notifier', run])
        .value('jQuery', jQuery)
        .value('toastr', toastr)
        .constant('appSettings', {
            serverPath: '/api/v1/',
            version: 'Pando-3D 1.0 (build 20150412)'
        });
}());
