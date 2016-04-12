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