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

        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                username: vm.username,
                password: vm.password,
                email: vm.email
            }).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(vm.email, vm.password);
            }

            function registerErrorFn(data, status, headers, config) {
                console.error(data.data.message);
            }
        }

        activate();

        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }

    }
})();
