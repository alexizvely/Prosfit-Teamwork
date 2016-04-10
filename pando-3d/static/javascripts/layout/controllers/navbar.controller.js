(function() {
    'use strict';

    angular
        .module('pando-3d.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication'];

    /**
     * @namespace NavbarController
     */
    function NavbarController($scope, Authentication) {
        var vm = this;

        vm.username = 'pesho';
        waitForLogin();

        vm.logout = function logout() {
            Authentication.logout();
            vm.currentUser = undefined;
            waitForLogin();
            $location.path('/');
        };

        function waitForLogin() {
            vm.currentUser = Authentication.getAuthenticatedAccount();
            console.log(vm.currentUser);
        }
    }
})();
