(function() {
    'use strict';

    angular
        .module('pando-3d.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$route', '$scope', '$http', 'Authentication', 'notifier'];

    /**
     * @namespace LoginController
     */
    function LoginController($location, $route, $scope, $http, Authentication, notifier) {
        var vm = this;

        vm.login = login;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         */
        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }

        /**
         * @name login
         * @desc Log the user in
         */
        function login() {
            Authentication.login(vm.email, vm.password);
        }
    }
})();
