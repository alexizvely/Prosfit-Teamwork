(function() {
    'use strict';

    var Projects = function Projects($cookies, $http) {

        var categories = [
            'saved',
            'sentForManufacturing',
            'waitingAdminApproval',
            'returnedForImprovements',
            'manufacturing'
        ];

        var getCategories = function() {
            return Promise.resolve(categories);
        };

        return {
            getCategories: getCategories
        };
    }

    angular
        .module('pando-3d.layout.services')
        .factory('Projects', ['$cookies', '$http', Projects]);
})();
