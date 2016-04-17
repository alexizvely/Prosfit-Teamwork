(function () {
    'use strict';

    /// dummy service to use with the mock object
    var singleShapesData = function singleShapesData($http) {
        function getShape(id) {
            return $http.get('/api/v1/projects/'+id)
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
            getShape: getShape
        };
    };

    angular.module('pando-3d.layout.services')
        .factory('singleShapesData', ['$http', singleShapesData]);
}());
