(function() {
    'use strict';

    angular
        .module('pando-3d.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    /**
     * @namespace Authentication
     * @returns {Factory}
     */
    function Authentication($cookies, $http) {
        /**
         * @name Authentication
         * @desc The Factory to be returned
         */
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            register: register,
            logout: logout,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate,
            isAdm: isAdm
        };

        return Authentication;

        ////////////////////

        /**
         * @name register
         * @desc Try to register a new user
         * @param {string} username The username entered by the user
         * @param {string} password The password entered by the user
         * @param {string} email The email entered by the user
         * @returns {Promise}
         * @memberOf pando-3d.authentication.services.Authentication
         */
        function register(email, password) {
            return $http.post('/api/v1/accounts/', {
                username: email,
                password: password,
                email: email
            });
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            /**
             * @name loginSuccessFn
             * @desc Set the authenticated account and redirect to index
             */
            function loginSuccessFn(data, status, headers, config) {

                Authentication.setAuthenticatedAccount(data.data);

                window.location = '/';
            }

            /**
             * @name loginErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function loginErrorFn(data, status, headers, config) {
                console.error(data.data.message);
            }
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/')
                .then(logoutSuccessFn, logoutErrorFn);

            /**
             * @name logoutSuccessFn
             * @desc Unauthenticate and redirect to index with page reload
             */
            function logoutSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();

                window.location = '/';
            }

            /**
             * @name logoutErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function logoutErrorFn(data, status, headers, config) {
                console.error(data);
            }
        }

        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }
            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }

        function isAdm() {
            if (Authentication.getAuthenticatedAccount().username === 'admin') {
                return true;
            }
            return false;
        }
    }

})();
