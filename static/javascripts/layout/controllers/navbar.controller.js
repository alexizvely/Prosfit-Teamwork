(function () {
    'use strict';

    var navbarController = function navbarController($location, $scope, $cookies, Authentication) {
        var vm = this;

        vm.currentUser = {};

        waitForLogin();

        vm.logout = function logout() {
            Authentication.logout();
            vm.currentUser = undefined;
            waitForLogin();
            $location.path('/');
        };

        $('.nav a').on('click', function(){
            $('.navbar-toggle').click() //bootstrap 3.x by Richard
        });

        function waitForLogin() {
            if (Authentication.isAuthenticated()) {

                vm.currentUser = JSON.parse($cookies.authenticatedAccount);
                return vm.currentUser;
            }
        }
    };

    angular
        .module('pando-3d.layout.controllers')
        .controller('NavbarController', ['$location', '$scope', '$cookies', 'Authentication', navbarController]);
}());