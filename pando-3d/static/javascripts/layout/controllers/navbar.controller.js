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

        vm.logout = logout;

        /**
         * @name logout
         * @desc Log the user out
         * @memberOf thinkster.layout.controllers.NavbarController
         */
        function logout() {
            Authentication.logout();
        }
    }
})();
