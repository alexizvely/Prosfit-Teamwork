(function() {
    'use strict';

    angular
        .module('pando-3d.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$http', 'Authentication', 'notifier'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($location, $scope, $http, Authentication, notifier) {
        var vm = this;

        vm.register = register;

        function register(email, password) {
            return $http.post('/api/v1/accounts/', {
                username: vm.email,
                password: vm.password,
                email: vm.email
            }).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(data, status, headers, config) {
                notifier.success('Your registration is complete. Thank you!');
                Authentication.login(vm.email, vm.password);
            }

            function registerErrorFn(data, status, headers, config) {
                notifier.error('You cannot register with the chosen credential. Please retry with new ones. Thank you!');
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
