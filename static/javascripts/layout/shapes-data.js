(function () {
    'use strict';

    /// dummy service to use with the mock objects
    var shapesData = function shapesData(mockShapes) {
        function getShapes() {
            return mockShapes.shapes;
        }

        return {
            getShapes: getShapes
        };
    };

    angular.module('pando-3d.layout.services')
        .factory('shapesData', ['mockShapes', shapesData]);
}());
