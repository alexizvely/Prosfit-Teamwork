(function () {
    'use strict';

    /// dummy service to use with the mock object
    var singleShapesData = function singleShapesData(mockSingleShape) {
        function getShape() {
            return mockSingleShape;
        }

        return {
            getShape: getShape
        };
    };

    angular.module('pando-3d.layout.services')
        .factory('singleShapesData', ['mockSingleShape', singleShapesData]);
}());
