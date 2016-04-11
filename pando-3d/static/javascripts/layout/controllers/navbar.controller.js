(function() {
    'use strict';

    angular
        .module('pando-3d.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$location', '$scope', '$cookies', 'Authentication'];

    /**
     * @namespace NavbarController
     */
    function NavbarController($location, $scope, $cookies, Authentication) {
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
    }
})();
