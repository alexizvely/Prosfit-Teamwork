(function() {
    'use strict';

    /// dummy service to use with the mock objects
    var shapesData = function shapesData($http, Authentication) {
        function getShapes() {
            return $http.get('/api/v1/accounts/' + Authentication.getAuthenticatedAccount().username + '/projects/')
                .then(getProjectSuccessFn, getProjectErrorFn);

            function getProjectSuccessFn(data, status, headers, config) {
                return data;
            }

            function getProjectErrorFn(data, status, headers, config) {
                console.error(data);
                console.error(status);
                console.error(headers);
                console.error(config);
            }
        }

        return {
            getShapes: getShapes
        };
    };

    angular.module('pando-3d.layout.services')
        .factory('shapesData', ['$http', 'Authentication', shapesData]);
}());
