(function() {
    'use strict';

    angular
        .module('pando-3d.layout.services')
        .factory('Projects', Projects);

    Projects.$inject = ['$cookies', '$http'];

    /**
     * @namespace Projects
     * @returns {Factory}
     */
    function Projects($cookies, $http) {
        /**
         * @name Projects
         * @desc The Factory to be returned
         */
        var Projects = {
            //getAuthenticatedAccount: getAuthenticatedAccount,
            //isAuthenticated: isAuthenticated,
            //login: login,
            //register: register,
            //logout: logout,
            //setAuthenticatedAccount: setAuthenticatedAccount,
            //unauthenticate: unauthenticate
        };

        return Projects;


    }

})();
