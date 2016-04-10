(function() {
    'use strict';

    angular
        .module('pando-3d.layout.controllers')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'Authentication'];

    /**
     * @namespace MainController
     */
    function MainController($scope, Authentication) {
        var vm = this;

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
