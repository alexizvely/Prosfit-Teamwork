(function() {
    'use strict';

    angular
        .module('pando-3d.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$http', 'Authentication'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($location, $scope, $http, Authentication) {
        var vm = this;

        vm.register = register;

        /**
         * @name register
         * @desc Register a new user
         * @memberOf thinkster.authentication.controllers.RegisterController
         */
        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                username: vm.username,
                password: vm.password,
                email: vm.email
            }).then(registerSuccessFn, registerErrorFn);

            /**
             * @name registerSuccessFn
             * @desc Log the new user in
             */
            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(vm.email, vm.password);
            }

            /**
             * @name registerErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function registerErrorFn(data, status, headers, config) {
                console.error(data.data.message);
            }
        }

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.authentication.controllers.RegisterController
         */
        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }

    }
})();
